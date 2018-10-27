import {Router} from "express";

const router = Router();
export default router;

import attachments from "./attachments";
import employee from "./employee";
import entity from "./entity";
import lot from "./lot";
import password from "./password";
import stuff from "./stuff";
import tfa from "./tfa";
import user from "./user";

import limits from "./limits";
import ping from "./ping";
import signin from "./signin";
import signup from "./signup";

router.use("/attachments", attachments);
router.use("/employee", employee);
router.use("/entity", entity);
router.use("/lot", lot);
router.use("/password", password);
router.use("/stuff", stuff);
router.use("/tfa", tfa);
router.use("/user", user);

router.use("/limits", limits);
router.use("/ping", ping);
router.use("/signin", signin);
router.use("/signup", signup);

/**
 * @apiDefine v000CommonHeaders
 * @apiHeader (Accept-Encoding) {string="gzip", "deflate", "identity"} [Accept-Encoding]
 * Перечень поддерживаемых способов кодирования содержимого сущности при передаче
 *
 * @apiHeader (Content-Type запроса) {string="application/json"} [Content-Type]
 * Формат и способ представления сущности
 *
 * @apiHeader (Content-Type ответа) {string="application/json"} [Content-Type]
 * Формат и способ представления сущности
 *
 * @apiHeader (Content-Encoding) {string="gzip", "deflate", "identity"} [Content-Encoding]
 * Способ кодирования содержимого сущности при передаче
 *
 * @apiHeader (Origin) {string} [Origin]
 * Инициализировать получение прав на совместное использование ресурсов между разными источниками
 *
 * @apiError (Payload Too Large 413) {string="PAYLOAD_TOO_LARGE_ERROR"} code Код ошибки
 * @apiError (Payload Too Large 413) {string} message Подробное описание ошибки
 *
 * @apiError (Internal Server Error 500) {string="INTERNAL_SERVER_ERROR"} code Код ошибки
 * @apiError (Internal Server Error 500) {string} message Подробное описание ошибки
 */
