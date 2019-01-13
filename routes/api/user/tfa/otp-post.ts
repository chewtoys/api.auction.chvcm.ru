import {NotEmptyStringUnit, ObjectUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";
import * as otplib from "otplib";

import {Sequelize} from "src";

const router = Router();
export default router;

/**
 * @api {post} /user/tfa/otp Проверить одноразовый пароль
 * @apiVersion 1.0.0
 * @apiName CheckOTP
 * @apiGroup User
 * @apiPermission Пользователь
 *
 * @apiParam {string} token Токен
 *
 * @apiSuccess {boolean} result Пройден ли тест?
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
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      token: {
        Unit: NotEmptyStringUnit,
      },
    },
  },
}).middleware, async (req, res) => {
  await res.achain
    .json(async () => {
      const tokenTfaOtp = await Sequelize.instance.tokensTfaOtp.findByPk(req.user.id);
      if (tokenTfaOtp && tokenTfaOtp.type === "authenticator") {
        return {
          result: otplib.authenticator.check(req.body.value.token.value, tokenTfaOtp.token as string),
        };
      } else {
        return {
          result: false,
        };
      }
    })
    .execute();
});
