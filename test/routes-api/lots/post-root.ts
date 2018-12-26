import {allowReCaptcha} from "../../common";
import waitForExpect from "../../wait-for-expect";

import {
  BooleanUnitCodes,
  ObjectUnitCodes,
  PgBigSerialUnitCodes,
  PgDateUnitCodes,
  PgEnumUnitCodes,
  PgIntervalUnitCodes,
  PgNumericUnitCodes,
} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as moment from "moment";
import {IPostgresInterval} from "postgres-interval";
import * as sinon from "sinon";
import * as io from "socket.io-client";
import {Socket} from "socket.io-client";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Env,
  ILotInstance,
  Sequelize,
  Web,
} from "../../../src";

describe("POST /lots", () => {
  let token: string;
  let socket: SocketIOClient.Socket;

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

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "1",
      });

    socket = io(`http://localhost:${Env.PORT}${Const.API_MOUNT_POINT}`, {
      query: {
        token,
      },
      transports: Const.SOCKET_TRANSPORTS,
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  it("Bad Request 400 - missing key", async () => {
    const start = moment().add({minute: 10}).toDate();
    const finish = moment(start).add({minute: 10}).toDate();

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.amount: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.buffer: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.currency: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.finish: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.start: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        start,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.startbid: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.step: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.strict: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.stuffid: missing value",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "1",
        buffer: {},
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_MISSING_KEY,
        message: "body.type: missing value",
      });
  });

  it("Bad Request 400 - null key", async () => {
    const start = moment().add({minute: 10}).toDate();
    const finish = moment(start).add({minute: 10}).toDate();

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: null,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.amount: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: null,
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.buffer: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: null,
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.currency: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish: null,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.finish: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start: null,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.start: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: null,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.startbid: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: null,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.step: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: null,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.strict: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: null,
        type: "sale",
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.stuffid: value can't be null",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.type: value can't be null",
      });
  });

  it("Bad Request 400 - wrong value", async () => {
    const start = moment().add({minute: 10}).toDate();
    const finish = moment(start).add({minute: 10}).toDate();

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25,5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgNumericUnitCodes.WRONG_PG_NUMERIC,
        message: "body.amount: value must be valid numeric",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: "01:02:03",
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgIntervalUnitCodes.WRONG_PG_INTERVAL,
        message: "body.buffer: value must be valid pg interval object",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          years: 179_000_000,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgIntervalUnitCodes.WRONG_PG_INTERVAL,
        message: "body.buffer: interval out of range",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "dollars",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        // tslint:disable-next-line
        message: "body.currency: value must be one of these values ['aed', 'afn', 'all', 'amd', 'ang', 'aoa', 'ars', 'aud', 'awg', 'azn', 'bam', 'bbd', 'bdt', 'bgn', 'bhd', 'bif', 'bmd', 'bnd', 'bob', 'bov', 'brl', 'bsd', 'btn', 'bwp', 'byn', 'bzd', 'cad', 'cdf', 'che', 'chf', 'chw', 'clf', 'clp', 'cny', 'cop', 'cou', 'crc', 'cuc', 'cup', 'cve', 'czk', 'djf', 'dkk', 'dop', 'dzd', 'egp', 'ern', 'etb', 'eur', 'fjd', 'fkp', 'gbp', 'gel', 'ghs', 'gip', 'gmd', 'gnf', 'gtq', 'gyd', 'hkd', 'hnl', 'hrk', 'htg', 'huf', 'idr', 'ils', 'inr', 'iqd', 'irr', 'isk', 'jmd', 'jod', 'jpy', 'kes', 'kgs', 'khr', 'kmf', 'kpw', 'krw', 'kwd', 'kyd', 'kzt', 'lak', 'lbp', 'lkr', 'lrd', 'lsl', 'lyd', 'mad', 'mdl', 'mga', 'mkd', 'mmk', 'mnt', 'mop', 'mru', 'mur', 'mvr', 'mwk', 'mxn', 'mxv', 'myr', 'mzn', 'nad', 'ngn', 'nio', 'nok', 'npr', 'nzd', 'omr', 'pab', 'pen', 'pgk', 'php', 'pkr', 'pln', 'pyg', 'qar', 'ron', 'rsd', 'rub', 'rwf', 'sar', 'sbd', 'scr', 'sdg', 'sek', 'sgd', 'shp', 'sll', 'sos', 'srd', 'ssp', 'stn', 'svc', 'syp', 'szl', 'thb', 'tjs', 'tmt', 'tnd', 'top', 'try', 'ttd', 'twd', 'tzs', 'uah', 'ugx', 'usd', 'usn', 'uyi', 'uyu', 'uyw', 'uzs', 'ves', 'vnd', 'vuv', 'wst', 'xaf', 'xag', 'xau', 'xba', 'xbb', 'xbc', 'xbd', 'xcd', 'xdr', 'xof', 'xpd', 'xpf', 'xpt', 'xsu', 'xts', 'xua', 'xxx', 'yer', 'zar', 'zmw', 'zwl']",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish: "Invalid Date",
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgDateUnitCodes.WRONG_PG_DATE,
        message: "body.finish: value must be date",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start: "Invalid Date",
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgDateUnitCodes.WRONG_PG_DATE,
        message: "body.start: value must be date",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start: moment().subtract({second: 1}).toDate(),
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgDateUnitCodes.WRONG_PG_DATE,
        message: "body.start: value must be in future",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish: start,
        start: finish,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgDateUnitCodes.WRONG_PG_DATE,
        message: "body.start: value must be less then body.finish",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: -1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgNumericUnitCodes.WRONG_PG_NUMERIC,
        message: "body.startbid: value must be valid numeric",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: -100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: PgNumericUnitCodes.WRONG_PG_NUMERIC,
        message: "body.step: value must be valid numeric",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: "false",
        stuffid: "1",
        type: "sale",
      })
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.strict: value must be boolean",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "0",
        type: "sale",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "body.stuffid: bigserial must be more or equal than 1",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "999",
        type: "sale",
      })
      .expect(400, {
        code: ApiCodes.DB_STUFF_NOT_FOUND_BY_ID,
        message: "body.stuffid: stuff with same id not found",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "25.5",
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "$$$",
      })
      .expect(400, {
        code: PgEnumUnitCodes.WRONG_PG_ENUM,
        message: "body.type: value must be one of these values ['purchase', 'sale']",
      });
  });

  it("wrong auth", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });

    await Sequelize.instance.employee.update({
      banned: true,
      moderator: true,
    }, {
      where: {
        id: "1",
      },
    });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });

    await Sequelize.instance.employee.update({
      banned: false,
      moderator: false,
    }, {
      where: {
        id: "1",
      },
    });
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_MODERATOR,
        message: "required moderator",
      });
  });

  it("correct", async () => {
    const start = moment().add({minute: 10}).toDate();
    const finish = moment(start).add({minute: 10}).toDate();

    const spySocket = sinon.stub();
    socket.on("lot", spySocket);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 10,
        },
        currency: "rub",
        finish,
        start,
        startbid: 1000,
        step: 100,
        strict: false,
        stuffid: "1",
        type: "sale",
      })
      .expect(201, {
        id: "1",
      });

    await waitForExpect(() => {
      sinon.assert.calledOnce(spySocket);
      expect(spySocket.args[0][0]).have.keys(
        "amount", "buffer", "currency", "finish", "id", "participants",
        "start", "startbid", "step", "strict", "stuffid", "type");
      expect(spySocket.args[0][0].amount).equal("2.25");
      expect(spySocket.args[0][0].buffer).deep.equal({
        minutes: 10,
      });
      expect(spySocket.args[0][0].currency).equal("rub");
      expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
      expect(spySocket.args[0][0].id).equal("1");
      expect(spySocket.args[0][0].participants).equal("0");
      expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
      expect(spySocket.args[0][0].startbid).equal("1000");
      expect(spySocket.args[0][0].step).equal("100");
      expect(spySocket.args[0][0].strict).equal(false);
      expect(spySocket.args[0][0].stuffid).equal("1");
      expect(spySocket.args[0][0].type).equal("sale");
    });

    const lot = await Sequelize.instance.lot.findByPk("1") as ILotInstance;
    expect(lot.id).equal("1");
    expect(lot.stuffid).equal("1");
    expect(lot.type).equal("sale");
    expect(lot.amount).equal("2.25");
    expect((lot.start as Date).getTime()).equal(start.getTime());
    expect((lot.finish as Date).getTime()).equal(finish.getTime());
    expect((lot.buffer as IPostgresInterval).toPostgres()).equal("10 minutes");
    expect(lot.startbid).equal("1000");
    expect(lot.step).equal("100");
    expect(lot.strict).equal(false);
    expect(lot.currency).equal("rub");
    expect(lot.participants).equal("0");
    expect(lot.winbid).equal(null);
    expect(lot.winner).equal(null);
  });
});
