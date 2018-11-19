import {AWSError} from "aws-sdk";
import {Router} from "express";

import {ApiCodes, Env, ResponseChain, S3} from "src/index";

const router = Router({
  mergeParams: true,
});
export default router;

// tslint:disable max-line-length
/**
 * @api {get} /entities/:id/attachments/:name Скачать вложение с сервера
 * @apiVersion 1.0.0
 * @apiName DownloadAttachment
 * @apiGroup Entities
 * @apiPermission Юридическое лицо или модератор
 *
 * @apiDescription В теле ответа должны быть переданы сырые байты вложения
 *
 * @apiHeader (Content-Type ответа) {string="application/octet-stream"} Content-Type
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
 * @apiError (Not Found 404 - Вложение не найдено) {string="ATTACHMENT_NOT_FOUND"} code Код ошибки
 * @apiError (Not Found 404 - Вложение не найдено) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(async (req, res) => {
  let awsError: AWSError;
  await res.achain
    .action(async () => {
      const s3 = await S3.createClient();
      try {
        const attachment = await s3.getObject({ // TODO: stream support
          Bucket: Env.AWS_S3_BUCKET,
          Key: `entities/${req.params.id}/attachments/${req.params.name}`,
        }).promise();
        res.type("application/octet-stream");
        res.status(200).send(attachment.Body);
      } catch (e) {
        awsError = e;
      }
    })
    .checkout(() => {
      return awsError && awsError.statusCode === 404 ? "404" : awsError ? "error" : ResponseChain.DEFAULT;
    })
    .fork("404")
    .json(() => {
      return {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: awsError.message,
      };
    }, 404)
    .fork("error")
    .action(() => {
      throw awsError;
    })
    .execute();
});
