import {Router} from "express";

import {ApiCodes, Env, S3} from "src/index";

import unverifyEntity from "../../unverifyEntity";

const router = Router({
  mergeParams: true,
});
export default router;

// tslint:disable max-line-length
/**
 * @api {put} /entities/:id/attachments/:name Загрузить вложение на сервер
 * @apiVersion 1.0.0
 * @apiName UploadAttachment
 * @apiGroup Entities
 * @apiPermission Юридическое лицо или модератор
 *
 * @apiDescription В теле запроса должны быть переданы сырые байты вложения
 *
 * @apiHeader (Content-Type запроса) {string="application/octet-stream"} Content-Type
 * Формат и способ представления сущности
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
 * @apiError (Unsupported Media Type 415 - Content-Type запроса неверный) {string="WRONG_CONTENT_TYPE"} code Код ошибки
 * @apiError (Unsupported Media Type 415 - Content-Type запроса неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(async (req, res, next) => {
  await res.achain
    .check(() => {
      return String(req.headers["content-type"]).toLowerCase() === "application/octet-stream";
    }, ApiCodes.WRONG_CONTENT_TYPE, "Content-Type must be 'application/octet-stream'", 415)
    .action(async () => {
      await (await S3.createClient()).putObject({ // TODO: stream support
        Body: req.body,
        Bucket: Env.AWS_S3_BUCKET,
        Key: `entities/${req.params.id}/attachments/${req.params.name}`,
      }).promise();
    })
    .send204()
    .execute(next);
}, unverifyEntity);
