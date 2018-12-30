import {
  BooleanUnit,
  ObjectUnit,
  PgBigSerialUnit,
  PgDateUnit,
  PgDateUnitCodes,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  PgIntervalObjectUnit,
  PgIntervalUnitCodes,
  PgNumericUnit,
  RequestValidator,
} from "@alendo/express-req-validator";
import {ChainCodes} from "@alendo/express-res-chain";

import {Router} from "express";
import * as moment from "moment";

import {
  ApiCodes,
  Auth,
  ILotInstance,
  IStuffInstance,
  Sequelize,
  SocketNotifications,
} from "src";

const router = Router();
export default router;

router.use(Auth.requireModerator);

function intervalOverflowCode(error?: Error) {
  return error ? ChainCodes.INTERNAL_SERVER_ERROR : PgIntervalUnitCodes.WRONG_PG_INTERVAL;
}

function intervalOverflowMessage(error?: Error) {
  return error ? error.message : "body.buffer: interval out of range";
}

function intervalOverflowStatus(error?: Error) {
  return error ? 500 : 400;
}

// tslint:disable max-line-length
/**
 * @api {post} /lots Создать новый лот
 * @apiVersion 1.0.0
 * @apiName CreateLot
 * @apiGroup Lots
 * @apiPermission Модератор
 *
 * @apiParam {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} amount
 * Количество материала > 0
 * @apiParam {object} buffer
 * Интервал времени, который всегда должен оставаться между временем последней ставки и временем окончания аукциона
 * @apiParam {number} [buffer.years] Годы
 * @apiParam {number} [buffer.months] Месяцы
 * @apiParam {number} [buffer.days] Дни
 * @apiParam {number} [buffer.hours] Часы
 * @apiParam {number} [buffer.minutes] Минуты
 * @apiParam {number} [buffer.seconds] Секунды
 * @apiParam {number} [buffer.milliseconds] Миллисекунды
 * @apiParam {string="ISO 4217:2015 в нижнем регистре"} currency Валюта
 * @apiParam {string="ISO 8601"} finish Время окончания аукциона (не может быть раньше времени начала)
 * @apiParam {string="ISO 8601"} start Время начала аукциона (не может быть в прошлом)
 * @apiParam {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} startbid
 * Начальная ставка >= 0
 * @apiParam {string="до 131072 разрядов перед десятичной точкой; до 16383 разрядов после десятичной точки"} step
 * Шаг аукциона >= 0
 * @apiParam {boolean} strict Автовычисление ставки
 * @apiParam {string="1..9223372036854775807"} stuffid ID материала
 * @apiParam {string="purchase", "sale"} type Тип аукциона
 *
 * @apiSuccess (Created 201) {string="1..9223372036854775807"} id ID лота
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
 * @apiError (Bad Request 400 - Пропущен параметр) {string="OBJECT_MISSING_KEY"} code Код ошибки
 * @apiError (Bad Request 400 - Пропущен параметр) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр amount, startbid или step неверный) {string="WRONG_PG_NUMERIC"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр amount, startbid или step неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр buffer неверный) {string="WRONG_PG_INTERVAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр buffer неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр currency или type неверный) {string="WRONG_PG_ENUM"} code
 * Код ошибки
 * @apiError (Bad Request 400 - Параметр currency или type неверный) {string} message
 * Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр finish или start неверный) {string="WRONG_PG_DATE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр finish или start неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр strict неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр strict неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр stuffid неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр stuffid неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Материал не найден) {string="DB_STUFF_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Bad Request 400 - Материал не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireModerator
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      [ObjectUnit.FILTER]: true,
      amount: {
        Unit: PgNumericUnit,
        payload: {
          disallowNegative: true,
          disallowZero: true,
        },
      },
      buffer: {
        Unit: PgIntervalObjectUnit,
      },
      currency: {
        Unit: PgEnumUnit,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "CURRENCY",
        },
      },
      finish: {
        Unit: PgDateUnit,
      },
      start: {
        Unit: PgDateUnit,
      },
      startbid: {
        Unit: PgNumericUnit,
        payload: {
          disallowNegative: true,
        },
      },
      step: {
        Unit: PgNumericUnit,
        payload: {
          disallowNegative: true,
        },
      },
      strict: {
        Unit: BooleanUnit,
      },
      stuffid: {
        Unit: PgBigSerialUnit,
      },
      type: {
        Unit: PgEnumUnit,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "LOT_TYPE",
        },
      },
    },
  },
}).middleware, async (req, res, next) => {
  const start = moment((req.body.value.start as PgDateUnit).value);
  const finish = moment((req.body.value.finish as PgDateUnit).value);
  await res.achain
    .check(() => {
      return start.isAfter(moment());
    }, PgDateUnitCodes.WRONG_PG_DATE, "body.start: value must be in future", 400)
    .check(() => {
      return start.isBefore(finish);
    }, PgDateUnitCodes.WRONG_PG_DATE, "body.start: value must be less then body.finish", 400)
    .execute(next);
}, async (req, res) => {
  let lot: ILotInstance;
  let stuff: IStuffInstance | null;
  await res.achain
    .action(async () => {
      stuff = await Sequelize.instance.stuff.findByPk(req.body.value.stuffid.value, {
        attributes: ["id"],
      });
    })
    .check(() => {
      return !!stuff;
    }, ApiCodes.DB_STUFF_NOT_FOUND_BY_ID, "body.stuffid: stuff with same id not found", 400)
    .check(async () => {
      try {
        lot = await await Sequelize.instance.lot.create((req.body as ObjectUnit).mappedValues, {
          returning: true,
        });
      } catch (error) {
        if (error.message !== "interval out of range") {
          throw error;
        }
        return false;
      }
      return true;
    }, intervalOverflowCode, intervalOverflowMessage, intervalOverflowStatus)
    .action(() => {
      SocketNotifications.lots_lot(lot);
    })
    .json(() => {
      return {
        id: lot.id,
      };
    }, 201)
    .execute();
});
