import {
  ObjectUnit,
  PgBigSerialUnit,
  PgLimitUnit,
  PgOffsetUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Const, ILotInstance, Sequelize} from "src";

const router = Router();
export default router;

// tslint:disable max-line-length
/**
 * @api {get} /lots Получить список лотов
 * @apiVersion 1.0.0
 * @apiName ListLots
 * @apiGroup Lots
 * @apiPermission Пользователь
 *
 * @apiDescription Результаты отсортированы по дате начала аукциона в порядке убывания
 *
 * @apiParam (Query) {string="1..9223372036854775807"} [id] Фильтр по ID лота
 * @apiParam (Query) {string="0..100"} [limit] Лимит (не учитывается когда задан ID лота)
 * @apiParam (Query) {string="0..9223372036854775807"} [offset] Оффсет (не учитывается когда задан ID лота)
 * @apiParam (Query) {string="1..9223372036854775807"} [stuffid] Фильтр по ID материала
 *
 * @apiSuccess {object[]} lots Список лотов
 * @apiSuccess {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} lots.amount
 * Количество материала > 0
 * @apiSuccess {object} lots.buffer
 * Интервал времени, который всегда должен оставаться между временем последней ставки и временем окончания аукциона
 * @apiSuccess {number} [lots.buffer.years] Годы
 * @apiSuccess {number} [lots.buffer.months] Месяцы
 * @apiSuccess {number} [lots.buffer.days] Дни
 * @apiSuccess {number} [lots.buffer.hours] Часы
 * @apiSuccess {number} [lots.buffer.minutes] Минуты
 * @apiSuccess {number} [lots.buffer.seconds] Секунды
 * @apiSuccess {number} [lots.buffer.milliseconds] Миллисекунды
 * @apiSuccess {string="ISO 4217:2015 в нижнем регистре"} lots.currency Валюта
 * @apiSuccess {string="ISO 8601"} lots.finish Время окончания аукциона
 * @apiSuccess {string="1..9223372036854775807"} lots.id ID лота
 * @apiSuccess {string="0..9223372036854775807"} lots.participants Число участников
 * @apiSuccess {string="ISO 8601"} lots.start Время начала аукциона
 * @apiSuccess {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} lots.startbid
 * Начальная ставка >= 0
 * @apiSuccess {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} lots.step
 * Шаг аукциона >= 0
 * @apiSuccess {boolean} lots.strict Автовычисление ставки
 * @apiSuccess {string="1..9223372036854775807"} lots.stuffid ID материала
 * @apiSuccess {string="purchase", "sale"} lots.type Тип аукциона
 * @apiSuccess {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} [lots.winbid]
 * Ставка победителя >= 0
 * @apiSuccess {string="1..9223372036854775807"} [lots.winner] ID победителя
 *
 * @apiError (Bad Request 400 - Параметр id или stuffid неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр id или stuffid неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр limit неверный) {string="WRONG_PG_LIMIT"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр limit неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр offset неверный) {string="WRONG_PG_OFFSET"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр offset неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
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
      stuffid: {
        Unit: PgBigSerialUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let result: ILotInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.lot.findAll(cleanDeep({
        limit: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.limit, "value", Const.LIMIT_LIMIT),
        offset: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.offset, "value"),
        order: [
          ["start", "DESC"],
        ],
        where: {
          id: _.get(req.query.value.id, "value"),
          stuffid: _.get(req.query.value.stuffid, "value"),
        },
      }));
    })
    .json(() => {
      return {
        lots: result.map((lot) => {
          return {
            amount: lot.amount,
            buffer: lot.buffer,
            currency: lot.currency,
            finish: lot.finish,
            id: lot.id,
            participants: lot.participants,
            start: lot.start,
            startbid: lot.startbid,
            step: lot.step,
            strict: lot.strict,
            stuffid: lot.stuffid,
            type: lot.type,
            winbid: lot.winbid || undefined,
            winner: lot.winner || undefined,
          };
        }),
      };
    })
    .execute();
});
