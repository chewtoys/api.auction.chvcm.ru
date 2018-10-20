import * as _ from "lodash";

import getSymbolsIn from "./getSymbolsIn";

export default function getAllKeysIn(object: any): Array<string | symbol> {
  const result: Array<string | symbol> = _.keysIn(object);
  if (!_.isArray(object)) {
    result.push(...getSymbolsIn(object));
  }
  return result;
}
