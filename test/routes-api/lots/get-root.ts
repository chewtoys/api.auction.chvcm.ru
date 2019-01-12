import "../../common";

import {
  PgBigSerialUnitCodes,
  PgLimitUnitCodes,
  PgOffsetUnitCodes,
} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as moment from "moment";
import {Socket} from "socket.io-client";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Sequelize,
  Web,
} from "../../../src";

describe("GET /lots", () => {
  let tokenEmployee: string;
  let tokenEntity: string;
  let start1: Date;
  let start2: Date;
  let start3: Date;
  let finish1: Date;
  let finish2: Date;
  let finish3: Date;

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
    tokenEmployee = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "admin@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;

    tokenEntity = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
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
      .expect(201)).body.token;

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "1",
      });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "2",
      });

    start1 = moment().add({minute: 10}).toDate();
    start2 = moment().add({minute: 11}).toDate();
    start3 = moment().add({minute: 12}).toDate();
    finish1 = moment(start1).add({minute: 10}).toDate();
    finish2 = moment(start2).add({minute: 11}).toDate();
    finish3 = moment(start3).add({minute: 12}).toDate();

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 5,
        },
        currency: "rub",
        finish: finish1,
        start: start1,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(201, {
        id: "1",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount: 100,
        buffer: {
          seconds: 59,
        },
        currency: "usd",
        finish: finish2,
        start: start2,
        startbid: 10_000,
        step: 1000,
        strict: true,
        stuffid: "1",
        type: "purchase",
      })
      .expect(201, {
        id: "2",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount: 2.25,
        buffer: {
          years: 3,
        },
        currency: "rub",
        finish: finish3,
        start: start3,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "2",
        type: "sale",
      })
      .expect(201, {
        id: "3",
      });

    start2 = moment().subtract({second: 1}).toDate();
    await Sequelize.instance.lot.update({
      start: start2,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        winbid: "0",
      })
      .expect(204);
  });

  it("Bad Request 400 - wrong value", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .query({
        id: "0",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "query.id: bigserial must be more or equal than 1",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .query({
        stuffid: "0",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "query.stuffid: bigserial must be more or equal than 1",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .query({
        limit: "1000",
      })
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: `query.limit: limit must be less or equal than ${Const.LIMIT_LIMIT}`,
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .query({
        offset: "all",
      })
      .expect(400, {
        code: PgOffsetUnitCodes.WRONG_PG_OFFSET,
        message: "query.offset: offset must contain only digits",
      });
  });

  it("wrong auth", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });

    await Sequelize.instance.entity.update({
      banned: true,
    }, {
      where: {
        id: "2",
      },
    });
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("find all", async () => {
    const lot1 = {
      amount: "2.25",
      buffer: {
        minutes: 5,
      },
      currency: "rub",
      finish: finish1.toISOString(),
      id: "1",
      participants: "0",
      start: start1.toISOString(),
      startbid: "1000",
      step: "100",
      strict: false,
      stuffid: "1",
      type: "sale",
    };

    const lot2 = {
      amount: "100",
      buffer: {
        seconds: 59,
      },
      currency: "usd",
      finish: finish2.toISOString(),
      id: "2",
      participants: "1",
      start: start2.toISOString(),
      startbid: "10000",
      step: "1000",
      strict: true,
      stuffid: "1",
      type: "purchase",
      winbid: "10000",
      winner: "2",
    };

    const lot3 = {
      amount: "2.25",
      buffer: {
        years: 3,
      },
      currency: "rub",
      finish: finish3.toISOString(),
      id: "3",
      participants: "0",
      start: start3.toISOString(),
      startbid: "1000",
      step: "100",
      strict: false,
      stuffid: "2",
      type: "sale",
    };

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(200, {
        lots: [lot3, lot1, lot2],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        id: "1",
      })
      .expect(200, {
        lots: [lot1],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        id: "2",
      })
      .expect(200, {
        lots: [lot2],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        id: "3",
      })
      .expect(200, {
        lots: [lot3],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        id: "4",
      })
      .expect(200, {
        lots: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        stuffid: "1",
      })
      .expect(200, {
        lots: [lot1, lot2],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        stuffid: "2",
      })
      .expect(200, {
        lots: [lot3],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        limit: "2",
        offset: "0",
      })
      .expect(200, {
        lots: [lot3, lot1],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        limit: "2",
        offset: "1",
      })
      .expect(200, {
        lots: [lot1, lot2],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .query({
        limit: "2",
        offset: "2",
      })
      .expect(200, {
        lots: [lot2],
      });
  });
});
