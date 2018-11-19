import {allowReCaptcha} from "../../common";

import {
  PgBigSerialUnitCodes,
  PgEnumUnitCodes,
  PgLimitUnitCodes,
  PgOffsetUnitCodes,
} from "@alendo/express-req-validator";

import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Sequelize,
  Web,
} from "../../../src";

describe("GET /stuffs", () => {
  let token: string;
  beforeEach(async () => {
    allowReCaptcha();

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
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "piece",
      })
      .expect(201, {
        id: "2",
      });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "3",
      });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        enabled: false,
      })
      .expect(204);
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ebonite",
      })
      .expect(204);
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/1/translations/ru`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Эбонит",
      })
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/2/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Metal",
      })
      .expect(204);
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/2/translations/ru`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Металл",
      })
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/3/translations/en`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gold",
      })
      .expect(204);
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/stuffs/3/translations/ru`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Золотой слиток",
        title: "Золото",
      })
      .expect(204);
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("wrong code", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "russian",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable max-line-length
        message: "query.code: value must be one of these values ['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']",
      });
  });

  it("wrong id", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "0",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "query.id: bigserial must be more or equal than 1",
      });
  });

  it("wrong limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "all",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must contain only digits",
      });
  });

  it("more limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "1000",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: `query.limit: limit must be less or equal than ${Const.LIMIT_LIMIT}`,
      });
  });

  it("less limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "-1",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must be more or equal than 0",
      });
  });

  it("wrong offset", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: "all",
      })
      .expect(400, {
        code: PgOffsetUnitCodes.WRONG_PG_OFFSET,
        message: "query.offset: offset must contain only digits",
      });
  });

  it("find by id - empty array", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "999",
      })
      .expect(200, {
        stuffs: [],
      });
  });

  it("find by id - 1", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "1",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [
              {
                code: "en",
                description: "",
                title: "Ebonite",
              }, {
                code: "ru",
                description: "",
                title: "Эбонит",
              },
            ],
          },
        ],
      });
  });

  it("find by id - 2", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "2",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [
              {
                code: "en",
                description: "",
                title: "Metal",
              }, {
                code: "ru",
                description: "",
                title: "Металл",
              },
            ],
          },
        ],
      });
  });

  it("find by id - 3", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "3",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [
              {
                code: "en",
                description: "",
                title: "Gold",
              }, {
                code: "ru",
                description: "Золотой слиток",
                title: "Золото",
              },
            ],
          },
        ],
      });
  });

  it("find by id with existing code", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "ru",
        id: "1",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "ru",
              description: "",
              title: "Эбонит",
            }],
          },
        ],
      });
  });

  it("find by id with not existing code", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "uk",
        id: "1",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [],
          },
        ],
      });
  });

  it("find all - default code (en)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "en",
              description: "",
              title: "Ebonite",
            }],
          }, {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "en",
              description: "",
              title: "Gold",
            }],
          }, {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "en",
              description: "",
              title: "Metal",
            }],
          },
        ],
      });
  });

  it("find all - code en", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "en",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "en",
              description: "",
              title: "Ebonite",
            }],
          }, {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "en",
              description: "",
              title: "Gold",
            }],
          }, {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "en",
              description: "",
              title: "Metal",
            }],
          },
        ],
      });
  });

  it("find all - code ru", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "ru",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "ru",
              description: "Золотой слиток",
              title: "Золото",
            }],
          }, {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "ru",
              description: "",
              title: "Металл",
            }],
          }, {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "ru",
              description: "",
              title: "Эбонит",
            }],
          },
        ],
      });
  });

  it("find all - not existing code", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "uk",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [],
          }, {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [],
          }, {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [],
          },
        ],
      });
  });

  it("find all - default code (en) - limit 2 offset 0", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "2",
        offset: "0",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "en",
              description: "",
              title: "Ebonite",
            }],
          }, {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "en",
              description: "",
              title: "Gold",
            }],
          },
        ],
      });
  });

  it("find all - code ru - limit 2 offset 0", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "ru",
        limit: "2",
        offset: "0",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "ru",
              description: "Золотой слиток",
              title: "Золото",
            }],
          }, {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "ru",
              description: "",
              title: "Металл",
            }],
          },
        ],
      });
  });

  it("find all - default code (en) - offset 1", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: "1",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "kg",
            enabled: true,
            id: "3",
            translations: [{
              code: "en",
              description: "",
              title: "Gold",
            }],
          }, {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "en",
              description: "",
              title: "Metal",
            }],
          },
        ],
      });
  });

  it("find all - code ru - offset 1", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        code: "ru",
        offset: "1",
      })
      .expect(200, {
        stuffs: [
          {
            amount_type: "piece",
            enabled: true,
            id: "2",
            translations: [{
              code: "ru",
              description: "",
              title: "Металл",
            }],
          }, {
            amount_type: "kg",
            enabled: false,
            id: "1",
            translations: [{
              code: "ru",
              description: "",
              title: "Эбонит",
            }],
          },
        ],
      });
  });

  it("find all - offset 3", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: 3,
      })
      .expect(200, {stuffs: []});
  });
});
