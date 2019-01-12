import Router from "express-promise-router";
import {Recaptcha} from "express-recaptcha";
import * as assert from "http-assert";

import {ApiCodes} from "../apiCodes";
import {Env} from "../env";

export const reCaptcha2 = Router();

/**
 * @apiDefine v100Recaptcha2
 *
 * @apiError (Unauthorized 401 - reCaptcha v2 запретила доступ) {string="RECAPTCHA_V2"} code Код ошибки
 * @apiError (Unauthorized 401 - reCaptcha v2 запретила доступ) {string} message Подробное описание ошибки
 */
reCaptcha2.use(new Recaptcha("site_key", Env.RECAPTCHA_SECRET, {
  checkremoteip: true,
}).middleware.verify, async (req) => {
  assert(req.recaptcha && !req.recaptcha.error, 401,
    req.recaptcha ? req.recaptcha.error : "reCaptcha v2 verification request was not sent",
    {code: ApiCodes.RECAPTCHA_V2});
  return "next";
});
