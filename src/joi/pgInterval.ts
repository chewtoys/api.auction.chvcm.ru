import * as Joi from "joi";
import {Extension, State, ValidationOptions} from "joi";
import * as _ from "lodash";
import * as postgresInterval from "postgres-interval";

export default (joi: typeof Joi): Extension => ({
  base: joi.object().keys({
    days: joi.number().integer().positive(),
    hours: joi.number().integer().positive(),
    milliseconds: joi.number().integer().positive(),
    minutes: joi.number().integer().positive(),
    months: joi.number().integer().positive(),
    seconds: joi.number().integer().positive(),
    years: joi.number().integer().positive(),
  }),
  coerce(value: any, state: State, options: ValidationOptions): any {
    return _.isPlainObject(value) ? value : Object.assign({}, postgresInterval(value));
  },
  name: "pgInterval",
});
