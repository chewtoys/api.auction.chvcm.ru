import * as cuid from "cuid";
import * as moment from "moment";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import {Const} from "../const";
import {User} from "./user";

@Table({
  freezeTableName: true,
  tableName: "tokens_password_reset",
})
export class TokenPasswordReset extends Model<TokenPasswordReset> {
  @Column({
    defaultValue() {
      return cuid();
    },
    primaryKey: true,
    type: DataType.TEXT,
  })
  public token!: string;

  @Column({
    allowNull: false,
    field: "user_id",
    type: DataType.BIGINT,
  })
  @ForeignKey(() => User)
  public userId!: string;

  @Column({
    allowNull: false,
    defaultValue() {
      return moment()
        .add(Const.TOKENS_PASSWORD_RESET_EXPIRESIN)
        .toDate();
    },
    type: DataType.DATE,
  })
  public expires!: Date;

  @BelongsTo(() => User)
  public user!: User;
}
