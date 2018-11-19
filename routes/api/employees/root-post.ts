import {
  EmailUnit,
  NotEmptyStringUnit,
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  PhoneUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";

import {
  Const,
  EmailNotifications,
  IEmployeeInstance,
  Sequelize,
  Unique,
} from "src";

const router = Router();
export default router;

/**
 * @api {post} /employees Создать нового сотрудника
 * @apiVersion 1.0.0
 * @apiName Invite
 * @apiGroup Employees
 * @apiPermission Администратор
 *
 * @apiParam {string} email Email
 * @apiParam {string="ISO 639-1 в нижнем регистре"} language Язык
 * @apiParam {string} name Имя
 * @apiParam {string="+79xxxxxxxxx"} phone Телефон
 *
 * @apiSuccess (Created 201) {string="1..9223372036854775807"} id ID сотрудника
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
 * @apiError (Bad Request 400 - Параметр language неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр language неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр name неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр name неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр phone неверный) {string="WRONG_PHONE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр phone неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireAdmin
 * @apiUse v100UniqueCheckEmailAndPhone
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      [ObjectUnit.FILTER]: true,
      email: {
        Unit: EmailUnit,
      },
      language: {
        Unit: PgEnumUnit,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "LANGUAGE_CODE",
        },
      },
      name: {
        Unit: NotEmptyStringUnit,
      },
      phone: {
        Unit: PhoneUnit,
        payload: {
          locale: Const.PHONE_LOCALE,
          strictMode: true,
        },
      },
    },
  },
}).middleware, Unique.checkEmailAndPhoneMiddleware((req) => {
  return {
    email: req.body.value.email.value,
    phone: req.body.value.phone.value,
  };
}), async (req, res) => {
  let employee: IEmployeeInstance;
  await res.achain
    .action(async () => {
      employee = await Sequelize.instance.employee.create((req.body as ObjectUnit).mappedValues, {
        returning: true,
      });
    })
    .json(() => {
      return {
        id: employee.id,
      };
    }, 201)
    .action(async () => {
      await EmailNotifications.instance.inviteEmployee(employee);
    })
    .execute();
});
