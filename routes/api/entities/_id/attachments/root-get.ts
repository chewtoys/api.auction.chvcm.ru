import {ObjectUnit, PgLimitUnit, RequestValidator, StringUnit} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Const, Env, S3} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

// tslint:disable max-line-length
/**
 * @api {get} /entities/:id/attachments Получить список вложенией
 * @apiVersion 1.0.0
 * @apiName ListAttachments
 * @apiGroup Entities
 * @apiPermission Юридическое лицо или модератор
 *
 * @apiDescription Сортировка списка вложений производится путем сравнения названий как массива байт в кодировке UTF-8
 *
 * @apiParam {string="1..9223372036854775807"} :id ID юридического лица
 * @apiParam (Query) {string="0..1000"} [limit='"1000"'] Максимальное колличество элементов в выборке
 * @apiParam (Query) {string} [offset] Смещение выборки (значение не обязательно должно быть осмысленным)
 *
 * @apiSuccess {object[]} attachments Список вложений
 * @apiSuccess {string} attachments.name Имя вложения
 * @apiSuccess {number} attachments.size Размер вложения в байтах
 * @apiSuccess {string} [nextOffset] Значение следующего `offset`
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр limit неверный) {string="WRONG_PG_LIMIT"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр limit неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр offset неверный) {string="WRONG_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр offset неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string="REQUIRED_SAME_ENTITY_OR_MODERATOR"} code Код ошибки
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string="DB_ENTITY_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
 */
router.use(new RequestValidator({
  query: {
    Unit: ObjectUnit,
    payload: {
      limit: {
        Unit: PgLimitUnit,
        optional: true,
        payload: Const.AWS_S3_LIMIT_LIMIT,
      },
      offset: {
        Unit: StringUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  await res.achain
    .json(async () => {
      const prefix = `entities/${req.params.id}/attachments/`;

      const objects = await (await S3.createClient()).listObjects(cleanDeep({
        Bucket: Env.AWS_S3_BUCKET,
        Delimiter: "/",
        Marker: _.get(req.query.value.offset, "value", undefined),
        MaxKeys: _.get(req.query.value.limit, "value", Const.AWS_S3_LIMIT_LIMIT),
        Prefix: prefix,
      })).promise();

      return {
        attachments: (objects.Contents || []).map((v) => {
          return {
            name: String(v.Key).substring(prefix.length),
            size: v.Size,
          };
        }),
        nextOffset: objects.NextMarker,
      };
    })
    .execute();
});
