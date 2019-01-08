import {allowReCaptcha} from "../../../common";

import {NotEmptyStringUnitCodes, ObjectUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as otplib from "otplib";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Sequelize,
  Web,
} from "../../../../src";

describe("POST /user/tfa/otp", () => {
  let token: string;
  beforeEach(async () => {
    allowReCaptcha();

    await Sequelize.instance.employee.create({
      email: "admin@example.com",
      language: "ru",
      name: `Админ "Великий"`,
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
  });

  it("400 Bad Request", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .send({})
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.token: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .send({
        token: null,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.token: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .send({
        token: "",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.token: value must be not empty string",
      });
  });

  it("401 Unauthorized", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  describe("Google Authenticator", () => {
    let secret: string;
    beforeEach(async () => {
      secret = (await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "authenticator",
        })
        .expect(200)).body.secret;
    });

    it("correct - result false", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          token: otplib.authenticator.generate(otplib.authenticator.generateSecret()),
        })
        .expect(200, {
          result: false,
        });
    });

    it("correct - result true", async () => {
      await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          token: otplib.authenticator.generate(secret),
        })
        .expect(200, {
          result: true,
        });
    });
  });
});
