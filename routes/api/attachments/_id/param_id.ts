import {NextFunction, Request, Response} from "express";

import {ApiCodes, Sequelize} from "src/index";

export default async function paramId(req: Request, res: Response, next: NextFunction) {
  await res.achain
    .check(() => {
      return !!req.entity && req.entity.id === req.params.id || !!req.employee && !!req.employee.moderator;
    }, ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR, "required entity with same id or moderator", 403)
    .action(async () => {
      if (!req.entity) {
        const entity = await Sequelize.instance.entity.findByPk(req.params.id);
        if (entity) {
          req.entity = entity;
        }
      }
    })
    .check(() => {
      return !!req.entity;
    }, ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID, "entity with same id not found", 404)
    .execute(next);
}
