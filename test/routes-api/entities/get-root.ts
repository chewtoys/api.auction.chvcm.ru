import {allowReCaptcha} from "../../common";

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

describe("GET /entities", () => {
  let token: string;
  beforeEach(async () => {
    allowReCaptcha();

    await Sequelize.instance.employee.create({
      admin: true,
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

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Z Ceo",
        email: "z@example.com",
        itn: 76_27_01931_7,
        language: "ru",
        name: "zzz",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(200);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "A Ceo",
        email: "a@example.com",
        itn: 77_04_59572_7,
        language: "en",
        name: "aaa",
        password: "super duper password",
        phone: "+79123456781",
        psrn: 1_03_37_00_07067_8,
      })
      .expect(200);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "B Ceo",
        email: "b@example.com",
        itn: 37_29_02552_0,
        language: "ru",
        name: "bbb",
        password: "super duper password",
        phone: "+79123456782",
        psrn: 1_06_77_46_50413_2,
      })
      .expect(200);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/3`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        verified: true,
      })
      .expect(204);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/4`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: true,
      })
      .expect(204);
  });

  it("Bad Request 400 - wrong id", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
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

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required moderator", async () => {
    await Sequelize.instance.employee.update({
      moderator: false,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_MODERATOR,
        message: "required moderator",
      });
  });

  it("find all", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(3);
    for (let i = 0; i < 3; ++i) {
      expect(res.body.entities[i]).have.keys(
        "banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified");
      expect(new Date(res.body.entities[i].registration)).be.a("Date");
    }

    expect(res.body.entities[0].banned).equal(false);
    expect(res.body.entities[1].banned).equal(true);
    expect(res.body.entities[2].banned).equal(false);

    expect(res.body.entities[0].ceo).equal("A Ceo");
    expect(res.body.entities[1].ceo).equal("B Ceo");
    expect(res.body.entities[2].ceo).equal("Z Ceo");

    expect(res.body.entities[0].email).equal("a@example.com");
    expect(res.body.entities[1].email).equal("b@example.com");
    expect(res.body.entities[2].email).equal("z@example.com");

    expect(res.body.entities[0].id).equal("3");
    expect(res.body.entities[1].id).equal("4");
    expect(res.body.entities[2].id).equal("2");

    expect(res.body.entities[0].itn).equal(`${77_04_59572_7}`);
    expect(res.body.entities[1].itn).equal(`${37_29_02552_0}`);
    expect(res.body.entities[2].itn).equal(`${76_27_01931_7}`);

    expect(res.body.entities[0].language).equal("en");
    expect(res.body.entities[1].language).equal("ru");
    expect(res.body.entities[2].language).equal("ru");

    expect(res.body.entities[0].name).equal("aaa");
    expect(res.body.entities[1].name).equal("bbb");
    expect(res.body.entities[2].name).equal("zzz");

    expect(res.body.entities[0].phone).equal("+79123456781");
    expect(res.body.entities[1].phone).equal("+79123456782");
    expect(res.body.entities[2].phone).equal("+79123456780");

    expect(res.body.entities[0].psrn).equal(`${1_03_37_00_07067_8}`);
    expect(res.body.entities[1].psrn).equal(`${1_06_77_46_50413_2}`);
    expect(res.body.entities[2].psrn).equal(`${1_02_76_01_59327_1}`);

    expect(res.body.entities[0].verified).equal(true);
    expect(res.body.entities[1].verified).equal(false);
    expect(res.body.entities[2].verified).equal(false);
  });

  it("find all - limit 2 offset 0", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: 2,
        offset: 0,
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(2);
    for (let i = 0; i < 2; ++i) {
      expect(res.body.entities[i]).have.keys(
        "banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified");
      expect(new Date(res.body.entities[i].registration)).be.a("Date");
    }

    expect(res.body.entities[0].banned).equal(false);
    expect(res.body.entities[1].banned).equal(true);

    expect(res.body.entities[0].ceo).equal("A Ceo");
    expect(res.body.entities[1].ceo).equal("B Ceo");

    expect(res.body.entities[0].email).equal("a@example.com");
    expect(res.body.entities[1].email).equal("b@example.com");

    expect(res.body.entities[0].id).equal("3");
    expect(res.body.entities[1].id).equal("4");

    expect(res.body.entities[0].itn).equal(`${77_04_59572_7}`);
    expect(res.body.entities[1].itn).equal(`${37_29_02552_0}`);

    expect(res.body.entities[0].language).equal("en");
    expect(res.body.entities[1].language).equal("ru");

    expect(res.body.entities[0].name).equal("aaa");
    expect(res.body.entities[1].name).equal("bbb");

    expect(res.body.entities[0].phone).equal("+79123456781");
    expect(res.body.entities[1].phone).equal("+79123456782");

    expect(res.body.entities[0].psrn).equal(`${1_03_37_00_07067_8}`);
    expect(res.body.entities[1].psrn).equal(`${1_06_77_46_50413_2}`);

    expect(res.body.entities[0].verified).equal(true);
    expect(res.body.entities[1].verified).equal(false);
  });

  it("find all - limit 2 offset 1", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        limit: 2,
        offset: 1,
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(2);
    for (let i = 0; i < 2; ++i) {
      expect(res.body.entities[i]).have.keys(
        "banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified");
      expect(new Date(res.body.entities[i].registration)).be.a("Date");
    }

    expect(res.body.entities[0].banned).equal(true);
    expect(res.body.entities[1].banned).equal(false);

    expect(res.body.entities[0].ceo).equal("B Ceo");
    expect(res.body.entities[1].ceo).equal("Z Ceo");

    expect(res.body.entities[0].email).equal("b@example.com");
    expect(res.body.entities[1].email).equal("z@example.com");

    expect(res.body.entities[0].id).equal("4");
    expect(res.body.entities[1].id).equal("2");

    expect(res.body.entities[0].itn).equal(`${37_29_02552_0}`);
    expect(res.body.entities[1].itn).equal(`${76_27_01931_7}`);

    expect(res.body.entities[0].language).equal("ru");
    expect(res.body.entities[1].language).equal("ru");

    expect(res.body.entities[0].name).equal("bbb");
    expect(res.body.entities[1].name).equal("zzz");

    expect(res.body.entities[0].phone).equal("+79123456782");
    expect(res.body.entities[1].phone).equal("+79123456780");

    expect(res.body.entities[0].psrn).equal(`${1_06_77_46_50413_2}`);
    expect(res.body.entities[1].psrn).equal(`${1_02_76_01_59327_1}`);

    expect(res.body.entities[0].verified).equal(false);
    expect(res.body.entities[1].verified).equal(false);
  });

  it("find all - offset 3", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        offset: 3,
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(0);
  });

  it("find by id", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "3",
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(1);

    expect(res.body.entities[0]).have.keys(
      "banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified");
    expect(res.body.entities[0].banned).equal(false);
    expect(res.body.entities[0].ceo).equal("A Ceo");
    expect(res.body.entities[0].email).equal("a@example.com");
    expect(res.body.entities[0].id).equal("3");
    expect(res.body.entities[0].itn).equal(`${77_04_59572_7}`);
    expect(res.body.entities[0].language).equal("en");
    expect(res.body.entities[0].name).equal("aaa");
    expect(res.body.entities[0].phone).equal("+79123456781");
    expect(res.body.entities[0].psrn).equal(`${1_03_37_00_07067_8}`);
    expect(new Date(res.body.entities[0].registration)).be.a("Date");
    expect(res.body.entities[0].verified).equal(true);
  });

  it("find by id with limit and offset", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: "3",
        limit: "50",
        offset: "999",
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(1);

    expect(res.body.entities[0]).have.keys(
      "banned", "ceo", "email", "id", "itn", "language", "name", "phone", "psrn", "registration", "verified");
    expect(res.body.entities[0].banned).equal(false);
    expect(res.body.entities[0].ceo).equal("A Ceo");
    expect(res.body.entities[0].email).equal("a@example.com");
    expect(res.body.entities[0].id).equal("3");
    expect(res.body.entities[0].itn).equal(`${77_04_59572_7}`);
    expect(res.body.entities[0].language).equal("en");
    expect(res.body.entities[0].name).equal("aaa");
    expect(res.body.entities[0].phone).equal("+79123456781");
    expect(res.body.entities[0].psrn).equal(`${1_03_37_00_07067_8}`);
    expect(new Date(res.body.entities[0].registration)).be.a("Date");
    expect(res.body.entities[0].verified).equal(true);
  });

  it("find by id - empty array", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: 999,
      })
      .expect(200);

    expect(res.body).have.keys("entities");
    expect(res.body.entities).be.a("array");
    expect(res.body.entities).have.lengthOf(0);
  });
});
