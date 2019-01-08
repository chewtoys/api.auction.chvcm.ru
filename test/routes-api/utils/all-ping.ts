import "../../common";

import {expect} from "chai";
import * as supertest from "supertest";

import {ApiCodes, Const, Web} from "../../../src";

describe("ALL /utils/ping", () => {
  it("get", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/utils/ping`)
      .expect(200);
    expect(res.body).have.key("pong");
    expect(res.body.pong).be.a("boolean");
  });

  it("post", async () => {
    const res = await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/utils/ping`)
      .expect(200);
    expect(res.body).have.key("pong");
    expect(res.body.pong).be.a("boolean");
  });

  it("post with bad body", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/utils/ping`)
      .set("content-type", "application/json")
      .send(JSON.stringify(null))
      .expect(400, {
        code: ApiCodes.BAD_REQUEST,
        message: "Unexpected token n in JSON at position 0",
      });
  });

  it("put", async () => {
    const res = await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/utils/ping`)
      .expect(200);
    expect(res.body).have.key("pong");
    expect(res.body.pong).be.a("boolean");
  });

  it("delete", async () => {
    const res = await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/utils/ping`)
      .expect(200);
    expect(res.body).have.key("pong");
    expect(res.body.pong).be.a("boolean");
  });
});
