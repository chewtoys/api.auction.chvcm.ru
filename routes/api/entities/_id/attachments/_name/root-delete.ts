import {Router} from "express";

import {Env, S3} from "src";

import unverifyEntity from "../../unverifyEntity";

const router = Router({
  mergeParams: true,
});
export default router;

// tslint:disable max-line-length
/**
 * @api {delete} /entities/:id/attachments/:name Удалить вложение с сервера
 * @apiVersion 1.0.0
 * @apiName DeleteAttachment
 * @apiGroup Entities
 * @apiPermission Юридическое лицо или модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID юридического лица
 * @apiParam {string} :name Имя вложения.
 * Разрешенные символы: кириллица, латиница, цифры, минус, нижнее подчеркивание, пробел (не может начинаться с пробела).
 * В конце имени обязательно должно быть хотя бы одно расширение, соостоящее из точки, латинских букв и цифр
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :name неверный) {string="WRONG_REGEXP"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :name неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string="REQUIRED_SAME_ENTITY_OR_MODERATOR"} code Код ошибки
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string="DB_ENTITY_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(async (req, res, next) => {
  await res.achain
    .action(async () => {
      await (await S3.createClient()).deleteObject({
        Bucket: Env.AWS_S3_BUCKET,
        Key: `entities/${req.params.id}/attachments/${req.params.name}`,
      }).promise();
    })
    .send204()
    .execute(next);
}, unverifyEntity);
