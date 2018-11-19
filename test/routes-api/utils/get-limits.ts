import "../../common";

import {expect} from "chai";
import * as supertest from "supertest";

import {Const, Env, Web} from "../../../src";

describe("GET /utils/limits", () => {
  it("get limits", async () => {
    const res = await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/utils/limits`)
      .expect(200, {
        body: {
          json: Env.EXPRESS_BODY_PARSER_LIMIT_JSON,
          raw: Env.EXPRESS_BODY_PARSER_LIMIT_RAW,
        },
        select: {
          attachments: Const.AWS_S3_LIMIT_LIMIT,
          db: Const.LIMIT_LIMIT,
        },
      });

    expect(res.body.body.json).be.a("number");
    expect(res.body.body.raw).be.a("number");
    expect(res.body.select.attachments).be.a("string");
    expect(res.body.select.db).be.a("string");
  });
});
