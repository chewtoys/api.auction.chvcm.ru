import {
  BooleanUnit,
  NotEmptyStringUnit,
  ObjectUnit,
  PgBigSerialUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  RequestValidator,
  StringUnit,
} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {
  Auth,
  cleanDeep,
  IStuffInstance,
  Sequelize,
} from "src";

const router = Router();
export default router;

router.use(Auth.requireModerator);

/**
 * @api {post} /stuff Создать новый материал
 * @apiVersion 0.0.0
 * @apiName Create
 * @apiGroup Stuff
 * @apiPermission Модератор
 *
 * @apiSuccess {string="1..9223372036854775807"} id ID материала
 *
 * @apiUse v000CommonHeaders
 * @apiUse v000AuthAuth
 * @apiUse v000AuthRequireModerator
 */
router.post("/", async (req, res) => {
  let result: IStuffInstance;
  await res.achain
    .action(async () => {
      result = await Sequelize.instance.stuff.create({
        enabled: true,
      }, {
        returning: true,
      });
    })
    .json(() => {
      return {
        id: result.id,
      };
    })
    .execute();
});

/**
 * @api {post} /stuff/:id Изменить материал
 * @apiVersion 0.0.0
 * @apiName Update
 * @apiGroup Stuff
 * @apiPermission Модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID материала
 * @apiParam {boolean} [enabled] Включен ли материал?
 * @apiParam {object} [tr] Переводы
 * @apiParam {object} [tr.code] Перевод на язык под кодом "code" согласно ISO 639-1
 * @apiParam {string} tr.code.title Название материала
 * @apiParam {string} [tr.code.description] Описание материала (может быть пустым)
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр enabled неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр tr неверный) {string="WRONG_OBJECT"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр tr неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр tr[*] неверный) {string="WRONG_PG_ENUM"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр tr[*] неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр tr* неверный) {string="WRONG_STRING", "WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр tr* неверный) {string} message Подробное описание ошибки
 *
 * @apiUse v000CommonHeaders
 * @apiUse v000AuthAuth
 * @apiUse v000AuthRequireModerator
 */
router.post("/:id", new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      enabled: {
        Unit: BooleanUnit,
        optional: true,
      },
      tr: {
        Unit: ObjectUnit,
        optional: true,
        payload: {
          [ObjectUnit.ENUM_KEY]: {
            Unit: PgEnumUnit,
            payload: {
              cache: PgEnumUnitCacheMemory,
              client: PgEnumUnitClient,
              enumName: "LANGUAGE_CODE",
            },
          },
          [ObjectUnit.ENUM_VALUE]: {
            Unit: ObjectUnit,
            payload: {
              description: {
                Unit: StringUnit,
                optional: true,
              },
              title: {
                Unit: NotEmptyStringUnit,
              },
            },
          },
        },
      },
    },
  },
  params: {
    Unit: ObjectUnit,
    payload: {
      id: {
        Unit: PgBigSerialUnit,
      },
    },
  },
}).middleware, async (req, res) => {
  await res.achain
    .action(async () => {
      await Sequelize.instance.transaction(async () => {
        if (req.body.value.enabled) {
          await Sequelize.instance.stuff.update({
            enabled: req.body.value.enabled.value,
          }, {
            where: {
              id: req.params.value.id.value,
            },
          });
        }
        if (req.body.value.tr) {
          await Sequelize.instance.stuffTranslations.destroy({
            where: {
              stuffid: req.params.value.id.value,
            },
          });
          await Sequelize.instance.stuffTranslations.bulkCreate(
            Object.keys(req.body.value.tr.value).map((key) => {
              const tr = req.body.value.tr.value[key].value;
              return cleanDeep({
                code: key,
                description: _.get(tr.description, "value"),
                stuffid: req.params.value.id.value,
                title: tr.title.value,
              });
            }));
        }
      });
    })
    .send204()
    .execute();
});
