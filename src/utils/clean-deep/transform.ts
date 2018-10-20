import * as _ from "lodash";

import arrayEach from "./arrayEach";
import baseCreate from "./baseCreate";
import baseForOwn from "./baseForOwn";

export default function transform(target: any,
                                  iteratee: (result: any, value: any, key: any, object: any) => void): any {
  const isArr = _.isArray(target);
  const isArrLike = isArr || _.isBuffer(target) || _.isTypedArray(target);

  let accumulator: any;
  const targetConstructor = target && target.constructor;
  if (isArrLike) {
    accumulator = isArr ? new targetConstructor() : [];
  } else if (_.isObject(target)) {
    accumulator = _.isFunction(targetConstructor) ? baseCreate(Object.getPrototypeOf(target)) : {};
  } else {
    accumulator = {};
  }

  (isArrLike ? arrayEach : baseForOwn)(target, (value: any, key: any, object: any) => {
    iteratee(accumulator, value, key, object);
  });
  return accumulator;
}
