import * as SuperSequelize from "sequelize";

export interface ITokensTfaPurgatoryAttributes {
  readonly expires?: Date;
  readonly token?: string;
  readonly userid?: string;
}

export type ITokensTfaPurgatoryInstance =
  SuperSequelize.Instance<ITokensTfaPurgatoryAttributes> & ITokensTfaPurgatoryAttributes;

export type ITokensTfaPurgatoryModel = SuperSequelize.Model<ITokensTfaPurgatoryInstance, ITokensTfaPurgatoryAttributes>;
