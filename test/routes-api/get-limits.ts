import "../common";

import * as supertest from "supertest";

import {Const, Env, Web} from "../../src";

describe("GET /limits", () => {
  it("get limits", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/limits`)
      .expect(200, {
        body: {
          json: Env.EXPRESS_BODY_PARSER_LIMIT_JSON,
          raw: Env.EXPRESS_BODY_PARSER_LIMIT_RAW,
        },
        limits: {
          attachments: Const.AWS_S3_LIMIT_LIMIT,
          db: Const.LIMIT_LIMIT,
        },
      });
  });
});
