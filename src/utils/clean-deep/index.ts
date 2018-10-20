import * as _ from "lodash";

import getAllKeysIn from "./getAllKeysIn";
import transform from "./transform";

/**
 * Remove undefined and empty values from objects
 * This function is fork of https://github.com/nunofgs/clean-deep with symbols support and removed options
 * Also this method use modified lodash
 * @param object Object
 */
export default function cleanDeep(object: any): any {
  return transform(object, (result: any, value: any, key: any) => {
    if (_.isArray(value) || _.isPlainObject(value)) {
      value = cleanDeep(value);
    }

    if (_.isPlainObject(value) && _.isEmpty(getAllKeysIn(value)) ||
      _.isArray(value) && _.isEmpty(value) ||
      value === undefined) {
      return;
    }

    if (_.isArray(result)) {
      result.push(value);
    } else {
      result[key] = value;
    }
  });
}
