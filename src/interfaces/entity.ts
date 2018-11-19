import * as SuperSequelize from "sequelize";

import {IUserCommonAttributes} from "./user";

export interface IEntityAttributes extends IUserCommonAttributes {
  readonly ceo?: string;
  readonly itn?: string;
  readonly psrn?: string;
  readonly verified?: boolean;
}

export type IEntityInstance = SuperSequelize.Instance<IEntityAttributes> & IEntityAttributes;

export type IEntityModel = SuperSequelize.Model<IEntityInstance, IEntityAttributes>;
