import * as _ from "lodash";

export default function baseCreate(proto: any): any {
  if (!_.isObject(proto)) {
    return {};
  }
  return Object.create(proto);
}
