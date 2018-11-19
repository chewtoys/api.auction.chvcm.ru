import * as SuperSequelize from "sequelize";

export interface ITokensPasswordResetAttributes {
  readonly expires?: Date;
  readonly token?: string;
  readonly userid?: string;
}

export type ITokensPasswordResetInstance =
  SuperSequelize.Instance<ITokensPasswordResetAttributes> & ITokensPasswordResetAttributes;

export type ITokensPasswordResetModel =
  SuperSequelize.Model<ITokensPasswordResetInstance, ITokensPasswordResetAttributes>;
