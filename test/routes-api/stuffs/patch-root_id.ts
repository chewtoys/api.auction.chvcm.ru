import "../../common";

import {BooleanUnitCodes, ObjectUnitCodes, PgBigSerialUnitCodes, PgEnumUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const, IStuffInstance,
  Sequelize,
  Web,
} from "../../../src";

describe("PATCH /stuffs/:id", () => {
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
      .expect(201);
  });

  it("null amount_type", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.amount_type: value can't be null",
      });
  });

  it("null enabled", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        enabled: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.enabled: value can't be null",
      });
  });

  it("wrong id - not found", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/999`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404, {
        code: ApiCodes.DB_STUFF_NOT_FOUND_BY_ID,
        message: "stuff with same id not found",
      });
  });

  it("wrong id", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/0`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("wrong amount_type", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kr",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        message: "body.amount_type: value must be one of these values ['kg', 'piece']",
      });
  });

  it("wrong enabled", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        enabled: "true",
      })
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.enabled: value must be boolean",
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
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_MODERATOR,
        message: "required moderator",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("correct - change amount_type", async () => {
    await Sequelize.instance.stuff.update({
      amount_type: "kg",
      enabled: true,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "piece",
      })
      .expect(204);

    const stuff = await Sequelize.instance.stuff.findByPk("1") as IStuffInstance;
    expect(stuff.amount_type).equal("piece");
    expect(stuff.enabled).equal(true);
  });

  it("correct - change enabled", async () => {
    await Sequelize.instance.stuff.update({
      amount_type: "kg",
      enabled: true,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        enabled: false,
      })
      .expect(204);

    const stuff = await Sequelize.instance.stuff.findByPk("1") as IStuffInstance;
    expect(stuff.amount_type).equal("kg");
    expect(stuff.enabled).equal(false);
  });

  it("correct - change amount_type and enabled", async () => {
    await Sequelize.instance.stuff.update({
      amount_type: "kg",
      enabled: true,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/stuffs/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "piece",
        enabled: false,
      })
      .expect(204);

    const stuff = await Sequelize.instance.stuff.findByPk("1") as IStuffInstance;
    expect(stuff.amount_type).equal("piece");
    expect(stuff.enabled).equal(false);
  });
});
