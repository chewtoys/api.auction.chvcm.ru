import * as SuperSequelize from "sequelize";

export interface IStuffAttributes {
  readonly amount_type?: string;
  readonly enabled?: boolean;
  readonly id?: string;
}

export type IStuffInstance = SuperSequelize.Instance<IStuffAttributes> & IStuffAttributes;

export type IStuffModel = SuperSequelize.Model<IStuffInstance, IStuffAttributes>;
