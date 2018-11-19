import {
  ObjectUnit,
  PgBigSerialUnit,
  PgLimitUnit,
  PgOffsetUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Const, IEmployeeInstance, Sequelize} from "src/index";

const router = Router();
export default router;

/**
 * @api {get} /employees Получить список сотрудников
 * @apiVersion 1.0.0
 * @apiName ListEmployees
 * @apiGroup Employees
 * @apiPermission Администратор
 *
 * @apiDescription Результаты отсортированы по `name` в порядке возрастания
 *
 * @apiParam (Query) {string="1..9223372036854775807"} [id] Фильтр по ID
 * @apiParam (Query) {string="0..100"} [limit='"100"'] Лимит (не учитывается когда задан ID)
 * @apiParam (Query) {string="0..9223372036854775807"} [offset] Оффсет (не учитывается когда задан ID)
 *
 * @apiSuccess {object[]} employees Список сотрудников
 * @apiSuccess {boolean} employees.admin Есть ли права администратора?
 * @apiSuccess {boolean} employees.banned Забанен ли сотрудник?
 * @apiSuccess {string} employees.email Email
 * @apiSuccess {string="1..9223372036854775807"} employees.id ID
 * @apiSuccess {string="ISO 639-1 в нижнем регистре"} employees.language Язык
 * @apiSuccess {boolean} employees.moderator Есть ли права модератора?
 * @apiSuccess {string} employees.name Имя
 * @apiSuccess {string} employees.phone Телефон
 * @apiSuccess {string="ISO 8601"} employees.registration Дата регистрации
 *
 * @apiError (Bad Request 400 - Параметр id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр limit неверный) {string="WRONG_PG_LIMIT"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр limit неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр offset неверный) {string="WRONG_PG_OFFSET"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр offset неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireAdmin
 */
router.use(new RequestValidator({
  query: {
    Unit: ObjectUnit,
    payload: {
      id: {
        Unit: PgBigSerialUnit,
        optional: true,
      },
      limit: {
        Unit: PgLimitUnit,
        optional: true,
        payload: Const.LIMIT_LIMIT,
      },
      offset: {
        Unit: PgOffsetUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let result: IEmployeeInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.employee.findAll(cleanDeep({
        attributes: ["admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration"],
        limit: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.limit, "value", Const.LIMIT_LIMIT),
        offset: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.offset, "value"),
        order: [
          _.get(req.query.value.id, "value") ? undefined : ["name", "ASC"],
        ],
        where: {
          id: _.get(req.query.value.id, "value"),
        },
      }));
    })
    .json(() => {
      return {
        employees: result.map((employee) => {
          return {
            admin: employee.admin,
            banned: employee.banned,
            email: employee.email,
            id: employee.id,
            language: employee.language,
            moderator: employee.moderator,
            name: employee.name,
            phone: employee.phone,
            registration: employee.registration,
          };
        }),
      };
    })
    .execute();
});
