import * as stream from "stream";

import * as AWS from "aws-sdk";
import {Router} from "express";
import * as createError from "http-errors";
import * as _ from "lodash";

import {ApiCodes, Env, S3} from "src";

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
 * @apiDescription В теле запроса должны быть переданы сырые байты вложения через стрим
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
  let s3: AWS.S3;
  let uploadError: Error & { statusCode: number; } | undefined;
  const isUpload = await res.achain
    .check(() => {
      return String(req.headers["content-type"]).toLowerCase() === "application/octet-stream";
    }, ApiCodes.WRONG_CONTENT_TYPE, "Content-Type must be 'application/octet-stream'", 415)
    .action(async () => {
      s3 = await S3.createClient();
    })
    .action(async () => {
      try {
        await new Promise(async (resolve, reject) => {
          const passThrough = new stream.PassThrough();
          let allowRequestAbortByUser: boolean | Error = false;
          const uploadManager = s3.upload({
            Body: passThrough,
            Bucket: Env.AWS_S3_BUCKET,
            Key: `entities/${req.params.id}/attachments/${req.params.name}`,
          }, (error) => {
            if (error) {
              if (error.message === "Request aborted by user" && allowRequestAbortByUser) {
                if (_.isBoolean(allowRequestAbortByUser)) {
                  reject(createError(413, "request entity too large"));
                } else {
                  reject(allowRequestAbortByUser);
                }
              } else {
                reject(error);
              }
            } else {
              resolve();
            }
          });
          let received = 0;
          req
            .on("error", (error) => {
              allowRequestAbortByUser = error;
              uploadManager.abort();
            })
            .on("aborted", () => {
              uploadManager.abort();
            })
            .on("data", (chunk: Buffer) => {
              received += chunk.length;
              if (received > Env.EXPRESS_BODY_LIMIT_RAW) {
                allowRequestAbortByUser = true;
                uploadManager.abort();
              }
            }).pipe(passThrough);
        });
      } catch (error) {
        uploadError = error;
      }
    })
    .execute();

  if (isUpload) {
    if (uploadError && uploadError.statusCode) {
      next(uploadError);
    } else {
      await res.achain
        .send204()
        .execute(next);
    }
  }
}, unverifyEntity);
