import "../common";

import * as supertest from "supertest";

import {Const, Web} from "../../src";

describe("ALL /ping", () => {
  it("get", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/ping`)
      .expect(200);
  });

  it("post", async () => {
    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/ping`)
      .expect(200);
  });

  it("put", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/ping`)
      .expect(200);
  });

  it("delete", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/ping`)
      .expect(200);
  });
});
