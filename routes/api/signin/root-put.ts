import {EnumUnit, NotEmptyStringUnit, ObjectUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";
import * as otplib from "otplib";

import {ApiCodes, Auth, Sequelize} from "src";

import signUser from "./signUser";

const router = Router();
export default router;

router.use(Auth.authPurgatory);

/**
 * @api {put} /signin Завершить двухэтапную аутентификацию
 * @apiVersion 1.0.0
 * @apiName TFA
 * @apiGroup SignIn
 * @apiPermission Временный пользователь
 *
 * @apiParam {string} token Токен
 * @apiParam {string="otp","recovery"} type Тип токена
 *
 * @apiSuccess {boolean} tfa
 * Включена ли двухэтапная аутентификация?
 * @apiSuccess {string} token Токен аутентификации
 *
 * @apiError (Bad Request 400 - Пропущен параметр) {string="OBJECT_MISSING_KEY"} code Код ошибки
 * @apiError (Bad Request 400 - Пропущен параметр) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр token неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр token неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр type неверный) {string="WRONG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр type неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Токен не прошел проверку) {string="OTP_WRONG_TOKEN"} code Код ошибки
 * @apiError (Unauthorized 401 - Токен не прошел проверку) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Код восстановления не найден) {string="DB_TOKENS_TFA_RECOVERY_NOT_FOUND"} code
 * Код ошибки
 * @apiError (Unauthorized 401 - Код восстановления не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthPurgatory
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      token: {
        Unit: NotEmptyStringUnit,
      },
      type: {
        Unit: EnumUnit,
        payload: ["otp", "recovery"],
      },
    },
  },
}).middleware, async (req, res) => {
  let otplibCheckResult: boolean;
  let isTokenTfaRecoveryFound: boolean;
  await res.achain
    .checkout(() => {
      return req.body.value.type.value;
    })
    .fork("otp")
    .action(async () => {
      const tokenTfaOtp = await Sequelize.instance.tokensTfaOtp.findByPk(req.user.id);
      if (!tokenTfaOtp) {
        otplibCheckResult = false;
      } else {
        if (tokenTfaOtp.type === "authenticator") {
          otplibCheckResult = otplib.authenticator.check(req.body.value.token.value, tokenTfaOtp.token as string);
        }
      }
    })
    .check(() => {
      return otplibCheckResult;
    }, ApiCodes.OTP_WRONG_TOKEN, "wrong otp token", 401)
    .fork("recovery")
    .action(async () => {
      isTokenTfaRecoveryFound = (await Sequelize.instance.tokensTfaRecovery.destroy({
        where: {
          token: req.body.value.token.value,
        },
      })) > 0;
    })
    .check(() => {
      return isTokenTfaRecoveryFound;
    }, ApiCodes.DB_TOKENS_TFA_RECOVERY_NOT_FOUND, "recovery code for this user not found", 401)
    .fork()
    .action(async () => {
      await Sequelize.instance.tokensTfaPurgatory.destroy({
        where: {
          token: req.token,
        },
      });
    })
    .include(signUser)
    .execute();
});
