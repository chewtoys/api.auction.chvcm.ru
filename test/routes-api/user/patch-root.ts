import {allowReCaptcha} from "../../common";
import waitForExpect from "../../wait-for-expect";

import {
  BooleanUnitCodes,
  EmailUnitCodes,
  NotEmptyStringUnitCodes,
  ObjectUnitCodes,
  PgEnumUnitCodes,
  PhoneUnitCodes,
  ZxcvbnUnitCodes,
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
  IUserInstance,
  Jwt,
  Sequelize,
  Web,
} from "../../../src";

describe("PATCH /user", () => {
  let tokenEmployee: string;
  let tokenEntity: string;

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
    tokenEmployee = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;

    tokenEntity = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
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
      .expect(201)).body.token;

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
    });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (email)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        email: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.email: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (language)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        language: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.language: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (name)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        name: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.name: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (password)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        password: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.password: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (phone)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        phone: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.phone: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (tfa)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .send({
        tfa: null,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.tfa: value can't be null",
      });
  });

  it("Bad Request 400 - wrong email", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity@example",
      })
      .expect(400, {
        code: EmailUnitCodes.WRONG_EMAIL,
        message: `body.email: email must be in format "user@example.com"`,
      });
  });

  it("Bad Request 400 - wrong language", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        language: "russian",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable max-line-length
        message: "body.language: value must be one of these values ['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']",
      });
  });

  it("Bad Request 400 - wrong name", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: true,
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.name: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong password", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        password: "password",
      })
      .expect(400, {
        code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
        message: `body.password: password minimum score must be >= ${Const.MINIMUM_PASSWORD_SCORE}`,
      });
  });

  it("Bad Request 400 - wrong phone", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        phone: "++9923456789",
      })
      .expect(400, {
        code: PhoneUnitCodes.WRONG_PHONE,
        message: `body.phone: invalid phone format for locale ${Const.PHONE_LOCALE}`,
      });
  });

  it("Bad Request 400 - wrong tfa", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        tfa: "true",
      })
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.tfa: value must be boolean",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("401 Unauthorized - DB_EMPLOYEE_NOT_FOUND_BY_ID", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${await Jwt.signUser({
        id: "3",
        type: Const.USER_TYPE_EMPLOYEE,
      })}`)
      .expect(401, {
        code: ApiCodes.DB_EMPLOYEE_NOT_FOUND_BY_ID,
        message: "employee with same id not found",
      });
  });

  it("401 Unauthorized - DB_ENTITY_NOT_FOUND_BY_ID", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${await Jwt.signUser({
        id: "3",
        type: Const.USER_TYPE_ENTITY,
      })}`)
      .expect(401, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("401 Unauthorized - BANNED - employee", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("401 Unauthorized - BANNED - entity", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("change name - employee", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        name: "Mr. Admin",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const user = await Sequelize.instance.user.findByPk("1");
    expect((user as IUserInstance).name).equal("Mr. Admin");
  });

  it("change name - entity", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "Mr. Admin",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).name).equal("Luminoso");
  });

  it("change email - DB_USER_FOUND_BY_EMAIL", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity@example.com",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL,
        message: "user with same email already exists",
      });
  });

  it("change email - ru email", async () => {
    await Sequelize.instance.user.update({
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity-new-email@example.com",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Рыба Текст");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity-new-email@example.com");
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).email).equal("entity-new-email@example.com");
  });

  it("change email - en email", async () => {
    await Sequelize.instance.user.update({
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity-new-email@example.com",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Lorem Ipsum");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity-new-email@example.com");
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).email).equal("entity-new-email@example.com");
  });

  it("change email and language - ru email", async () => {
    await Sequelize.instance.user.update({
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity-new-email@example.com",
        language: "ru",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Рыба Текст");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity-new-email@example.com");
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).email).equal("entity-new-email@example.com");
    expect((user as IUserInstance).language).equal("ru");
  });

  it("change email and language - en email", async () => {
    await Sequelize.instance.user.update({
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity-new-email@example.com",
        language: "en",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Lorem Ipsum");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity-new-email@example.com");
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).email).equal("entity-new-email@example.com");
    expect((user as IUserInstance).language).equal("en");
  });

  it("change password - ru email", async () => {
    await Sequelize.instance.user.update({
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        password: "super duper password duper puper",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Пароль был сброшен!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "entity@example.com",
        password: "super duper password duper puper",
      })
      .expect(200);
  });

  it("change password - en email", async () => {
    await Sequelize.instance.user.update({
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        password: "super duper password duper puper",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Password has been reset!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "entity@example.com",
        password: "super duper password duper puper",
      })
      .expect(200);
  });

  it("change password, email, language and name - ru email", async () => {
    await Sequelize.instance.user.update({
      language: "en",
    }, {
      where: {
        id: "1",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        email: "admin-new-email@example.com",
        language: "ru",
        name: "Mr. Admin",
        password: "super duper password duper puper",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Рыба Текст");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("admin-new-email@example.com");

      expect(spyMail.args[1][0].originalMessage.subject).equal("Пароль был сброшен!");
      expect(spyMail.args[1][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[1][0].originalMessage.to).equal("admin-new-email@example.com");
      expect(spyMail.args[1][0].originalMessage.html).contains("Mr. Admin");
      expect(spyMail.args[1][0].originalMessage.text).contains("Mr. Admin");
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin-new-email@example.com",
        password: "super duper password duper puper",
      })
      .expect(200);

    const user = await Sequelize.instance.user.findByPk("1");
    expect((user as IUserInstance).email).equal("admin-new-email@example.com");
    expect((user as IUserInstance).language).equal("ru");
    expect((user as IUserInstance).name).equal("Mr. Admin");
  });

  it("change password, email, language and name - en email", async () => {
    await Sequelize.instance.user.update({
      language: "ru",
    }, {
      where: {
        id: "1",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        email: "admin-new-email@example.com",
        language: "en",
        name: "Mr. Admin",
        password: "super duper password duper puper",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Lorem Ipsum");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("admin-new-email@example.com");

      expect(spyMail.args[1][0].originalMessage.subject).equal("Password has been reset!");
      expect(spyMail.args[1][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[1][0].originalMessage.to).equal("admin-new-email@example.com");
      expect(spyMail.args[1][0].originalMessage.html).contains("Mr. Admin");
      expect(spyMail.args[1][0].originalMessage.text).contains("Mr. Admin");
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin-new-email@example.com",
        password: "super duper password duper puper",
      })
      .expect(200);

    const user = await Sequelize.instance.user.findByPk("1");
    expect((user as IUserInstance).email).equal("admin-new-email@example.com");
    expect((user as IUserInstance).language).equal("en");
    expect((user as IUserInstance).name).equal("Mr. Admin");
  });

  it("change phone - DB_USER_FOUND_BY_EMAIL", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        phone: "+79123456780",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_PHONE,
        message: "user with same phone already exists",
      });
  });

  it("change phone", async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        phone: "+79923456780",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const user = await Sequelize.instance.user.findByPk("2");
    expect((user as IUserInstance).phone).equal("+79923456780");
  });

  it("change email and phone - DB_USER_FOUND_BY_EMAIL", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        email: "entity@example.com",
        phone: "+79123456780",
      })
      .expect(409, {
        code: ApiCodes.DB_USER_FOUND_BY_EMAIL_AND_PHONE,
        message: "user with same email and phone already exists",
      });
  });

  describe("change tfa", () => {
    beforeEach(async () => {
      await Sequelize.instance.tokensTfaOtp.create({
        token: "token",
        type: "authenticator",
        userid: "2",
      });
      await Sequelize.instance.tokensTfaRecovery.bulkCreate([
        {
          token: "token 1",
          userid: "2",
        }, {
          token: "token 2",
          userid: "2",
        },
      ]);
    });

    it("enable disabled", async () => {
      await Sequelize.instance.user.update({
        tfa: false,
      }, {
        where: {
          id: "2",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
        .set("Authorization", `Bearer ${tokenEntity}`)
        .send({
          tfa: true,
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });

      const user = await Sequelize.instance.user.findByPk("2");
      expect((user as IUserInstance).tfa).equal(true);

      expect(await Sequelize.instance.tokensTfaOtp.count({where: {userid: "2"}})).equal(1);
      expect(await Sequelize.instance.tokensTfaRecovery.count({where: {userid: "2"}})).equal(2);
    });

    it("enable enabled", async () => {
      await Sequelize.instance.user.update({
        tfa: true,
      }, {
        where: {
          id: "2",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
        .set("Authorization", `Bearer ${tokenEntity}`)
        .send({
          tfa: true,
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });

      const user = await Sequelize.instance.user.findByPk("2");
      expect((user as IUserInstance).tfa).equal(true);

      expect(await Sequelize.instance.tokensTfaOtp.count({where: {userid: "2"}})).equal(1);
      expect(await Sequelize.instance.tokensTfaRecovery.count({where: {userid: "2"}})).equal(2);
    });

    it("disable enabled", async () => {
      await Sequelize.instance.user.update({
        tfa: true,
      }, {
        where: {
          id: "2",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
        .set("Authorization", `Bearer ${tokenEntity}`)
        .send({
          tfa: false,
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });

      const user = await Sequelize.instance.user.findByPk("2");
      expect((user as IUserInstance).tfa).equal(false);

      expect(await Sequelize.instance.tokensTfaOtp.count({where: {userid: "2"}})).equal(0);
      expect(await Sequelize.instance.tokensTfaRecovery.count({where: {userid: "2"}})).equal(0);
    });

    it("disable disabled", async () => {
      await Sequelize.instance.user.update({
        tfa: false,
      }, {
        where: {
          id: "2",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/user`)
        .set("Authorization", `Bearer ${tokenEntity}`)
        .send({
          tfa: false,
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });

      const user = await Sequelize.instance.user.findByPk("2");
      expect((user as IUserInstance).tfa).equal(false);

      expect(await Sequelize.instance.tokensTfaOtp.count({where: {userid: "2"}})).equal(0);
      expect(await Sequelize.instance.tokensTfaRecovery.count({where: {userid: "2"}})).equal(0);
    });
  });
});
