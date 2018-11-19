import {
  ObjectUnit,
  PgBigSerialUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  PgLimitUnit,
  PgOffsetUnit,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, Const, IStuffInstance, IStuffTranslationsInstance, Sequelize} from "src";

const router = Router();
export default router;

/**
 * @api {get} /stuffs Получить список материалов
 * @apiVersion 1.0.0
 * @apiName ListStuffs
 * @apiGroup Stuffs
 * @apiPermission Пользователь
 *
 * @apiDescription Результаты отсортированы в порядке возрастания названия материала
 *
 * @apiParam (Query) {string="ISO 639-1 в нижнем регистре"} [code] Фильтр по языку перевода
 * (`"en"` по умолчанию, если не задан ID)
 * @apiParam (Query) {string="1..9223372036854775807"} [id] Фильтр по ID
 * @apiParam (Query) {string="0..100"} [limit='"100"'] Лимит (не учитывается когда задан ID)
 * @apiParam (Query) {string="0..9223372036854775807"} [offset] Оффсет (не учитывается когда задан ID)
 *
 * @apiSuccess {object[]} stuffs Список материалов
 * @apiSuccess {string="kg","piece"} stuffs.amount_type Еденица измерения
 * @apiSuccess {boolean} stuffs.enabled Включен ли материал?
 * @apiSuccess {string="1..9223372036854775807"} stuffs.id ID материала
 * @apiSuccess {object[]} stuffs.translations Список переводов
 * @apiSuccess {string="ISO 639-1 в нижнем регистре"} stuffs.translations.code Язык перевода
 * @apiSuccess {string} stuffs.translations.title Название материала
 * @apiSuccess {string} stuffs.translations.description Описание материала (может быть пустым)
 *
 * @apiError (Bad Request 400 - Параметр code неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр code неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр limit неверный) {string="WRONG_PG_LIMIT"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр limit неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр offset неверный) {string="WRONG_PG_OFFSET"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр offset неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(new RequestValidator({
  query: {
    Unit: ObjectUnit,
    payload: {
      code: {
        Unit: PgEnumUnit,
        optional: true,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "LANGUAGE_CODE",
        },
      },
      id: {
        Unit: PgBigSerialUnit,
        optional: true,
      },
      limit: {
        Unit: PgLimitUnit,
        optional: true,
        payload: Const.LIMIT_LIMIT,
      },
      offset: {
        Unit: PgOffsetUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let result: IStuffInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.stuff.findAll(cleanDeep({
        include: [{
          model: Sequelize.instance.stuffTranslations,
          required: false,
          where: {
            code: _.get(req.query.value.code, "value", _.get(req.query.value.id, "value") ? undefined : "en"),
          },
        }],
        limit: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.limit, "value", Const.LIMIT_LIMIT),
        offset: _.get(req.query.value.id, "value") ? undefined :
          _.get(req.query.value.offset, "value"),
        order: [
          [Sequelize.instance.stuffTranslations, "title", "ASC"],
        ],
        subQuery: false,
        where: {
          id: _.get(req.query.value.id, "value"),
        },
      }));
    })
    .json(() => {
      return {
        stuffs: result.map((stuff) => {
          return {
            amount_type: stuff.amount_type,
            enabled: stuff.enabled,
            id: stuff.id,
            translations: ((stuff as any).stuff_translations as IStuffTranslationsInstance[]).map((tr) => {
              return {
                code: tr.code,
                description: tr.description,
                title: tr.title,
              };
            }),
          };
        }),
      };
    })
    .execute();
});
