import {IPostgresInterval} from "postgres-interval";
import * as SuperSequelize from "sequelize";

export interface ILotAttributes {
  readonly amount?: string;
  readonly buffer?: IPostgresInterval;
  readonly currency?: string;
  readonly finish?: Date;
  readonly id?: string;
  readonly participants?: string;
  readonly start?: Date;
  readonly startbid?: string;
  readonly step?: string;
  readonly strict?: boolean;
  readonly stuffid?: string;
  readonly type?: string;
  readonly winbid?: string | null;
  readonly winner?: string | null;
}

export type ILotInstance = SuperSequelize.Instance<ILotAttributes> & ILotAttributes;

export type ILotModel = SuperSequelize.Model<ILotInstance, ILotAttributes>;
