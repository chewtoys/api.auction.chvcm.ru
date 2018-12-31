import {BooleanUnit, ObjectUnit, RequestValidator, StringUnit} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {
  ApiCodes,
  cleanDeep,
  EmailNotifications,
  IEmployeeInstance,
  Sequelize,
} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

/**
 * @api {patch} /employees/:id Изменить сотрудника
 * @apiVersion 1.0.0
 * @apiName ChangeEmployee
 * @apiGroup Employees
 * @apiPermission Администратор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID сотрудника
 * @apiParam {string} [ban_message] Сообщение о причине блокировки в markdown (вставляется в email сообщение)
 * @apiParam {boolean} [banned] Забанен ли сотрудник?
 * @apiParam {boolean} [moderator] Есть ли права модератора?
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр ban_message неверный) {string="WRONG_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр ban_message неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр banned или moderator неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр banned или moderator неверный) {string} message
 * Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Сотрудник не найден) {string="DB_EMPLOYEE_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Сотрудник не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireAdmin
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      ban_message: {
        Unit: StringUnit,
        optional: true,
      },
      banned: {
        Unit: BooleanUnit,
        optional: true,
      },
      moderator: {
        Unit: BooleanUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let employee: IEmployeeInstance | null = null;
  await res.achain
    .action(async () => {
      employee = await Sequelize.instance.employee.findByPk(req.params.id);
    })
    .check(() => {
      return !!employee;
    }, ApiCodes.DB_EMPLOYEE_NOT_FOUND_BY_ID, "employee with same id not found", 404)
    .action(async () => {
      await Sequelize.instance.employee.update(cleanDeep({
        banned: _.get(req.body.value.banned, "value"),
        moderator: _.get(req.body.value.moderator, "value"),
      }), {
        where: {
          id: req.params.id,
        },
      });
    })
    .send204()
    .action(async () => {
      if (req.body.value.banned && req.body.value.banned.value !== (employee as IEmployeeInstance).banned) {
        if (req.body.value.banned.value) {
          await EmailNotifications.instance.banned({
            email: (employee as IEmployeeInstance).email,
            language: (employee as IEmployeeInstance).language,
            name: (employee as IEmployeeInstance).name,
          }, _.get(req.body.value.ban_message, "value"));
        } else {
          await EmailNotifications.instance.unbanned(employee as IEmployeeInstance);
        }
      }
    })
    .execute();
});
