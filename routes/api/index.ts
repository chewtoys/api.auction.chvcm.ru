import {Router} from "express";

const router = Router();
export default router;

import employees from "./employees";
import entities from "./entities";
import lots from "./lots";
import signin from "./signin";
import stuffs from "./stuffs";
import user from "./user";
import utils from "./utils";

router.use("/employees", employees);
router.use("/entities", entities);
router.use("/lots", lots);
router.use("/signin", signin);
router.use("/stuffs", stuffs);
router.use("/user", user);
router.use("/utils", utils);

/**
 * @apiDefine v100CommonHeaders
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
 * @apiError (Bad Request 400) {string="BAD_REQUEST"} code Код ошибки
 * @apiError (Bad Request 400) {string} message Подробное описание ошибки
 *
 * @apiError (Payload Too Large 413) {string="PAYLOAD_TOO_LARGE_ERROR"} code Код ошибки
 * @apiError (Payload Too Large 413) {string} message Подробное описание ошибки
 *
 * @apiError (Internal Server Error 500) {string="INTERNAL_SERVER_ERROR"} code Код ошибки
 * @apiError (Internal Server Error 500) {string} message Подробное описание ошибки
 */
