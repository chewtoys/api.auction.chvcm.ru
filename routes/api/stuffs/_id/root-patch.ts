import {
  BooleanUnit,
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Sequelize} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

/**
 * @api {patch} /stuffs/:id Изменить материал
 * @apiVersion 1.0.0
 * @apiName ChangeStuff
 * @apiGroup Stuffs
 * @apiPermission Модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID материала
 * @apiParam {string="kg","piece"} [amount_type] Еденица измерения
 * @apiParam {boolean} [enabled] Включен ли материал?
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр amount_type неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр amount_type неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Материал не найден) {string="DB_STUFF_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Материал не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
 * @apiUse v100AuthRequireModerator
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      amount_type: {
        Unit: PgEnumUnit,
        optional: true,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "AMOUNT_TYPE",
        },
      },
      enabled: {
        Unit: BooleanUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  await res.achain
    .action(async () => {
      await Sequelize.instance.stuff.update(cleanDeep({
        amount_type: _.get(req.body.value.amount_type, "value"),
        enabled: _.get(req.body.value.enabled, "value"),
      }), {
        where: {
          id: req.params.id,
        },
      });
    })
    .send204()
    .execute();
});
