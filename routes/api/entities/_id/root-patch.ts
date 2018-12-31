import {BooleanUnit, NotEmptyStringUnit, ObjectUnit, RequestValidator, StringUnit} from "@alendo/express-req-validator";

import {Router} from "express";
import * as _ from "lodash";

import {cleanDeep, EmailNotifications, Sequelize} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

// tslint:disable max-line-length
/**
 * @api {patch} /entities/:id Изменить юридическое лицо
 * @apiVersion 1.0.0
 * @apiName ChangeEntity
 * @apiGroup Entities
 * @apiPermission Юридическое лицо или модератор
 *
 * @apiParam {string="1..9223372036854775807"} :id ID юридического лица
 * @apiParam {string} [ban_message] Сообщение о причине блокировки в markdown (вставляется в email сообщение)
 * @apiParam {boolean} [banned] Забанено ли юридическое лицо (только для модератора)?
 * @apiParam {string} [ceo] Директор
 * @apiParam {string} [name] Название огранизации
 * @apiParam {boolean} [verified] Проверено ли юридическое лицо (только для модератора)?
 *
 * @apiError (Bad Request 400 - Параметр равен null) {string="OBJECT_NULL_VALUE"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр равен null) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр :id неверный) {string="WRONG_PG_BIGSERIAL"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр :id неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр ban_message неверный) {string="WRONG_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр ban_message неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр banned или verified неверный) {string="WRONG_BOOLEAN"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр banned или verified неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Bad Request 400 - Параметр ceo или name неверный) {string="WRONG_NOT_EMPTY_STRING"} code Код ошибки
 * @apiError (Bad Request 400 - Параметр ceo или name неверный) {string} message Подробное описание ошибки
 *
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string="REQUIRED_SAME_ENTITY_OR_MODERATOR"} code Код ошибки
 * @apiError (Forbidden 403 - Требуется юридическое лицо или модератор) {string} message Подробное описание ошибки
 *
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string="DB_ENTITY_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Not Found 404 - Юридическое лицо не найдено) {string} message Подробное описание ошибки
 *
 * @apiUse v100CommonHeaders
 * @apiUse v100AuthAuth
 */
router.use(new RequestValidator({
  body: {
    Unit: ObjectUnit,
    payload: {
      ban_message: {
        Unit: StringUnit,
        optional: true,
      },
      banned: {
        Unit: BooleanUnit,
        optional: true,
      },
      ceo: {
        Unit: NotEmptyStringUnit,
        optional: true,
      },
      name: {
        Unit: NotEmptyStringUnit,
        optional: true,
      },
      verified: {
        Unit: BooleanUnit,
        optional: true,
      },
    },
  },
}).middleware, async (req, res) => {
  let verified: boolean;
  await res.achain
    .action(async () => {
      if (!req.employee) {
        delete req.body.value.ban_message;
        delete req.body.value.banned;
        delete req.body.value.verified;
      }
      verified = _.get(req.body.value.banned, "value") ||
      req.body.value.ceo && req.body.value.ceo.value !== req.entity.ceo ||
      req.body.value.name && req.body.value.name.value !== req.entity.name ||
      req.body.value.verified && req.body.value.verified.value !== req.entity.verified && req.entity.banned &&
      (!req.body.value.banned || req.body.value.banned.value === req.entity.banned) ? false :
        _.get(req.body.value.verified, "value");
      await Sequelize.instance.entity.update(cleanDeep({
        banned: _.get(req.body.value.banned, "value"),
        ceo: _.get(req.body.value.ceo, "value"),
        name: _.get(req.body.value.name, "value"),
        verified,
      }), {
        where: {
          id: req.params.id,
        },
      });
    })
    .send204()
    .action(async () => {
      if (req.body.value.banned && req.body.value.banned.value !== req.entity.banned) {
        if (req.body.value.banned.value) {
          await EmailNotifications.instance.banned({
            email: req.entity.email,
            language: req.entity.language,
            name: req.entity.name,
          }, _.get(req.body.value.ban_message, "value"));
        } else {
          await EmailNotifications.instance.unbanned(req.entity);
        }
      }
      if (!(req.body.value.banned && req.body.value.banned.value) &&
        !_.isUndefined(verified) &&
        verified !== req.entity.verified) {
        if (verified) {
          await EmailNotifications.instance.verified(req.entity);
        } else {
          await EmailNotifications.instance.unverified(req.entity);
        }
      }
    })
    .execute();
});
