import {
  ObjectUnit,
  PgBigSerialUnit,
  PgNumericUnit,
  PgNumericUnitCodes,
  RequestValidator,
} from "@alendo/express-req-validator";
import {ChainCodes} from "@alendo/express-res-chain";

import {Router} from "express";
import * as _ from "lodash";

import {Auth, cleanDeep, ILotInstance, Sequelize, SocketNotifications} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(Auth.requireVerifiedEntity);

function numericOverflowCode(error?: Error) {
  return error ? ChainCodes.INTERNAL_SERVER_ERROR : PgNumericUnitCodes.WRONG_PG_NUMERIC;
}

function numericOverflowMessage(error?: Error) {
  return error ? error.message : "body.winbid: value overflows numeric format";
}

function numericOverflowStatus(error?: Error) {
  return error ? 500 : 400;
}

// tslint:disable max-line-length
/**
 * @api {patch} /lots/:id Изменить лот
 * @apiVersion 1.0.0
 * @apiName ChangeLot
 * @apiGroup Lots
 * @apiPermission Проверенное юридическое лицо
 *
 * @apiParam {string="1..9223372036854775807"} :id ID лота
 * @apiParam {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} [winbid]
 * Ставка победителя >= 0
 *
 * @apiSuccess (Socket "lot") {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} amount
 * Количество материала > 0
 * @apiSuccess (Socket "lot") {object} buffer
 * Интервал времени, который всегда должен оставаться между временем последней ставки и временем окончания аукциона
 * @apiSuccess (Socket "lot") {number} [buffer.years] Годы
 * @apiSuccess (Socket "lot") {number} [buffer.months] Месяцы
 * @apiSuccess (Socket "lot") {number} [buffer.days] Дни
 * @apiSuccess (Socket "lot") {number} [buffer.hours] Часы
 * @apiSuccess (Socket "lot") {number} [buffer.minutes] Минуты
 * @apiSuccess (Socket "lot") {number} [buffer.seconds] Секунды
 * @apiSuccess (Socket "lot") {number} [buffer.milliseconds] Миллисекунды
 * @apiSuccess (Socket "lot") {string="ISO 4217:2015 в нижнем регистре"} currency Валюта
 * @apiSuccess (Socket "lot") {string="ISO 8601"} finish Время окончания аукциона
 * @apiSuccess (Socket "lot") {string="1..9223372036854775807"} id ID лота
 * @apiSuccess (Socket "lot") {string="0..9223372036854775807"} participants Число участников
 * @apiSuccess (Socket "lot") {string="ISO 8601"} start Время начала аукциона
 * @apiSuccess (Socket "lot") {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} startbid
 * Начальная ставка >= 0
 * @apiSuccess (Socket "lot") {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} step
 * Шаг аукциона >= 0
 * @apiSuccess (Socket "lot") {boolean} strict Автовычисление ставки
 * @apiSuccess (Socket "lot") {string="1..9223372036854775807"} stuffid ID материала
 * @apiSuccess (Socket "lot") {string="purchase", "sale"} type Тип аукциона
 * @apiSuccess (Socket "lot") {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} [winbid]
 * Ставка победителя >= 0
 * @apiSuccess (Socket "lot") {string="1..9223372036854775807"} [winner] ID победителя
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр winbid неверный) {string="WRONG_PG_NUMERIC"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр winbid неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireVerifiedEntity
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      winbid: {
        Unit: PgNumericUnit,
        optional: true,
        payload: {
          disallowNegative: true,
        },
      },
    },
  },
  params: {
    Unit: ObjectUnit,
    payload: {
      id: {
        Unit: PgBigSerialUnit,
      },
    },
  },
}).middleware, async (req, res) => {
  let lots: [number, ILotInstance[]];
  await res.achain
    .check(async () => {
      try {
        lots = await Sequelize.instance.lot.update(cleanDeep({
          winbid: _.get(req.body.value.winbid, "value"),
          winner: _.get(req.body.value.winbid, "value") ? req.entity.id : undefined,
        }), {
          returning: true,
          where: {
            finish: {
              [Sequelize.op.gt]: new Date(),
            },
            id: req.params.id,
            start: {
              [Sequelize.op.lt]: new Date(),
            },
          },
        });
      } catch (error) {
        if (error.message !== "value overflows numeric format") {
          throw error;
        }
        return false;
      }
      return true;
    }, numericOverflowCode, numericOverflowMessage, numericOverflowStatus)
    .action(() => {
      lots[1].map((lot) => SocketNotifications.lots_lot(lot));
    })
    .send204()
    .execute();
});
