import "../../common";
import waitForExpect from "../../wait-for-expect";

import {EmailUnitCodes, ObjectUnitCodes, ZxcvbnUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  EmailNotifications,
  Env,
  Jwt,
  Sequelize,
  Web,
} from "../../../src";

describe("POST /signin", () => {
  beforeEach(async () => {
    await Sequelize.instance.employee.create({
      email: "admin@example.com",
      language: "ru",
      name: "admin",
      password: await Bcrypt.hash("super duper password"),
      phone: "+79123456789",
      tfa: false,
    });
  });

  describe("with tfa", () => {
    beforeEach(async () => {
      await Sequelize.instance.employee.update({
        tfa: true,
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("user not found - unknown email", async () => {
      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.xxx",
          password: "super duper password",
        })
        .expect(401, {
          code: ApiCodes.DB_USER_NOT_FOUND,
          message: "user with same email and password not found",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("user not found - unknown password", async () => {
      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "buper duper password",
        })
        .expect(401, {
          code: ApiCodes.DB_USER_NOT_FOUND,
          message: "user with same email and password not found",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("user was banned", async () => {
      await Sequelize.instance.employee.update({
        banned: true,
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(401, {
          code: ApiCodes.BANNED,
          message: "user was banned",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("400 Bad Request - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example",
          password: "super duper password",
        })
        .expect(400, {
          code: EmailUnitCodes.WRONG_EMAIL,
          message: `body.email: email must be in format "user@example.com"`,
        });
    });

    it("400 Bad Request - empty password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "",
        })
        .expect(400, {
          code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
          message: "body.password: string length must be in range [1, 72]",
        });
    });

    it("400 Bad Request - long password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: new Array(73).fill("a").join(""),
        })
        .expect(400, {
          code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
          message: "body.password: string length must be in range [1, 72]",
        });
    });

    it("400 OBJECT_MISSING_KEY - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({})
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_MISSING_KEY,
          message: "body.email: missing value",
        });
    });

    it("400 OBJECT_MISSING_KEY - password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_MISSING_KEY,
          message: "body.password: missing value",
        });
    });

    it("400 OBJECT_NULL_VALUE - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: null,
          password: "super duper password",
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_NULL_VALUE,
          message: "body.email: value can't be null",
        });
    });

    it("400 OBJECT_NULL_VALUE - password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: null,
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_NULL_VALUE,
          message: "body.password: value can't be null",
        });
    });

    it("correct - ru email", async () => {
      await Sequelize.instance.employee.update({
        language: "ru",
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa", "expires");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(new Date(res.body.expires)).be.a("Date");
      expect(res.body.tfa).equal(true);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spyMail);
        expect(spyMail.args[0][0].originalMessage.subject).equal("Попытка входа в систему!");
        expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
        expect(spyMail.args[0][0].originalMessage.to).equal("admin@example.com");
        expect(spyMail.args[0][0].originalMessage.html).contains("admin");
        expect(spyMail.args[0][0].originalMessage.text).contains("admin");
      });

      const tokensCount = await Sequelize.instance.tokensTfaPurgatory.count({
        where: {
          token: res.body.token,
        },
      });
      expect(tokensCount).equal(1);
    });

    it("correct - en email", async () => {
      await Sequelize.instance.employee.update({
        language: "en",
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa", "expires");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(new Date(res.body.expires)).be.a("Date");
      expect(res.body.tfa).equal(true);

      await waitForExpect(async () => {
        sinon.assert.calledOnce(spyMail);
        expect(spyMail.args[0][0].originalMessage.subject).equal("Attempting to login!");
        expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
        expect(spyMail.args[0][0].originalMessage.to).equal("admin@example.com");
        expect(spyMail.args[0][0].originalMessage.html).contains("admin");
        expect(spyMail.args[0][0].originalMessage.text).contains("admin");
      });

      const tokensCount = await Sequelize.instance.tokensTfaPurgatory.count({
        where: {
          token: res.body.token,
        },
      });
      expect(tokensCount).equal(1);
    });
  });

  describe("without tfa", () => {
    beforeEach(async () => {
      await Sequelize.instance.employee.update({
        tfa: false,
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("user not found - unknown email", async () => {
      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.xxx",
          password: "super duper password",
        })
        .expect(401, {
          code: ApiCodes.DB_USER_NOT_FOUND,
          message: "user with same email and password not found",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("user not found - unknown password", async () => {
      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "buper duper password",
        })
        .expect(401, {
          code: ApiCodes.DB_USER_NOT_FOUND,
          message: "user with same email and password not found",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("user was banned", async () => {
      await Sequelize.instance.employee.update({
        banned: true,
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(401, {
          code: ApiCodes.BANNED,
          message: "user was banned",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spyMail);
      });
    });

    it("400 Bad Request - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example",
          password: "super duper password",
        })
        .expect(400, {
          code: EmailUnitCodes.WRONG_EMAIL,
          message: `body.email: email must be in format "user@example.com"`,
        });
    });

    it("400 Bad Request - empty password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "",
        })
        .expect(400, {
          code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
          message: "body.password: string length must be in range [1, 72]",
        });
    });

    it("400 Bad Request - long password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: new Array(73).fill("a").join(""),
        })
        .expect(400, {
          code: ZxcvbnUnitCodes.WRONG_ZXCVBN,
          message: "body.password: string length must be in range [1, 72]",
        });
    });

    it("400 OBJECT_MISSING_KEY - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({})
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_MISSING_KEY,
          message: "body.email: missing value",
        });
    });

    it("400 OBJECT_MISSING_KEY - password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_MISSING_KEY,
          message: "body.password: missing value",
        });
    });

    it("400 OBJECT_NULL_VALUE - email", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: null,
          password: "super duper password",
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_NULL_VALUE,
          message: "body.email: value can't be null",
        });
    });

    it("400 OBJECT_NULL_VALUE - password", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: null,
        })
        .expect(400, {
          code: ObjectUnitCodes.OBJECT_NULL_VALUE,
          message: "body.password: value can't be null",
        });
    });

    it("correct - ru email", async () => {
      await Sequelize.instance.employee.update({
        language: "ru",
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(res.body.tfa).equal(false);
      const parsedToken = await Jwt.verifyUser(res.body.token);
      expect(parsedToken).to.have.keys("id", "type");
      expect(parsedToken.id).be.a("string");
      expect(parsedToken.type).be.a("string");
      expect(parsedToken.id).equal("1");
      expect(parsedToken.type).equal("employee");

      await waitForExpect(() => {
        sinon.assert.calledOnce(spyMail);
        expect(spyMail.args[0][0].originalMessage.subject).equal("Был выполнен вход в систему!");
        expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
        expect(spyMail.args[0][0].originalMessage.to).equal("admin@example.com");
        expect(spyMail.args[0][0].originalMessage.html).contains("admin");
        expect(spyMail.args[0][0].originalMessage.text).contains("admin");
      });
    });

    it("correct - en email", async () => {
      await Sequelize.instance.employee.update({
        language: "en",
      }, {
        where: {
          id: "1",
        },
      });

      const spyMail = sinon.stub();
      EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

      const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
        .send({
          email: "admin@example.com",
          password: "super duper password",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(res.body.tfa).equal(false);
      const parsedToken = await Jwt.verifyUser(res.body.token);
      expect(parsedToken).to.have.keys("id", "type");
      expect(parsedToken.id).be.a("string");
      expect(parsedToken.type).be.a("string");
      expect(parsedToken.id).equal("1");
      expect(parsedToken.type).equal("employee");

      await waitForExpect(() => {
        sinon.assert.calledOnce(spyMail);
        expect(spyMail.args[0][0].originalMessage.subject).equal("You're logged in!");
        expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
        expect(spyMail.args[0][0].originalMessage.to).equal("admin@example.com");
        expect(spyMail.args[0][0].originalMessage.html).contains("admin");
        expect(spyMail.args[0][0].originalMessage.text).contains("admin");
      });
    });
  });
});
