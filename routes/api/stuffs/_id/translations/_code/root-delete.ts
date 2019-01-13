import {Router} from "express";

import {Sequelize} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

/**
 * @api {delete} /stuffs/:id/translations/:code Удалить перевод
 * @apiVersion 1.0.0
 * @apiName DeleteTranslation
 * @apiGroup Stuffs
 * @apiPermission Модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID материала
 * @apiParam {string="en", "ru"} :code Язык перевода
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :code неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :code неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Материал не найден) {string="DB_STUFF_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Материал не найден) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthViaAuthToken
 * @apiUse v100AuthRequireModerator
 */
router.use(async (req, res) => {
  await res.achain
    .action(async () => {
      await Sequelize.instance.stuffTranslations.destroy({
        where: {
          code: req.params.code,
          stuffid: req.params.id,
        },
      });
    })
    .send204()
    .execute();
});
