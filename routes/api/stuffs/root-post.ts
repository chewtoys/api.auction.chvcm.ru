import {
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";

import {Auth, IStuffInstance, Sequelize} from "src";

const router = Router();
export default router;

router.use(Auth.requireModerator);

/**
 * @api {post} /stuffs Создать новый материал
 * @apiVersion 1.0.0
 * @apiName CreateStuff
 * @apiGroup Stuffs
 * @apiPermission Модератор
 *
 * @apiParam {string="kg","piece"} amount_type Еденица измерения
 *
 * @apiSuccess (Created 201) {string="1..9223372036854775807"} id ID материала
 *
 * @apiError (Bad Request 400 - Пропущен параметр) {string="OBJECT_MISSING_KEY"} code Код ошибки
 * @apiError (Bad Request 400 - Пропущен параметр) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр amount_type неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр amount_type неверный) {string} message Подробное описание ошибки
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
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "AMOUNT_TYPE",
        },
      },
    },
  },
}).middleware, async (req, res) => {
  let result: IStuffInstance;
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.stuff.create({
        amount_type: req.body.value.amount_type.value,
      }, {
        returning: true,
      });
    })
    .json(() => {
      return {
        id: result.id,
      };
    }, 201)
    .execute();
});
