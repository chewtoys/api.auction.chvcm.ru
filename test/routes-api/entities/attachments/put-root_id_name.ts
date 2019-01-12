import "../../../common";
import waitForExpect from "../../../wait-for-expect";

import {PgBigSerialUnitCodes, RegExpUnitCodes} from "@alendo/express-req-validator";

import * as bytes from "bytes";
import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";

import {
  ApiCodes,
  Bcrypt,
  Const,
  EmailNotifications,
  Env,
  IEntityInstance,
  Jwt,
  S3,
  Sequelize,
  Web,
} from "../../../../src";

describe("PUT /entities/:id/attachments/:name", () => {
  let tokenEmployee: string;
  let tokenEntity: string;

  beforeEach(async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

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

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
    });
  });

  it("Bad Request 400 - wrong id (wrong symbols)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/id2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must contain only digits",
      });
  });

  it("Bad Request 400 - wrong id (on less)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/0/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - wrong id (on more)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/9223372036854775808/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be less or equal than 9223372036854775807",
      });
  });

  it("Bad Request 400 - wrong name (start from space)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/ files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: RegExpUnitCodes.WRONG_REGEXP,
        message: "params.name: value must match regular expression",
      });
  });

  it("Bad Request 400 - wrong name (with slash)", async () => {
    await supertest(Web.instance.app)
      .put(`${Const.API_MOUNT_POINT}/entities/2/attachments/${encodeURIComponent("/files.zip")}`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: RegExpUnitCodes.WRONG_REGEXP,
        message: "params.name: value must match regular expression",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - employee not found", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
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
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
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

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required entity with same id", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
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

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(403, {
        code: ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR,
        message: "required entity with same id or moderator",
      });
  });

  it("Not Found 404 - entity not found", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(404, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("Payload to large 413", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .send(Buffer.alloc(bytes("2mb")).fill(0))
      .expect(413, {
        code: ApiCodes.PAYLOAD_TOO_LARGE,
        message: "request entity too large",
      });
  });

  it("Unsupported Media Type 415 - without content type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(415, {
        code: ApiCodes.UNSUPPORTED_MEDIA_TYPE,
        message: "Content-Type must be 'application/octet-stream'",
      });
  });

  it("Unsupported Media Type 415 - wrong content type", async () => {
    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/json")
      .expect(415, {
        code: ApiCodes.UNSUPPORTED_MEDIA_TYPE,
        message: "Content-Type must be 'application/octet-stream'",
      });
  });

  it("correct upload for entity - without email (empty body)", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of())).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for entity - without email (text body)", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .send("Простой текстовый файл")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.from("Простой текстовый файл"))).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for entity - without email (bin body)", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .send(Buffer.of(0, 20, 30, 40, 50, 200))
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of(0, 20, 30, 40, 50, 200))).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for entity - ru email (without body)", async () => {
    await Sequelize.instance.entity.update({
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of())).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for entity - en email (without body)", async () => {
    await Sequelize.instance.entity.update({
      language: "en",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of())).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for moderator - ru email (without body)", async () => {
    await Sequelize.instance.entity.update({
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of())).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct upload for moderator - en email (without body)", async () => {
    await Sequelize.instance.entity.update({
      language: "en",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).put(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const s3 = await S3.createClient(false);

    await s3.headObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    const filesZip = await s3.getObject({
      Bucket: Env.AWS_S3_BUCKET,
      Key: "entities/2/attachments/files.zip",
    }).promise();

    expect(Buffer.compare(filesZip.Body as Buffer, Buffer.of())).equal(0);
    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });
});