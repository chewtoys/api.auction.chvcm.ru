import * as Joi from "joi";

export * from "./attachmentNameUnit";

import pgBigSerial from "./pgBigSerial";
import pgEnumLanguageCode from "./pgEnumLanguageCode";
import pgInterval from "./pgInterval";
import pgLimit from "./pgLimit";
import pgNumeric from "./pgNumeric";
import pgOffset from "./pgOffset";

interface IPgNumericSchema extends Joi.AnySchema {
  positive(): this;
}

export const joi = Joi.extend(
  pgBigSerial,
  pgEnumLanguageCode,
  pgInterval,
  pgLimit,
  pgNumeric,
  pgOffset,
) as typeof Joi & {
  pgBigSerial: () => Joi.AnySchema;
  pgEnumLanguageCode: () => Joi.StringSchema;
  pgInterval: () => Joi.ObjectSchema;
  pgLimit: () => Joi.AnySchema;
  pgNumeric: () => IPgNumericSchema;
  pgOffset: () => Joi.AnySchema;
};
