import * as SuperSequelize from "sequelize";

export interface IUserCommonAttributes {
  readonly banned?: boolean;
  readonly email?: string;
  readonly id?: string;
  readonly language?: string;
  readonly name?: string;
  readonly password?: string | null;
  readonly phone?: string;
  readonly registration?: Date;
  readonly tfa?: boolean;
}

export interface IUserAttributes extends IUserCommonAttributes {
  readonly type?: string;
}

export type IUserInstance = SuperSequelize.Instance<IUserAttributes> & IUserAttributes;

export type IUserModel = SuperSequelize.Model<IUserInstance, IUserAttributes>;
