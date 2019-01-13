import {
  BooleanUnit,
  EmailUnit,
  NotEmptyStringUnit,
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  PhoneUnit,
  RequestValidator,
  ZxcvbnUnit,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {Bcrypt, cleanDeep, Const, EmailNotifications, Sequelize, Unique} from "src";

const router = Router();
export default router;

/**
 * @api {patch} /user Изменить самого себя
 * @apiVersion 1.0.0
 * @apiName ChangeYourself
 * @apiGroup User
 * @apiPermission Пользователь
 *
 * @apiDescription > Хочешь изменить мир - начни с себя
 *
 * @apiParam {string} [email] Email
 * @apiParam {string="en", "ru"} [language] Язык
 * @apiParam {string} [name] Имя (только для сотрудников)
 * @apiParam {string} [password] Пароль (учитываются только первые 72 символа)
 * @apiParam {string="+79xxxxxxxxx"} [phone] Телефон
 * @apiParam {boolean} [tfa] Включена ли двухэтапная аутентификация?
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр email неверный) {string="WRONG_EMAIL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр email неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр language неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр language неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр name неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр name неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр password неверный) {string="WRONG_ZXCVBN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр password неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр phone неверный) {string="WRONG_PHONE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр phone неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр tfa неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр tfa неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
 * @apiUse v100UniqueCheckEmailAndPhone
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      email: {
        Unit: EmailUnit,
        optional: true,
      },
      language: {
        Unit: PgEnumUnit,
        optional: true,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "LANGUAGE_CODE",
        },
      },
      name: {
        Unit: NotEmptyStringUnit,
        optional: true,
      },
      password: {
        Unit: ZxcvbnUnit,
        optional: true,
        payload: {
          minScore: Const.MINIMUM_PASSWORD_SCORE,
        },
      },
      phone: {
        Unit: PhoneUnit,
        optional: true,
        payload: {
          locale: Const.PHONE_LOCALE,
          strictMode: true,
        },
      },
      tfa: {
        Unit: BooleanUnit,
        optional: true,
      },
    },
  },
}).middleware, Unique.checkEmailAndPhoneMiddleware((req) => {
  return {
    email: _.get(req.body.value.email, "value"),
    phone: _.get(req.body.value.phone, "value"),
  };
}), async (req, res) => {
  return res.achain
    .action(async () => {
      await Sequelize.instance.transaction(async () => {
        await Sequelize.instance.user.update(cleanDeep({
          email: _.get(req.body.value.email, "value"),
          language: _.get(req.body.value.language, "value"),
          name: req.entity ? undefined : _.get(req.body.value.name, "value"),
          password: req.body.value.password ?
            await Bcrypt.hash(_.get(req.body.value.password, "value")) : undefined,
          phone: _.get(req.body.value.phone, "value"),
          tfa: _.get(req.body.value.tfa, "value"),
        }), {
          where: {
            id: req.user.id as string,
          },
        });
        if (req.body.value.tfa && !_.get(req.body.value.tfa, "value")) {
          await Sequelize.instance.tokensTfaOtp.destroy({
            where: {
              userid: req.user.id as string,
            },
          });
          await Sequelize.instance.tokensTfaRecovery.destroy({
            where: {
              userid: req.user.id as string,
            },
          });
        }
      });
    })
    .send204()
    .action(async () => {
      if (req.body.value.email) {
        await EmailNotifications.instance.test(req.body.value.email.value,
          _.get(req.body.value.language, "value") || req.user.language);
      }
      if (req.body.value.password) {
        await EmailNotifications.instance.passwordResetComplete({
          email: _.get(req.body.value.email, "value") || req.user.email,
          language: _.get(req.body.value.language, "value") || req.user.language,
          name: _.get(req.body.value.name, "value") || req.user.name,
        });
      }
    })
    .execute();
});
