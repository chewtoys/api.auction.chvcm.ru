import {EmailUnit, ObjectUnit, RequestValidator, ZxcvbnUnit} from "@alendo/express-req-validator";

import {Router} from "express";

import {
  ApiCodes,
  Bcrypt,
  Const,
  EmailNotifications,
  ITokensTfaPurgatoryInstance,
  IUserAttributes,
  Recaptcha2,
  Sequelize,
} from "src";

import signUser from "./signUser";

const router = Router();
export default router;

/**
 * @api {post} /signin Вход в систему или начать двухэтапную аутентификацию
 * @apiVersion 1.0.0
 * @apiName SignIn
 * @apiGroup SignIn
 * @apiPermission Гость
 *
 * @apiParam {string} g-recaptcha-response Токен reCaptcha v2
 * @apiParam {string} email Email
 * @apiParam {string} password Пароль (учитываются только первые 72 символа)
 *
 * @apiSuccess (Success 200 - При включенной двухэтапной аутентификации) {string="ISO 8601"} expires
 * Дата, когда временный токен аутентификации перестанет действовать
 * @apiSuccess (Success 200 - При включенной двухэтапной аутентификации) {boolean=true} tfa
 * Включена ли двухэтапная аутентификация?
 * @apiSuccess (Success 200 - При включенной двухэтапной аутентификации) {string} token Временный токен аутентификации
 *
 * @apiSuccess (Success 200 - При выключенной двухэтапной аутентификации) {boolean=false} tfa
 * Включена ли двухэтапная аутентификация?
 * @apiSuccess (Success 200 - При выключенной двухэтапной аутентификации) {string} token Токен аутентификации
 *
 * @apiError (Bad Request 400 - Пропущен параметр) {string="OBJECT_MISSING_KEY"} code Код ошибки
 * @apiError (Bad Request 400 - Пропущен параметр) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр email неверный) {string="WRONG_EMAIL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр email неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр password неверный) {string="WRONG_ZXCVBN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр password неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Пользователь не найден) {string="DB_USER_NOT_FOUND"} code Код ошибки
 * @apiError (Unauthorized 401 - Пользователь не найден) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Пользователь забанен) {string="BANNED"} code Код ошибки
 * @apiError (Unauthorized 401 - Пользователь забанен) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100Recaptcha2
 */
router.use(Recaptcha2.instance.middleware, new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      email: {
        Unit: EmailUnit,
      },
      password: {
        Unit: ZxcvbnUnit,
        payload: {
          minScore: Const.MINIMUM_PASSWORD_SCORE,
        },
      },
    },
  },
}).middleware, async (req, res) => {
  let tokenTfaPurgatory: ITokensTfaPurgatoryInstance;
  let comparePasswordResult: boolean = false;
  await res.achain
    .action(async () => {
      req.user = await Sequelize.instance.user.findOne({
        where: {
          email: req.body.value.email.value,
        },
      }) as IUserAttributes;
      comparePasswordResult =
        await Bcrypt.compare(req.body.value.password.value, req.user ? req.user.password : undefined);
    })
    .check(() => {
      return !!req.user && comparePasswordResult;
    }, ApiCodes.DB_USER_NOT_FOUND, "user with same email and password not found", 401)
    .check(() => {
      return !!req.user && !req.user.banned;
    }, ApiCodes.BANNED, "user was banned", 401)
    .checkout(() => {
      return req.user.tfa ? "tfa-enabled" : "tfa-disabled";
    })
    .fork("tfa-enabled")
    .action(async () => {
      tokenTfaPurgatory = await Sequelize.instance.tokensTfaPurgatory.create({
        userid: req.user.id,
      }, {
        returning: true,
      });
    })
    .json(() => {
      return {
        expires: tokenTfaPurgatory.expires,
        tfa: req.user.tfa,
        token: tokenTfaPurgatory.token,
      };
    })
    .action(async () => {
      await EmailNotifications.instance.signinTfa(req.user);
    })
    .fork("tfa-disabled")
    .include(signUser)
    .execute();
});
