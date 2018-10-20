import {
  BooleanUnit,
  ObjectUnit,
  PgBigSerialUnit,
  PgLimitUnit,
  PgOffsetUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Const, IEntityInstance, Sequelize} from "src";

const router = Router();
export default router;

/**
 * @api {post} /entity/search Поиск по юридическим лицам
 * @apiVersion 0.0.0
 * @apiName Search
 * @apiGroup Entity
 * @apiPermission Модератор
 *
 * @apiDescription Результаты отсортированы по ID в порядке возрастания
 *
 * @apiParam {boolean} [banned] Фильтр по бану
 * @apiParam {string="1..9223372036854775807"} [id] Фильтр по ID юридического лица
 * @apiParam {string="0..100"} [limit] Лимит
 * @apiParam {string="0..9223372036854775807"} [offset] Оффсет
 * @apiParam {boolean} [verified] Фильтр по проверенным
 *
 * @apiSuccess {object[]} entities Массив юридических лиц
 * @apiSuccess {boolean} entities.banned Забанено ли юридическое лицо?
 * @apiSuccess {string} entities.ceo Директор
 * @apiSuccess {string} entities.email Email
 * @apiSuccess {string="1..9223372036854775807"} entities.id ID юридического лица
 * @apiSuccess {string} entities.itn Идентификационный номер налогоплательщика
 * @apiSuccess {string} entities.name Название огранизации
 * @apiSuccess {string} entities.phone Телефон
 * @apiSuccess {string} entities.psrn Основной государственный регистрационный номер
 * @apiSuccess {string="ISO 8601"} entities.registration Дата регистрации
 * @apiSuccess {boolean} entities.verified Проверено ли юридическое лицо?
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр banned или verified неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр banned или verified неверный) {string} message Подробное описание ошибки
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
 * @apiUse v000CommonHeaders
 * @apiUse v000AuthAuth
 * @apiUse v000AuthRequireModerator
 */
router.post("/", new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      banned: {
        Unit: BooleanUnit,
        optional: true,
      },
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
      verified: {
        Unit: BooleanUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let result: IEntityInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.entity.findAll(cleanDeep({
        attributes: ["banned", "ceo", "email", "id", "itn", "name", "phone", "psrn", "registration", "verified"],
        limit: _.get(req.body.value.limit, "value", Const.LIMIT_LIMIT),
        offset: _.get(req.body.value.offset, "value"),
        order: [
          ["id", "ASC"],
        ],
        where: {
          banned: _.get(req.body.value.banned, "value"),
          id: _.get(req.body.value.id, "value"),
          verified: _.get(req.body.value.verified, "value"),
        },
      }));
    })
    .json(() => {
      return {
        entities: result.map((entity) => {
          return {
            banned: entity.banned,
            ceo: entity.ceo,
            email: entity.email,
            id: entity.id,
            itn: entity.itn,
            name: entity.name,
            phone: entity.phone,
            psrn: entity.psrn,
            registration: entity.registration,
            verified: entity.verified,
          };
        }),
      };
    })
    .execute();
});
