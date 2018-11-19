import {allowReCaptcha} from "../../common";
import waitForExpect from "../../wait-for-expect";

import {
  EmailUnitCodes,
  NotEmptyStringUnitCodes,
  ObjectUnitCodes,
  PgEnumUnitCodes,
  PhoneUnitCodes,
} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  EmailNotifications,
  Env,
  IEmployeeInstance,
  Sequelize,
  Web,
} from "../../../src";

describe("POST /employees", () => {
  let token: string;
  beforeEach(async () => {
    allowReCaptcha();

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await Sequelize.instance.employee.create({
      admin: true,
      email: "admin@example.com",
      language: "ru",
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

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
    });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (email)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: null,
        language: "ru",
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.email: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (language)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: null,
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.language: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (name)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        name: null,
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.name: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (phone)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        name: "admin",
        phone: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.phone: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (email)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        language: "ru",
        name: "admin",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.email: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (language)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        name: "admin",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.language: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (name)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        phone: "+79123456780",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.name: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (phone)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        name: "admin",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.phone: missing value",
      });
  });

  it("Bad Request 400 - wrong email", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example",
        language: "ru",
        name: "moderator",
        phone: "+79123456789",
      })
      .expect(400, {
        code: EmailUnitCodes.WRONG_EMAIL,
        message: `body.email: email must be in format "user@example.com"`,
      });
  });

  it("Bad Request 400 - wrong language", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "russian",
        name: "moderator",
        phone: "+79123456789",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable max-line-length
        message: "body.language: value must be one of these values ['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']",
      });
  });

  it("Bad Request 400 - wrong name", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "ru",
        name: "",
        phone: "+79123456789",
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.name: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong phone", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "ru",
        name: "admin",
        phone: "+7912",
      })
      .expect(400, {
        code: PhoneUnitCodes.WRONG_PHONE,
        message: `body.phone: invalid phone format for locale ${Const.PHONE_LOCALE}`,
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - banned", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
    }, {
      where: {
        id: "1",
      },
    });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required admin", async () => {
    await Sequelize.instance.employee.update({
      admin: false,
    }, {
      where: {
        id: "1",
      },
    });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_ADMIN,
        message: "required admin",
      });
  });

  it("Conflict 409 - user with same email and phone already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        name: "moderator",
        phone: "+79123456789",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL_AND_PHONE,
        message: "user with same email and phone already exists",
      });
  });

  it("Conflict 409 - user with same email already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@example.com",
        language: "ru",
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL,
        message: "user with same email already exists",
      });
  });

  it("Conflict 409 - user with same phone already exists", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "ru",
        name: "moderator",
        phone: "+79123456789",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_PHONE,
        message: "user with same phone already exists",
      });
  });

  it("correct - ru email", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "ru",
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(201, {
        id: "2",
      });

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Добро пожаловать в семью сотрудников!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2") as IEmployeeInstance;
    expect(employee.id).equal("2");
    expect(employee.name).equal("moderator");
    expect(employee.email).equal("moderator@example.com");
    expect(employee.phone).equal("+79123456780");
    expect(employee.password).equal(null);
    expect(employee.tfa).equal(false);
    expect(employee.language).equal("ru");
    expect(employee.banned).equal(false);
    expect(employee.registration).to.be.a("Date");
    expect(employee.admin).equal(false);
    expect(employee.moderator).equal(false);
  });

  it("correct - en email", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "en",
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(201, {
        id: "2",
      });

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Welcome to the family of employees!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2") as IEmployeeInstance;
    expect(employee.id).equal("2");
    expect(employee.name).equal("moderator");
    expect(employee.email).equal("moderator@example.com");
    expect(employee.phone).equal("+79123456780");
    expect(employee.password).equal(null);
    expect(employee.tfa).equal(false);
    expect(employee.language).equal("en");
    expect(employee.banned).equal(false);
    expect(employee.registration).to.be.a("Date");
    expect(employee.admin).equal(false);
    expect(employee.moderator).equal(false);
  });
});
