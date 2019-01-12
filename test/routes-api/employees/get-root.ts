import "../../common";

import {PgBigSerialUnitCodes, PgLimitUnitCodes, PgOffsetUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Sequelize,
  Web,
} from "../../../src";

describe("GET /employees", () => {
  let token: string;
  beforeEach(async () => {
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
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        moderator: true,
      })
      .expect(204);
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "employee@example.com",
        language: "en",
        name: "employee",
        phone: "+79123456781",
      })
      .expect(201, {
        id: "3",
      });
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/3`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: true,
      })
      .expect(204);
  });

  it("Bad Request 400 - wrong id", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "0",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "query.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - wrong limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must contain only digits",
      });
  });

  it("Bad Request 400 - more limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "1000",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: `query.limit: limit must be less or equal than ${Const.LIMIT_LIMIT}`,
      });
  });

  it("Bad Request 400 - less limit", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: "-100",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must be more or equal than 0",
      });
  });

  it("Bad Request 400 - wrong offset", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: "",
      })
      .expect(400, {
        code: PgOffsetUnitCodes.WRONG_PG_OFFSET,
        message: "query.offset: offset must contain only digits",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_ADMIN,
        message: "required admin",
      });
  });

  it("find all", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(3);
    for (let i = 0; i < 3; ++i) {
      expect(res.body.employees[i]).have.keys(
        "admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration");
      expect(new Date(res.body.employees[i].registration)).be.a("Date");
    }

    expect(res.body.employees[0].admin).equal(true);
    expect(res.body.employees[1].admin).equal(false);
    expect(res.body.employees[2].admin).equal(false);

    expect(res.body.employees[0].banned).equal(false);
    expect(res.body.employees[1].banned).equal(true);
    expect(res.body.employees[2].banned).equal(false);

    expect(res.body.employees[0].email).equal("admin@example.com");
    expect(res.body.employees[1].email).equal("employee@example.com");
    expect(res.body.employees[2].email).equal("moderator@example.com");

    expect(res.body.employees[0].id).equal("1");
    expect(res.body.employees[1].id).equal("3");
    expect(res.body.employees[2].id).equal("2");

    expect(res.body.employees[0].language).equal("ru");
    expect(res.body.employees[1].language).equal("en");
    expect(res.body.employees[2].language).equal("ru");

    expect(res.body.employees[0].moderator).equal(false);
    expect(res.body.employees[1].moderator).equal(false);
    expect(res.body.employees[2].moderator).equal(true);

    expect(res.body.employees[0].name).equal("admin");
    expect(res.body.employees[1].name).equal("employee");
    expect(res.body.employees[2].name).equal("moderator");

    expect(res.body.employees[0].phone).equal("+79123456789");
    expect(res.body.employees[1].phone).equal("+79123456781");
    expect(res.body.employees[2].phone).equal("+79123456780");
  });

  it("find all - limit 2 offset 0", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: 2,
        offset: 0,
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(2);
    for (let i = 0; i < 2; ++i) {
      expect(res.body.employees[i]).have.keys(
        "admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration");
      expect(new Date(res.body.employees[i].registration)).be.a("Date");
    }

    expect(res.body.employees[0].admin).equal(true);
    expect(res.body.employees[1].admin).equal(false);

    expect(res.body.employees[0].banned).equal(false);
    expect(res.body.employees[1].banned).equal(true);

    expect(res.body.employees[0].email).equal("admin@example.com");
    expect(res.body.employees[1].email).equal("employee@example.com");

    expect(res.body.employees[0].id).equal("1");
    expect(res.body.employees[1].id).equal("3");

    expect(res.body.employees[0].language).equal("ru");
    expect(res.body.employees[1].language).equal("en");

    expect(res.body.employees[0].moderator).equal(false);
    expect(res.body.employees[1].moderator).equal(false);

    expect(res.body.employees[0].name).equal("admin");
    expect(res.body.employees[1].name).equal("employee");

    expect(res.body.employees[0].phone).equal("+79123456789");
    expect(res.body.employees[1].phone).equal("+79123456781");
  });

  it("find all - limit 2 offset 1", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: 2,
        offset: 1,
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(2);
    for (let i = 0; i < 2; ++i) {
      expect(res.body.employees[i]).have.keys(
        "admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration");
      expect(new Date(res.body.employees[i].registration)).be.a("Date");
    }

    expect(res.body.employees[0].admin).equal(false);
    expect(res.body.employees[1].admin).equal(false);

    expect(res.body.employees[0].banned).equal(true);
    expect(res.body.employees[1].banned).equal(false);

    expect(res.body.employees[0].email).equal("employee@example.com");
    expect(res.body.employees[1].email).equal("moderator@example.com");

    expect(res.body.employees[0].id).equal("3");
    expect(res.body.employees[1].id).equal("2");

    expect(res.body.employees[0].language).equal("en");
    expect(res.body.employees[1].language).equal("ru");

    expect(res.body.employees[0].moderator).equal(false);
    expect(res.body.employees[1].moderator).equal(true);

    expect(res.body.employees[0].name).equal("employee");
    expect(res.body.employees[1].name).equal("moderator");

    expect(res.body.employees[0].phone).equal("+79123456781");
    expect(res.body.employees[1].phone).equal("+79123456780");
  });

  it("find all - offset 3", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: "3",
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(0);
  });

  it("find by id", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "1",
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(1);
    expect(res.body.employees[0]).have.keys(
      "admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration");
    expect(res.body.employees[0].admin).equal(true);
    expect(res.body.employees[0].banned).equal(false);
    expect(res.body.employees[0].email).equal("admin@example.com");
    expect(res.body.employees[0].id).equal("1");
    expect(res.body.employees[0].language).equal("ru");
    expect(res.body.employees[0].moderator).equal(false);
    expect(res.body.employees[0].name).equal("admin");
    expect(res.body.employees[0].phone).equal("+79123456789");
    expect(new Date(res.body.employees[0].registration)).be.a("Date");
  });

  it("find by id with limit and offset", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "1",
        limit: 1,
        offset: 999,
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(1);
    expect(res.body.employees[0]).have.keys(
      "admin", "banned", "email", "id", "language", "moderator", "name", "phone", "registration");
    expect(res.body.employees[0].admin).equal(true);
    expect(res.body.employees[0].banned).equal(false);
    expect(res.body.employees[0].email).equal("admin@example.com");
    expect(res.body.employees[0].id).equal("1");
    expect(res.body.employees[0].language).equal("ru");
    expect(res.body.employees[0].moderator).equal(false);
    expect(res.body.employees[0].name).equal("admin");
    expect(res.body.employees[0].phone).equal("+79123456789");
    expect(new Date(res.body.employees[0].registration)).be.a("Date");
  });

  it("find by id (empty array)", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "999",
      })
      .expect(200);

    expect(res.body).have.keys("employees");
    expect(res.body.employees).be.a("array");
    expect(res.body.employees).have.lengthOf(0);
  });
});
