import {NextFunction, Request, Response} from "express";

import {ApiCodes, Sequelize} from "src";

export default async function paramId(req: Request, res: Response, next: NextFunction) {
  let isStuffExists: boolean;
  await res.achain
    .action(async () => {
      isStuffExists = !!(await Sequelize.instance.stuff.findByPk(req.params.id));
    })
    .check(() => {
      return isStuffExists;
    }, ApiCodes.DB_STUFF_NOT_FOUND_BY_ID, "stuff with same id not found", 404)
    .execute(next);
}
