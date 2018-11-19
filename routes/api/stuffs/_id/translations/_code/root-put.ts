import {NotEmptyStringUnit, ObjectUnit, RequestValidator, StringUnit} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Sequelize} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

/**
 * @api {put} /stuffs/:id/translations/:code Перевести материал
 * @apiVersion 1.0.0
 * @apiName TranslateStuff
 * @apiGroup Stuffs
 * @apiPermission Модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID материала
 * @apiParam {string="ISO 639-1 в нижнем регистре"} :code Язык перевода
 * @apiParam {string} title Название материала
 * @apiParam {string} [description='""'] Описание материала (может быть пустым)
 *
 * @apiError (Bad Request 400 - Пропущен параметр) {string="OBJECT_MISSING_KEY"} code Код ошибки
 * @apiError (Bad Request 400 - Пропущен параметр) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :code неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :code неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр title неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр title неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр description неверный) {string="WRONG_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр description неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Материал не найден) {string="DB_STUFF_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Материал не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 * @apiUse v100AuthRequireModerator
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      description: {
        Unit: StringUnit,
        optional: true,
      },
      title: {
        Unit: NotEmptyStringUnit,
      },
    },
  },
}).middleware, async (req, res) => {
  await res.achain
    .action(async () => {
      await Sequelize.instance.stuffTranslations.upsert(cleanDeep({
        code: req.params.code,
        description: _.get(req.body.value.description, "value"),
        stuffid: req.params.id,
        title: req.body.value.title.value,
      }));
    })
    .send204()
    .execute();
});
