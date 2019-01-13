import * as Joi from "joi";
import {Extension} from "joi";

export default (joi: typeof Joi): Extension => ({
  base: joi.string().valid("en", "ru"),
  name: "pgEnumLanguageCode",
});
