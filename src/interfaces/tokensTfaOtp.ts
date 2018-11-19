import * as SuperSequelize from "sequelize";

export interface ITokensTfaOtpAttributes {
  readonly token?: string;
  readonly type?: string;
  readonly userid?: string;
}

export type ITokensTfaOtpInstance =
  SuperSequelize.Instance<ITokensTfaOtpAttributes> & ITokensTfaOtpAttributes;

export type ITokensTfaOtpModel = SuperSequelize.Model<ITokensTfaOtpInstance, ITokensTfaOtpAttributes>;
