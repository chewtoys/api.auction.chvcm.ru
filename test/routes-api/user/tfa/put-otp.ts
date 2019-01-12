import "../../../common";

import {ObjectUnitCodes, PgEnumUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  ITokensTfaOtpInstance,
  Sequelize,
  Web,
} from "../../../../src";

describe("PUT /user/tfa/otp", () => {
  let token: string;
  beforeEach(async () => {
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

  it("Bad Request 400 - OBJECT_NULL_VALUE (type)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .send({
        type: null,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.type: value can't be null",
      });
  });

  it("Bad Request 400 - wrong type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "auth",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        message: "body.type: value must be one of these values ['authenticator']",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("correct - default type", async () => {
    const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).to.have.keys("secret", "keyuri");
    expect(res.body.secret).to.be.a("string");
    expect(res.body.keyuri).to.be.a("string");
    const service = encodeURIComponent(Const.AUTHENTICATOR_SERVICE);
    const name = encodeURIComponent(`Админ "Великий"`);
    expect(res.body.keyuri).equal(`otpauth://totp/${service}:${name}?secret=${res.body.secret}&issuer=${service}`);

    const tokenOtp = await Sequelize.instance.tokensTfaOtp.findByPk("1");
    expect((tokenOtp as ITokensTfaOtpInstance).token).equal(res.body.secret);
    expect((tokenOtp as ITokensTfaOtpInstance).type).equal("authenticator");
  });

  it("correct - authenticator", async () => {
    const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/user/tfa/otp`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "authenticator",
      })
      .expect(200);
    expect(res.body).to.have.keys("secret", "keyuri");
    expect(res.body.secret).to.be.a("string");
    expect(res.body.keyuri).to.be.a("string");
    const service = encodeURIComponent(Const.AUTHENTICATOR_SERVICE);
    const name = encodeURIComponent(`Админ "Великий"`);
    expect(res.body.keyuri).equal(`otpauth://totp/${service}:${name}?secret=${res.body.secret}&issuer=${service}`);

    const tokenOtp = await Sequelize.instance.tokensTfaOtp.findByPk("1");
    expect((tokenOtp as ITokensTfaOtpInstance).token).equal(res.body.secret);
    expect((tokenOtp as ITokensTfaOtpInstance).type).equal("authenticator");
  });
});
