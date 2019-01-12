import "../../common";
import waitForExpect from "../../wait-for-expect";

import {EnumUnitCodes, NotEmptyStringUnitCodes, ObjectUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as cuid from "cuid";
import * as otplib from "otplib";
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

describe("PUT /signin", () => {
  let authToken: string;
  let purgatoryToken: string;
  beforeEach(async () => {
    await Sequelize.instance.employee.create({
      email: "admin@example.com",
      language: "ru",
      name: "admin",
      password: await Bcrypt.hash("super duper password"),
      phone: "+79123456789",
      tfa: false,
    });

    authToken = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;

    await Sequelize.instance.user.update({
      tfa: true,
    }, {
      where: {
        id: "1",
      },
    });

    purgatoryToken = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;
  });

  it("user not found by purgatory token (token does not exists)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${cuid()}`)
      .send({
        token: cuid(),
        type: "recovery",
      })
      .expect(401, {
        code: ApiCodes.DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN,
        message: "user not found by purgatory token",
      });
  });

  it("user not found by purgatory token (expired token)", async () => {
    await Sequelize.instance.tokensTfaPurgatory.update({
      expires: new Date(),
    }, {
      where: {
        token: purgatoryToken,
      },
    });
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: cuid(),
        type: "recovery",
      })
      .expect(401, {
        code: ApiCodes.DB_USER_NOT_FOUND_BY_PURGATORY_TOKEN,
        message: "user not found by purgatory token",
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
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: cuid(),
        type: "recovery",
      })
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("null token", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: null,
        type: "recovery",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.token: value can't be null",
      });
  });

  it("null type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: cuid(),
        type: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.type: value can't be null",
      });
  });

  it("missing token", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        type: "recovery",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.token: missing value",
      });
  });

  it("missing type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: cuid(),
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.type: missing value",
      });
  });

  it("wrong token", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: 1234567890,
        type: "recovery",
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: `body.token: value must be not empty string`,
      });
  });

  it("wrong type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
      .set("Authorization", `Bearer ${purgatoryToken}`)
      .send({
        token: cuid(),
        type: "type",
      })
      .expect(400, {
        code: EnumUnitCodes.WRONG_ENUM,
        message: `body.type: value must be one of these values ['otp', 'recovery']`,
      });
  });

  describe("otp", () => {
    describe("authenticator", () => {
      let secret: string;
      beforeEach(async () => {
        secret = (await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            type: "authenticator",
          })
          .expect(200)).body.secret;
      });

      it("wrong authenticator token", async () => {
        await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
          .set("Authorization", `Bearer ${purgatoryToken}`)
          .send({
            token: otplib.authenticator.generate(otplib.authenticator.generateSecret()),
            type: "otp",
          })
          .expect(401, {
            code: ApiCodes.OTP_WRONG_TOKEN,
            message: "wrong otp token",
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

        const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
          .set("Authorization", `Bearer ${purgatoryToken}`)
          .send({
            token: otplib.authenticator.generate(secret),
            type: "otp",
          })
          .expect(200);
        expect(res.body).to.have.keys("token", "tfa");
        expect(res.body.token).be.a("string");
        expect(res.body.tfa).be.a("boolean");
        expect(res.body.tfa).equal(true);
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

        const purgatoryTokenCount = await Sequelize.instance.tokensTfaPurgatory.count({
          where: {
            token: purgatoryToken,
          },
        });
        expect(purgatoryTokenCount).equal(0);
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

        const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
          .set("Authorization", `Bearer ${purgatoryToken}`)
          .send({
            token: otplib.authenticator.generate(secret),
            type: "otp",
          })
          .expect(200);
        expect(res.body).to.have.keys("token", "tfa");
        expect(res.body.token).be.a("string");
        expect(res.body.tfa).be.a("boolean");
        expect(res.body.tfa).equal(true);
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

        const purgatoryTokenCount = await Sequelize.instance.tokensTfaPurgatory.count({
          where: {
            token: purgatoryToken,
          },
        });
        expect(purgatoryTokenCount).equal(0);
      });
    });
  });

  describe("recovery", () => {
    let recoveryTokens: string[];
    let recoveryCode: string;

    beforeEach(async () => {
      recoveryTokens = (await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/recovery`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)).body.tokens;
      recoveryCode = recoveryTokens[0];
      recoveryTokens = recoveryTokens.slice(1);
    });

    it("token not found", async () => {
      await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
        .set("Authorization", `Bearer ${purgatoryToken}`)
        .send({
          token: cuid(),
          type: "recovery",
        })
        .expect(401, {
          code: ApiCodes.DB_TOKENS_TFA_RECOVERY_NOT_FOUND,
          message: "recovery code for this user not found",
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

      const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
        .set("Authorization", `Bearer ${purgatoryToken}`)
        .send({
          token: recoveryCode,
          type: "recovery",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(res.body.tfa).equal(true);
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

      const purgatoryTokenCount = await Sequelize.instance.tokensTfaPurgatory.count({
        where: {
          token: purgatoryToken,
        },
      });
      expect(purgatoryTokenCount).equal(0);

      const lefTokens = await Sequelize.instance.tokensTfaRecovery.findAll({
        where: {
          userid: "1",
        },
      });
      expect(lefTokens).have.lengthOf(Const.TFA_RECOVERY_CODES_COUNT - 1);
      expect(recoveryTokens).to.be.deep.equal(lefTokens.map((item) => item.token));
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

      const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/signin`)
        .set("Authorization", `Bearer ${purgatoryToken}`)
        .send({
          token: recoveryCode,
          type: "recovery",
        })
        .expect(200);
      expect(res.body).to.have.keys("token", "tfa");
      expect(res.body.token).be.a("string");
      expect(res.body.tfa).be.a("boolean");
      expect(res.body.tfa).equal(true);
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

      const purgatoryTokenCount = await Sequelize.instance.tokensTfaPurgatory.count({
        where: {
          token: purgatoryToken,
        },
      });
      expect(purgatoryTokenCount).equal(0);

      const lefTokens = await Sequelize.instance.tokensTfaRecovery.findAll({
        where: {
          userid: "1",
        },
      });
      expect(lefTokens).have.lengthOf(Const.TFA_RECOVERY_CODES_COUNT - 1);
      expect(recoveryTokens).to.be.deep.equal(lefTokens.map((item) => item.token));
    });
  });
});
