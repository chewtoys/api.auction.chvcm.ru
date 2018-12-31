import {NextFunction, Request, RequestHandler, Response} from "express";

import {ApiCodes} from "../apiCodes";
import {Sequelize} from "../pg";
import {cleanDeep} from "../utils";

interface IUniqueEmailPhoneResult {
  email: boolean;
  phone: boolean;
}

interface IUniqueItnPsrnResult {
  itn: boolean;
  psrn: boolean;
}

/**
 * Unique middleware collection
 */
export class Unique {
  /**
   * Check email and phone for unique
   * @param email Email
   * @param phone Phone
   * @throws Error
   */
  public static async checkEmailAndPhone(email?: string, phone?: string): Promise<IUniqueEmailPhoneResult> {
    if (!email && !phone) {
      return {
        email: false,
        phone: false,
      };
    }
    const users = await Sequelize.instance.user.findAll({
      attributes: ["email", "phone"],
      where: cleanDeep({
        [Sequelize.op.or]: [
          {
            email,
          }, {
            phone,
          },
        ],
      }),
    });
    return {
      email: users.some((user) => user.email === email),
      phone: users.some((user) => user.phone === phone),
    };
  }

  /**
   * Check ITN and PSRN for unique
   * @param itn ITN
   * @param psrn PSRN
   * @throws Error
   */
  public static async checkItnAndPsrn(itn: string, psrn: string): Promise<IUniqueItnPsrnResult> {
    const entities = await Sequelize.instance.entity.findAll({
      attributes: ["itn", "psrn"],
      where: {
        [Sequelize.op.or]: [
          {
            itn,
          }, {
            psrn,
          },
        ],
      },
    });
    return {
      itn: entities.some((entity) => entity.itn === itn),
      psrn: entities.some((entity) => entity.psrn === psrn),
    };
  }

  /**
   * @apiDefine v100UniqueCheckEmailAndPhone
   *
   * @apiError (Conflict 409 - Пользователь уже существует) {string="DB_USER_FOUND_BY_EMAIL_AND_PHONE"} code
   * Код ошибки
   * @apiError (Conflict 409 - Пользователь уже существует) {string} message Подробное описание ошибки
   *
   * @apiError (Conflict 409 - Email уже существует) {string="DB_USER_FOUND_BY_EMAIL"} code Код ошибки
   * @apiError (Conflict 409 - Email уже существует) {string} message Подробное описание ошибки
   *
   * @apiError (Conflict 409 - Телефон уже существует) {string="DB_USER_FOUND_BY_PHONE"} code Код ошибки
   * @apiError (Conflict 409 - Телефон уже существует) {string} message Подробное описание ошибки
   */

  /**
   * Check email and phone for unique middleware
   * @param getEmailAndPhone Get email and phone
   */
  public static checkEmailAndPhoneMiddleware(getEmailAndPhone: (req: Request) => { email?: string, phone?: string })
    : RequestHandler {
    return async (req, res, next) => {
      let checkResult: IUniqueEmailPhoneResult;
      await res.achain
        .action(async () => {
          const {email, phone} = getEmailAndPhone(req);
          checkResult = await Unique.checkEmailAndPhone(email, phone);
        })
        .check(() => {
          return !(checkResult.email && checkResult.phone);
        }, ApiCodes.DB_USER_FOUND_BY_EMAIL_AND_PHONE, "user with same email and phone already exists", 409)
        .check(() => {
          return !(checkResult.email && !checkResult.phone);
        }, ApiCodes.DB_USER_FOUND_BY_EMAIL, "user with same email already exists", 409)
        .check(() => {
          return !(!checkResult.email && checkResult.phone);
        }, ApiCodes.DB_USER_FOUND_BY_PHONE, "user with same phone already exists", 409)
        .execute(next);
    };
  }

  /**
   * @apiDefine v100UniqueCheckItnAndPsrn
   *
   * @apiError (Conflict 409 - Юридическое лицо уже существует) {string="DB_ENTITY_FOUND_BY_ITN_AND_PSRN"} code
   * Код ошибки
   * @apiError (Conflict 409 - Юридическое лицо уже существует) {string} message Подробное описание ошибки
   *
   * @apiError (Conflict 409 - ИНН уже существует) {string="DB_ENTITY_FOUND_BY_ITN"} code Код ошибки
   * @apiError (Conflict 409 - ИНН уже существует) {string} message Подробное описание ошибки
   *
   * @apiError (Conflict 409 - ОГРН уже существует) {string="DB_ENTITY_FOUND_BY_PSRN"} code Код ошибки
   * @apiError (Conflict 409 - ОГРН уже существует) {string} message Подробное описание ошибки
   */

  /**
   * Check ITN and PSRN for unique middleware
   * @param getItnAndPsrn Get ITN and PSRN
   */
  public static checkItnAndPsrnMiddleware(getItnAndPsrn: (req: Request) => { itn: number, psrn: number })
    : RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      let checkResult: IUniqueItnPsrnResult;
      await res.achain
        .action(async () => {
          const {itn, psrn} = getItnAndPsrn(req);
          checkResult = await Unique.checkItnAndPsrn(itn.toString(), psrn.toString());
        })
        .check(() => {
          return !(checkResult.itn && checkResult.psrn);
        }, ApiCodes.DB_ENTITY_FOUND_BY_ITN_AND_PSRN, "entity with same itn and psrn already exists", 409)
        .check(() => {
          return !(checkResult.itn && !checkResult.psrn);
        }, ApiCodes.DB_ENTITY_FOUND_BY_ITN, "entity with same itn already exists", 409)
        .check(() => {
          return !(!checkResult.itn && checkResult.psrn);
        }, ApiCodes.DB_ENTITY_FOUND_BY_PSRN, "entity with same psrn already exists", 409)
        .execute(next);
    };
  }
}
