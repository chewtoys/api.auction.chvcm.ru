import "../../../common";

import {PgBigSerialUnitCodes, PgLimitUnitCodes} from "@alendo/express-req-validator";

import {expect} from "chai";
import * as supertest from "supertest";

import {ApiCodes, Bcrypt, Const, Jwt, Sequelize, Web} from "../../../../src";

describe("GET /entities/:id/attachments", () => {
  let tokenEmployee: string;
  let tokenEntity: string;

  beforeEach(async () => {
    await Sequelize.instance.employee.create({
      email: "moderator@example.com",
      language: "ru",
      moderator: true,
      name: "admin",
      password: await Bcrypt.hash("super duper password"),
      phone: "+79123456789",
      tfa: false,
    });
    tokenEmployee = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/signin`)
      .send({
        email: "moderator@example.com",
        password: "super duper password",
      })
      .expect(200)).body.token;

    tokenEntity = (await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/entities`)
      .send({
        ceo: "Catherine Havasi",
        email: "entity@example.com",
        itn: 76_27_01931_7,
        language: "en",
        name: "Luminoso",
        password: "super duper password",
        phone: "+79123456780",
        psrn: 1_02_76_01_59327_1,
      })
      .expect(201)).body.token;
  });

  it("Bad Request 400 - wrong id (wrong symbols)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/id2/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must contain only digits",
      });
  });

  it("Bad Request 400 - wrong id (on less)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/0/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - wrong id (on more)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/9223372036854775808/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be less or equal than 9223372036854775807",
      });
  });

  it("Bad Request 400 - wrong limit (wrong symbols)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "infinity",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must contain only digits",
      });
  });

  it("Bad Request 400 - wrong limit (on less)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: -1,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: "query.limit: limit must be more or equal than 0",
      });
  });

  it("Bad Request 400 - wrong limit (on more)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: Const.AWS_S3_LIMIT_LIMIT + "1",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgLimitUnitCodes.WRONG_PG_LIMIT,
        message: `query.limit: limit must be less or equal than ${Const.AWS_S3_LIMIT_LIMIT}`,
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - employee not found", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${await Jwt.signUser({
        id: "999",
        type: Const.USER_TYPE_EMPLOYEE,
      })}`)
      .expect(401, {
        code: ApiCodes.DB_EMPLOYEE_NOT_FOUND_BY_ID,
        message: "employee with same id not found",
      });
  });

  it("Unauthorized 401 - entity not found", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/999/attachments`)
      .set("Authorization", `Bearer ${await Jwt.signUser({
        id: "999",
        type: Const.USER_TYPE_ENTITY,
      })}`)
      .expect(401, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("Unauthorized 401 - banned", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required entity with same id", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/999/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(403, {
        code: ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR,
        message: "required entity with same id or moderator",
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

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(403, {
        code: ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR,
        message: "required entity with same id or moderator",
      });
  });

  it("Not Found 404 - entity not found", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/999/attachments`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(404, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("correct for entity and employee - zero limit", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_3.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: 0,
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: 0,
      })
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });
  });

  it("correct for entity and employee - empty list", async () => {
    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });
  });

  it("correct for entity and employee - all files without pagination", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_3.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_20.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_2.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_10.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_1.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .send("1234567890")
      .expect(204);

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 10,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }, {
          name: "files_20.zip",
          size: 0,
        }, {
          name: "files_3.zip",
          size: 0,
        }],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 10,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }, {
          name: "files_20.zip",
          size: 0,
        }, {
          name: "files_3.zip",
          size: 0,
        }],
      });
  });

  it("correct for entity and employee - all files with pagination", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_3.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_20.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_2.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_10.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_1.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 0,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }],
        nextOffset: "entities/2/attachments/files_2.zip",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "entities/2/attachments/files_2.zip",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_20.zip",
          size: 0,
        }, {
          name: "files_3.zip",
          size: 0,
        }],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "entities/2/attachments/files_3.zip",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
      })
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 0,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }],
        nextOffset: "entities/2/attachments/files_2.zip",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "entities/2/attachments/files_2.zip",
      })
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_20.zip",
          size: 0,
        }, {
          name: "files_3.zip",
          size: 0,
        }],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "entities/2/attachments/files_3.zip",
      })
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });
  });

  it("malformed offset", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_3.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_20.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_2.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_10.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files_1.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 0,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }],
        nextOffset: "entities/2/attachments/files_2.zip",
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "other",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "other/file",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "other/",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [],
      });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments`)
      .query({
        limit: "3",
        offset: "/other/",
      })
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(200, {
        attachments: [{
          name: "files_1.zip",
          size: 0,
        }, {
          name: "files_10.zip",
          size: 0,
        }, {
          name: "files_2.zip",
          size: 0,
        }],
        nextOffset: "entities/2/attachments/files_2.zip",
      });
  });
});
