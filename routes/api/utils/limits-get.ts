import {Router} from "express";

import {Const, Env} from "src";

const router = Router();
export default router;

/**
 * @api {get} /utils/limits Получить лимиты сервера
 *
 * @apiVersion 1.0.0
 * @apiName GetLimits
 * @apiGroup Utils
 * @apiPermission Гость
 *
 * @apiSuccess {object} body Максимальный размер тела запроса
 * @apiSuccess {number} body.json Для JSON (в байтах)
 * @apiSuccess {number} body.raw Для файлов (в байтах)
 * @apiSuccess {object} select Лимит на лимит выборки
 * @apiSuccess {string="1000"} select.attachments Лимит на лимит выборки вложений
 * @apiSuccess {string="100"} select.db Лимит на лимит выборки из базы данных
 *
 * @apiUse v100CommonHeaders
 */
router.use(async (req, res) => {
  await res.achain
    .json(() => {
      return {
        body: {
          json: Env.EXPRESS_BODY_PARSER_LIMIT_JSON,
          raw: Env.EXPRESS_BODY_PARSER_LIMIT_RAW,
        },
        select: {
          attachments: Const.AWS_S3_LIMIT_LIMIT,
          db: Const.LIMIT_LIMIT,
        },
      };
    })
    .execute();
});
