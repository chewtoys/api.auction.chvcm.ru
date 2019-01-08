import {
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";
import * as otplib from "otplib";

import {Const, Sequelize} from "src";

const router = Router();
export default router;

/**
 * @api {put} /user/tfa/otp Сгенерировать новый секрет одноразового пароля
 * @apiVersion 1.0.0
 * @apiName GenerateOTP
 * @apiGroup User
 * @apiPermission Пользователь
 *
 * @apiDescription `authenticator` - Google Authenticator
 *
 * @apiParam {string="authenticator"} [type='"authenticator"'] Тип однаразового пароля
 *
 * @apiSuccess (Success 200 - authenticator) {string} keyuri URL для генерации QR кода
 * @apiSuccess (Success 200 - authenticator) {string} secret Секрет одноразового пароля
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр type неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр type неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      type: {
        Unit: PgEnumUnit,
        optional: true,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "OTP_TYPE",
        },
      },
    },
  },
}).middleware, async (req, res) => {
  let keyuri: string;
  let secret: string;
  let type: string;
  await res.achain
    .checkout(() => {
      type = _.get(req.body.value.type, "value", "authenticator");
      return type;
    })
    .fork("authenticator")
    .action(() => {
      secret = otplib.authenticator.generateSecret();
      keyuri = otplib.authenticator
      // TODO: remove encodeURIComponent when https://github.com/yeojz/otplib/issues/126 will be resolved
        .keyuri(encodeURIComponent(req.user.name as string), encodeURIComponent(Const.AUTHENTICATOR_SERVICE), secret);
    })
    .fork()
    .action(async () => {
      await Sequelize.instance.tokensTfaOtp.upsert({
        token: secret,
        type,
        userid: req.user.id,
      });
    })
    .json(() => {
      return {
        keyuri,
        secret,
      };
    })
    .execute();
});
