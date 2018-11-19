import {
  ObjectUnit,
  PgBigSerialUnit,
  PgLimitUnit,
  PgOffsetUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {Auth, cleanDeep, Const, IEntityInstance, Sequelize} from "src";

const router = Router();
export default router;

router.use(Auth.auth, Auth.requireModerator);

/**
 * @api {get} /entities Получить список юридических лиц
 * @apiVersion 1.0.0
 * @apiName ListEntities
 * @apiGroup Entities
 * @apiPermission Модератор
 *
 * @apiDescription Результаты отсортированы по `name` в порядке возрастания
 *
 * @apiParam (Query) {string="1..9223372036854775807"} [id] Фильтр по ID
 * @apiParam (Query) {string="0..100"} [limit='"100"'] Лимит (не учитывается когда задан ID)
 * @apiParam (Query) {string="0..9223372036854775807"} [offset] Оффсет (не учитывается когда задан ID)
 *
 * @apiSuccess {object[]} entities Список юридических лиц
 * @apiSuccess {boolean} entities.banned Забанено ли юридическое лицо?
 * @apiSuccess {string} entities.ceo Директор
 * @apiSuccess {string} entities.email Email
 * @apiSuccess {string="1..9223372036854775807"} entities.id ID
 * @apiSuccess {string} entities.itn Идентификационный номер налогоплательщика
 * @apiSuccess {string="ISO 639-1 в нижнем регистре"} entities.language Язык
 * @apiSuccess {string} entities.name Название огранизации
 * @apiSuccess {string} entities.phone Телефон
 * @apiSuccess {string} entities.psrn Основной государственный регистрационный номер
 * @apiSuccess {string="ISO 8601"} entities.registration Дата регистрации
 * @apiSuccess {boolean} entities.verified Проверено ли юридическое лицо?
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
 * @apiUse v100AuthRequireModerator
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
  let result: IEntityInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.entity.findAll(cleanDeep({
        attributes:
          ["banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified"],
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
        entities: result.map((entity) => {
          return {
            banned: entity.banned,
            ceo: entity.ceo,
            email: entity.email,
            id: entity.id,
            itn: entity.itn,
            language: entity.language,
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
