import "../../common";
import waitForExpect from "../../wait-for-expect";

import {
  EmailUnitCodes,
  ItnUnitCodes,
  NotEmptyStringUnitCodes,
  ObjectUnitCodes,
  PgEnumUnitCodes,
  PhoneUnitCodes,
  PsrnUnitCodes,
  ZxcvbnUnitCodes,
} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";

import {
  ApiCodes,
  Const,
  EmailNotifications,
  Env,
  IEntityInstance,
  Jwt,
  Sequelize,
  Web,
} from "../../../src";

describe("POST /entities", () => {
  it("Bad Request 400 - OBJECT_MISSING_KEY (ceo)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.ceo: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (email)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.email: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (itn)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.itn: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (language)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.language: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (name)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.name: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (password)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.password: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (phone)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.phone: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (psrn)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.psrn: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (ceo)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: null,
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.ceo: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (email)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: null,
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.email: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (itn)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: null,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.itn: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (language)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: null,
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.language: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (name)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: null,
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.name: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (password)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: null,
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.password: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (phone)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: null,
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.phone: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (psrn)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.psrn: value can't be null",
      });
  });

  it("Bad Request 400 - wrong ceo", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.ceo: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong email", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: EmailUnitCodes.WRONG_EMAIL,
        message: `body.email: email must be in format "user@example.com"`,
      });
  });

  it("Bad Request 400 - wrong itn", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ItnUnitCodes.WRONG_JURIDICAL_ITN,
        message: "body.itn: itn must contains 10 digits with the correct checksum",
      });
  });

  it("Bad Request 400 - wrong language", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "tlh",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable max-line-length
        message: "body.language: value must be one of these values ['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']",
      });
  });

  it("Bad Request 400 - wrong name", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: true,
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.name: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong password", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
        message: `body.password: password minimum score must be >= ${Const.MINIMUM_PASSWORD_SCORE}`,
      });
  });

  it("Bad Request 400 - wrong phone", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "++9923456789",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(400, {
        code: PhoneUnitCodes.WRONG_PHONE,
        message: `body.phone: invalid phone format for locale ${Const.PHONE_LOCALE}`,
      });
  });

  it("Bad Request 400 - wrong psrn", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327,
      })
      .expect(400, {
        code: PsrnUnitCodes.WRONG_JURIDICAL_PSRN,
        message: "body.psrn: psrn must contains 13 digits with the correct checksum",
      });
  });

  it("Conflict 409 - user with same email and phone already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL_AND_PHONE,
        message: "user with same email and phone already exists",
      });
  });

  it("Conflict 409 - user with same email already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456789",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL,
        message: "user with same email already exists",
      });
  });

  it("Conflict 409 - user with same phone already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.org",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_PHONE,
        message: "user with same phone already exists",
      });
  });

  it("Conflict 409 - entity with same itn and psrn already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.org",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456789",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_ENTITY_FOUND_BY_ITN_AND_PSRN,
        message: "entity with same itn and psrn already exists",
      });
  });

  it("Conflict 409 - entity with same itn already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.org",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456789",
        psrn: 1_03_37_00_07067_8,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_ENTITY_FOUND_BY_ITN,
        message: "entity with same itn already exists",
      });
  });

  it("Conflict 409 - entity with same psrn already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.org",
        itn: 77_04_59572_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456789",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(409, {
        code: ApiCodes.DB_ENTITY_FOUND_BY_PSRN,
        message: "entity with same psrn already exists",
      });
  });

  it("correct - ru email", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Вы успешно зарегистрировались!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    expect(res.body).to.have.keys("token");
    expect(res.body.token).be.a("string");

    const parsedToken = await Jwt.verifyUser(res.body.token);
    expect(parsedToken).to.have.keys("id", "type");
    expect(parsedToken.id).be.a("string");
    expect(parsedToken.type).be.a("string");
    expect(parsedToken.id).equal("1");
    expect(parsedToken.type).equal("entity");

    const entity = await Sequelize.instance.entity.findByPk("1");
    expect((entity as IEntityInstance).id).equal("1");
    expect((entity as IEntityInstance).name).equal("Luminoso");
    expect((entity as IEntityInstance).email).equal("entity@example.com");
    expect((entity as IEntityInstance).phone).equal("+79123456780");
    expect((entity as IEntityInstance).tfa).equal(false);
    expect((entity as IEntityInstance).language).equal("ru");
    expect((entity as IEntityInstance).banned).equal(false);
    expect((entity as IEntityInstance).registration).be.a("Date");
    expect((entity as IEntityInstance).ceo).equal("Catherine Havasi");
    expect((entity as IEntityInstance).psrn).equal(`${1_02_76_01_59327_1}`);
    expect((entity as IEntityInstance).itn).equal(`${76_27_01931_7}`);
    expect((entity as IEntityInstance).verified).equal(false);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "entity@example.com",
        password: "super duper password",
      })
      .expect(200);
  });

  it("correct - en email", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "en",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("You have successfully registered!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    expect(res.body).to.have.keys("token");
    expect(res.body.token).be.a("string");

    const parsedToken = await Jwt.verifyUser(res.body.token);
    expect(parsedToken).to.have.keys("id", "type");
    expect(parsedToken.id).be.a("string");
    expect(parsedToken.type).be.a("string");
    expect(parsedToken.id).equal("1");
    expect(parsedToken.type).equal("entity");

    const entity = await Sequelize.instance.entity.findByPk("1");
    expect((entity as IEntityInstance).id).equal("1");
    expect((entity as IEntityInstance).name).equal("Luminoso");
    expect((entity as IEntityInstance).email).equal("entity@example.com");
    expect((entity as IEntityInstance).phone).equal("+79123456780");
    expect((entity as IEntityInstance).tfa).equal(false);
    expect((entity as IEntityInstance).language).equal("en");
    expect((entity as IEntityInstance).banned).equal(false);
    expect((entity as IEntityInstance).registration).be.a("Date");
    expect((entity as IEntityInstance).ceo).equal("Catherine Havasi");
    expect((entity as IEntityInstance).psrn).equal(`${1_02_76_01_59327_1}`);
    expect((entity as IEntityInstance).itn).equal(`${76_27_01931_7}`);
    expect((entity as IEntityInstance).verified).equal(false);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "entity@example.com",
        password: "super duper password",
      })
      .expect(200);
  });
});
