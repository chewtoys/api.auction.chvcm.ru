import {
  BooleanUnit,
  NotEmptyStringUnit,
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
 * @api {post} /stuff/search Поиск по материалам
 * @apiVersion 0.0.0
 * @apiName Search
 * @apiGroup Stuff
 * @apiPermission Пользователь
 *
 * @apiDescription Результаты отсортированы в порядке возрастания названия материала
 *
 * @apiParam {string="ISO 639-1 в нижнем регистре"} [code] Фильтр по коду языка перевода
 * @apiParam {boolean} [enabled] Фильтр по включеному состоянию
 * @apiParam {string="1..9223372036854775807"} [id] Фильтр по ID материала
 * @apiParam {string="0..100"} [limit] Лимит
 * @apiParam {string="0..9223372036854775807"} [offset] Оффсет
 * @apiParam {string} [translation] Фильтр по названию или описанию материала (без учета регистра)
 *
 * @apiSuccess {object[]} stuffs Массив материалов
 * @apiSuccess {boolean} stuffs.enabled Включен ли материал?
 * @apiSuccess {string="1..9223372036854775807"} stuffs.id ID материала
 * @apiSuccess {object} stuffs.tr Переводы
 * @apiSuccess {object} [stuffs.tr.code] Перевод на язык под кодом "code" согласно ISO 639-1
 * @apiSuccess {string} stuffs.tr.code.title Название материала
 * @apiSuccess {string} stuffs.tr.code.description Описание материала
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр code неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр code неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string} message Подробное описание ошибки
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
 * @apiError (Bad Request 400 - Параметр translation неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр translation неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v000CommonHeaders
 * @apiUse v000AuthAuth
 */
router.post("/", new RequestValidator({
  body: {
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
      enabled: {
        Unit: BooleanUnit,
        optional: true,
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
      translation: {
        Unit: NotEmptyStringUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let result: IStuffInstance[] = [];
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.stuff.findAll(cleanDeep({
        include: [
          {
            model: Sequelize.instance.stuffTranslations,
            where: {
              code: _.get(req.body.value.code, "value"),
              [Sequelize.op.or]: [
                {
                  description: {
                    [Sequelize.op.iLike]: req.body.value.translation ?
                      `%${req.body.value.translation.value}%` : undefined,
                  },
                }, {
                  title: {
                    [Sequelize.op.iLike]: req.body.value.translation ?
                      `%${req.body.value.translation.value}%` : undefined,
                  },
                },
              ],
            },
          },
        ],
        limit: _.get(req.body.value.limit, "value", Const.LIMIT_LIMIT),
        offset: _.get(req.body.value.offset, "value"),
        order: [
          [Sequelize.instance.stuffTranslations, "title", "ASC"],
        ],
        where: {
          enabled: _.get(req.body.value.enabled, "value"),
          id: _.get(req.body.value.id, "value"),
        },
      }));
    })
    .json(() => {
      return {
        stuffs: result.map((stuff) => {
          const tr: {
            [key: string]: {
              title: string;
              description: string;
            },
          } = {};
          for (const trItem of (stuff as any).stuff_translations as IStuffTranslationsInstance[]) {
            tr[trItem.code as string] = {
              description: trItem.description as string,
              title: trItem.title as string,
            };
          }
          return {
            enabled: stuff.enabled,
            id: stuff.id,
            tr,
          };
        }),
      };
    })
    .execute();
});
