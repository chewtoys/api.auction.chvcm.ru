import * as SuperSequelize from "sequelize";

export interface IStuffTranslationsAttributes {
  readonly code?: string;
  readonly description?: string;
  readonly stuffid?: string;
  readonly title?: string;
}

export type IStuffTranslationsInstance =
  SuperSequelize.Instance<IStuffTranslationsAttributes> & IStuffTranslationsAttributes;

export type IStuffTranslationsModel = SuperSequelize.Model<IStuffTranslationsInstance, IStuffTranslationsAttributes>;
