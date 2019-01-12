import "../../../common";

import {
  NotEmptyStringUnitCodes,
  ObjectUnitCodes,
  PgBigSerialUnitCodes,
  PgEnumUnitCodes,
  StringUnitCodes,
} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  IStuffTranslationsInstance,
  Sequelize,
  Web,
} from "../../../../src";

describe("PUT /stuffs/:id/translations/:code", () => {
  let token: string;
  beforeEach(async () => {
    await Sequelize.instance.employee.create({
      email: "admin@example.com",
      language: "ru",
      moderator: true,
      name: "admin",
      password: await Bcrypt.hash("super duper password"),
      phone: "+79123456789",
      tfa: false,
    });
    token = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "1",
      });
  });

  it("null title", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.title: value can't be null",
      });
  });

  it("null description", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: null,
        title: "Title",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.description: value can't be null",
      });
  });

  it("missing title", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.title: missing value",
      });
  });

  it("wrong id", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/0/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("wrong id - not found", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/999/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404, {
        code: ApiCodes.DB_STUFF_NOT_FOUND_BY_ID,
        message: "stuff with same id not found",
      });
  });

  it("wrong code", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/russian`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable max-line-length
        message: "params.code: value must be one of these values ['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']",
      });
  });

  it("wrong title", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.title: value must be not empty string",
      });
  });

  it("wrong description", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: 45,
        title: "Title",
      })
      .expect(400, {
        code: StringUnitCodes.WRONG_STRING,
        message: "body.description: value must be string",
      });
  });

  it("required moderator", async () => {
    await Sequelize.instance.employee.update({
      moderator: false,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_MODERATOR,
        message: "required moderator",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("correct - create translation without description", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gold",
      })
      .expect(204);

    const tr = await Sequelize.instance.stuffTranslations.findOne({
      where: {
        code: "en",
        stuffid: "1",
      },
    }) as IStuffTranslationsInstance;

    expect(tr.title).equal("Gold");
    expect(tr.description).equal("");
  });

  it("correct - create translation with empty description", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "",
        title: "Gold",
      })
      .expect(204);

    const tr = await Sequelize.instance.stuffTranslations.findOne({
      where: {
        code: "en",
        stuffid: "1",
      },
    }) as IStuffTranslationsInstance;

    expect(tr.title).equal("Gold");
    expect(tr.description).equal("");
  });

  it("correct - create translation with description", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Description",
        title: "Gold",
      })
      .expect(204);

    const tr = await Sequelize.instance.stuffTranslations.findOne({
      where: {
        code: "en",
        stuffid: "1",
      },
    }) as IStuffTranslationsInstance;

    expect(tr.title).equal("Gold");
    expect(tr.description).equal("Description");
  });

  it("correct - create and change translation", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Gold Description",
        title: "Gold",
      })
      .expect(204);

    let tr = await Sequelize.instance.stuffTranslations.findOne({
      where: {
        code: "en",
        stuffid: "1",
      },
    }) as IStuffTranslationsInstance;

    expect(tr.title).equal("Gold");
    expect(tr.description).equal("Gold Description");

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Iron Description",
        title: "Iron",
      })
      .expect(204);

    tr = await Sequelize.instance.stuffTranslations.findOne({
      where: {
        code: "en",
        stuffid: "1",
      },
    }) as IStuffTranslationsInstance;

    expect(tr.title).equal("Iron");
    expect(tr.description).equal("Iron Description");
  });

  it("correct - create multiply translations", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/ru`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "660мм х 100мм х 80мм\n14кг - 16кг",
        title: "Алюминиевая чушка в виде усеченного параллелепипеда",
      })
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "660mm x 100mm x 80mm\n14kg - 16kg",
        title: "Aluminum bar in the form of a truncated parallelepiped",
      })
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/de`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "660mm x 100mm x 80mm\n14kg - 16kg",
        title: "Aluminiumstange in form eines abgestumpften parallelepipeds",
      })
      .expect(204);

    const trs = await Sequelize.instance.stuffTranslations.findAll({
      order: [
        ["code", "ASC"],
      ],
      where: {
        stuffid: "1",
      },
    });

    expect(trs.length).equal(3);

    expect(trs[0].code).equal("de");
    expect(trs[0].title).equal("Aluminiumstange in form eines abgestumpften parallelepipeds");
    expect(trs[0].description).equal("660mm x 100mm x 80mm\n14kg - 16kg");

    expect(trs[1].code).equal("en");
    expect(trs[1].title).equal("Aluminum bar in the form of a truncated parallelepiped");
    expect(trs[1].description).equal("660mm x 100mm x 80mm\n14kg - 16kg");

    expect(trs[2].code).equal("ru");
    expect(trs[2].title).equal("Алюминиевая чушка в виде усеченного параллелепипеда");
    expect(trs[2].description).equal("660мм х 100мм х 80мм\n14кг - 16кг");
  });
});
