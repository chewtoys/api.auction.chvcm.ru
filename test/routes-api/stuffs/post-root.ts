import {allowReCaptcha} from "../../common";

import {ObjectUnitCodes, PgEnumUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Sequelize,
  Web,
} from "../../../src";

describe("POST /stuffs", () => {
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
  });

  it("Bad Request 400 - OBJECT_MISSING_KEY (amount_type)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.amount_type: missing value",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (amount_type)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.amount_type: value can't be null",
      });
  });

  it("Bad Request 400 - wrong amount_type", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kr",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        message: "body.amount_type: value must be one of these values ['kg', 'piece']",
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
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kg",
      })
      .expect(403, {
        code: ApiCodes.REQUIRED_MODERATOR,
        message: "required moderator",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .send({
        amount_type: "kg",
      })
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer token`)
      .send({
        amount_type: "kg",
      })
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("correct - kg", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "1",
      });
    const stuff = await Sequelize.instance.stuff.findAndCountAll({
      where: {},
    });
    expect(stuff.count).equal(1);
    expect(stuff.rows[0].id).equal("1");
    expect(stuff.rows[0].amount_type).equal("kg");
    expect(stuff.rows[0].enabled).equal(true);
  });

  it("correct - piece", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "piece",
      })
      .expect(201, {
        id: "1",
      });
    const stuff = await Sequelize.instance.stuff.findAndCountAll({
      where: {},
    });
    expect(stuff.count).equal(1);
    expect(stuff.rows[0].id).equal("1");
    expect(stuff.rows[0].amount_type).equal("piece");
    expect(stuff.rows[0].enabled).equal(true);
  });
});
