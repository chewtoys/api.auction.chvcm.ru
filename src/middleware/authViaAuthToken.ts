import * as bearerToken from "express-bearer-token";
import Router from "express-promise-router";
import * as assert from "http-assert";
import * as createError from "http-errors";

import {ApiCodes} from "../apiCodes";
import {Const} from "../const";
import {IEmployeeAttributes, IEntityAttributes, IUserCommonAttributes, IUserInstance} from "../interfaces";
import {Sequelize} from "../pg";
import {Jwt} from "../utils";

export const authViaAuthToken = Router();

/**
 * @apiDefine v100AuthViaAuthToken
 *
 * @apiHeader (Authorization) {string} Authorization **Bearer** токен аутентификации
 *
 * @apiError (Unauthorized 401 - Неверный токен аутентификации) {string="JWT_VERIFY_USER"} code Код ошибки
 * @apiError (Unauthorized 401 - Неверный токен аутентификации) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Сотрудник не найден) {string="EMPLOYEE_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Unauthorized 401 - Сотрудник не найден) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Юридическое лицо не найдено) {string="DB_ENTITY_NOT_FOUND_BY_ID"} code Код ошибки
 * @apiError (Unauthorized 401 - Юридическое лицо не найдено) {string} message Подробное описание ошибки
 *
 * @apiError (Unauthorized 401 - Пользователь забанен) {string="BANNED"} code Код ошибки
 * @apiError (Unauthorized 401 - Пользователь забанен) {string} message Подробное описание ошибки
 */
authViaAuthToken.use(bearerToken(), async (req, res) => {
  let verifiedUser;
  try {
    verifiedUser = await Jwt.verifyUser(req.token);
  } catch (error) {
    throw createError(401, error.message, {code: ApiCodes.JWT_VERIFY_USER});
  }
  switch (verifiedUser.type) {
    case Const.USER_TYPE_EMPLOYEE: {
      req.employee = await Sequelize.instance.employee.findByPk(verifiedUser.id, {
        attributes: ["admin", "banned", "email", "id", "language", "moderator", "name"],
      }) as IEmployeeAttributes;
      assert(req.employee, 401, "employee with same id not found", {code: ApiCodes.EMPLOYEE_NOT_FOUND_BY_ID});
      break;
    }
    case Const.USER_TYPE_ENTITY: {
      // TODO: code here!
      break;
    }
  }
  return "next";
});
