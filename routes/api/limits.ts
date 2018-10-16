import {Router} from "express";

import {Const, Env} from "src";

const router = Router();
export default router;

/**
 * @api {get} /limits Получить лимиты сервера
 *
 * @apiVersion 0.0.0
 * @apiName Limits
 * @apiGroup Utils
 * @apiPermission Гость
 *
 * @apiSuccess {object} body Максимальный размер тела запроса
 * @apiSuccess {number} body.json Для JSON (в байтах)
 * @apiSuccess {number} body.raw Для файлов (в байтах)
 * @apiSuccess {number} limit Лимит на лимит
 *
 * @apiUse v000CommonHeaders
 */
router.get("/", async (req, res) => {
  await res.achain
    .json(() => {
      return {
        body: {
          json: Env.EXPRESS_BODY_PARSER_LIMIT_JSON,
          raw: Env.EXPRESS_BODY_PARSER_LIMIT_RAW,
        },
        limit: Const.LIMIT_LIMIT,
      };
    })
    .execute();
});
