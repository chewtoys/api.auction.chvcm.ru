import "../../common";
import waitForExpect from "../../wait-for-expect";

import {ObjectUnitCodes, PgBigSerialUnitCodes, PgNumericUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as moment from "moment";
import * as sinon from "sinon";
import * as io from "socket.io-client";
import {Socket} from "socket.io-client";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  Env,
  Sequelize,
  Web,
} from "../../../src";

describe("PATH /lots/:id", () => {
  let tokenEmployee: string;
  let tokenEntity1: string;
  let tokenEntity2: string;
  let socket: SocketIOClient.Socket;
  let start: Date;
  let finish: Date;

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

    tokenEntity1 = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
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

    tokenEntity2 = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "B Ceo",
        email: "b@example.com",
        itn: 37_29_02552_0,
        language: "en",
        name: "bbb",
        password: "super duper password",
        phone: "+79123456782",
        psrn: 1_06_77_46_50413_2,
      })
      .expect(201)).body.token;

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        [Sequelize.op.or]: [
          {
            id: "2",
          }, {
            id: "3",
          },
        ],
      },
    });

    socket = io(`http://localhost:${Env.PORT}${Const.API_MOUNT_POINT}`, {
      query: {
        token: tokenEntity1,
      },
      transports: Const.SOCKET_TRANSPORTS,
    });

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/stuffs`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount_type: "kg",
      })
      .expect(201, {
        id: "1",
      });

    start = moment().add({minute: 10}).toDate();
    finish = moment(start).add({minute: 10}).toDate();

    const spySocket = sinon.stub();
    socket.on("lot", spySocket);

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/lots`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        amount: 2.25,
        buffer: {
          minutes: 5,
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
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  it("Bad Request 400 - null key", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .set("Authorization", `Bearer ${tokenEntity1}`)
      .send({
        winbid: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.winbid: value can't be null",
      });
  });

  it("Bad Request 400 - wrong value", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/a`)
      .set("Authorization", `Bearer ${tokenEntity1}`)
      .send({
        winbid: "2.25",
      })
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must contain only digits",
      });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .set("Authorization", `Bearer ${tokenEntity1}`)
      .send({
        winbid: "2,25",
      })
      .expect(400, {
        code: PgNumericUnitCodes.WRONG_PG_NUMERIC,
        message: "body.winbid: value must be valid numeric",
      });
  });

  it("wrong auth", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });

    await Sequelize.instance.entity.update({
      banned: true,
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .set("Authorization", `Bearer ${tokenEntity1}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });

    await Sequelize.instance.entity.update({
      banned: false,
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
      .set("Authorization", `Bearer ${tokenEntity1}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_VERIFIED_ENTITY,
        message: "required verified entity",
      });
  });

  describe("sale - no strict", () => {
    beforeEach(async () => {
      start = moment().subtract({second: 1}).toDate();
      await Sequelize.instance.lot.update({
        start,
        strict: false,
        type: "sale",
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("first bid (less start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "999.99",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
      });
    });

    it("first bid (equal start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("first bid (more start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1050.5",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1050.5");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid (less winbid + step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "1099.99",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid (equal winbid + step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "1100",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1100");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });

    it("second bid (more winbid + step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "1150",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1150");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });
  });

  describe("purchase - no strict", () => {
    beforeEach(async () => {
      start = moment().subtract({second: 1}).toDate();
      await Sequelize.instance.lot.update({
        start,
        strict: false,
        type: "purchase",
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("first bid (more start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000.1",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
      });
    });

    it("first bid (equal start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("first bid (less start bid)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "950",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("950");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid (more winbid - step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "950",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid (equal winbid - step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "900",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("900");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });

    it("second bid (less winbid + step)", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "1000",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "850",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("850");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });

    it("second bid - zero winbid", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("0");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(false);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("0");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });
  });

  describe("sale - strict", () => {
    beforeEach(async () => {
      start = moment().subtract({second: 1}).toDate();
      await Sequelize.instance.lot.update({
        start,
        strict: true,
        type: "sale",
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("first bid", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid - overflow", async () => {
      const firstBid = new Array(131072).fill("9").join("");

      await Sequelize.instance.lot.update({
        startbid: firstBid,
      }, {
        where: {
          id: "1",
        },
      });

      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal(firstBid);
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal(firstBid);
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "0",
        })
        .expect(400, {
          code: PgNumericUnitCodes.WRONG_PG_NUMERIC,
          message: "body.winbid: value overflows numeric format",
        });

      await waitForExpect(() => {
        sinon.assert.notCalled(spySocket);
      });
    });

    it("second bid", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("sale");
        expect(spySocket.args[0][0].winbid).equal("1100");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });
  });

  describe("purchase - strict", () => {
    beforeEach(async () => {
      start = moment().subtract({second: 1}).toDate();
      await Sequelize.instance.lot.update({
        start,
        strict: true,
        type: "purchase",
      }, {
        where: {
          id: "1",
        },
      });
    });

    it("first bid", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });
    });

    it("second bid", async () => {
      const spySocket = sinon.stub();
      socket.on("lot", spySocket);

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity1}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("1");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("1000");
        expect(spySocket.args[0][0].winner).equal("2");
      });

      spySocket.reset();

      await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/lots/1`)
        .set("Authorization", `Bearer ${tokenEntity2}`)
        .send({
          winbid: "0",
        })
        .expect(204);

      await waitForExpect(() => {
        sinon.assert.calledOnce(spySocket);
        expect(spySocket.args[0][0]).have.keys(
          "amount", "buffer", "currency", "finish", "id", "participants", "start",
          "startbid", "step", "strict", "stuffid", "type", "winbid", "winner");
        expect(spySocket.args[0][0].amount).equal("2.25");
        expect(spySocket.args[0][0].buffer).deep.equal({
          minutes: 5,
        });
        expect(spySocket.args[0][0].currency).equal("rub");
        expect(moment(spySocket.args[0][0].finish).isSame(finish)).equal(true);
        expect(spySocket.args[0][0].id).equal("1");
        expect(spySocket.args[0][0].participants).equal("2");
        expect(moment(spySocket.args[0][0].start).isSame(start)).equal(true);
        expect(spySocket.args[0][0].startbid).equal("1000");
        expect(spySocket.args[0][0].step).equal("100");
        expect(spySocket.args[0][0].strict).equal(true);
        expect(spySocket.args[0][0].stuffid).equal("1");
        expect(spySocket.args[0][0].type).equal("purchase");
        expect(spySocket.args[0][0].winbid).equal("900");
        expect(spySocket.args[0][0].winner).equal("3");
      });
    });
  });
});
