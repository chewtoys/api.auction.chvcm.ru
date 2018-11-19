import {Router} from "express";

const router = Router();
export default router;

/**
 * @api {all} /utils/ping Проверить доступность сервера
 *
 * @apiDescription А также мини игра "Настольный теннис"
 *
 * @apiVersion 1.0.0
 * @apiName Ping
 * @apiGroup Utils
 * @apiPermission Гость
 *
 * @apiSuccess {boolean} pong Отбил ли сервер мячик?
 *
 * @apiUse v100CommonHeaders
 */
router.all("/", async (req, res) => {
  await res.achain
    .json(() => {
      return {
        pong: Math.random() >= 0.5,
      };
    })
    .execute();
});
