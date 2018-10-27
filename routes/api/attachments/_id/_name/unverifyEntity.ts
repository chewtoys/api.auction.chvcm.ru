import {Request, Response} from "express";

import {EmailNotifications, Sequelize} from "src/index";

export default async function unverifyEntity(req: Request, res: Response) {
  await res.achain
    .action(async () => {
      if (req.entity.verified) {
        await Sequelize.instance.entity.update({
          verified: false,
        }, {
          where: {
            id: req.entity.id as string,
          },
        });
        await EmailNotifications.instance.unverified(req.entity);
      }
    })
    .execute();
}
