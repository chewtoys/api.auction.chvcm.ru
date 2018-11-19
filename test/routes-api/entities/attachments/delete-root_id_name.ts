import {allowReCaptcha} from "../../../common";
import waitForExpect from "../../../wait-for-expect/index";

import {PgBigSerialUnitCodes, RegExpUnitCodes} from "@alendo/express-req-validator";

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
  Sequelize,
  Web,
} from "../../../../src";

describe("DELETE /attachments/:id/:name", () => {
  let tokenEmployee: string;
  let tokenEntity: string;

  beforeEach(async () => {
    allowReCaptcha();

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
      .expect(200)).body.token;

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
    });
  });

  it("Bad Request 400 - wrong id (wrong symbols)", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/id2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must contain only digits",
      });
  });

  it("Bad Request 400 - wrong id (on less)", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/0/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - wrong id (on more)", async () => {
    await supertest(Web.instance.app)
      .delete(`${Const.API_MOUNT_POINT}/entities/9223372036854775808/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be less or equal than 9223372036854775807",
      });
  });

  it("Bad Request 400 - wrong name (start from space)", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/ files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: RegExpUnitCodes.WRONG_REGEXP,
        message: "params.name: value must match regular expression",
      });
  });

  it("Bad Request 400 - wrong name (with slash)", async () => {
    await supertest(Web.instance.app)
      .delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/${encodeURIComponent("/files.zip")}`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: RegExpUnitCodes.WRONG_REGEXP,
        message: "params.name: value must match regular expression",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - employee not found", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
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
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required entity with same id", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR,
        message: "required entity with same id or moderator",
      });
  });

  it("Not Found 404 - entity not found", async () => {
    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/999/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("correct delete for entity - without email (not existing file)", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - without email (not existing file)", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for entity - without email (existing file)", async () => {
    await Sequelize.instance.entity.update({
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
    });

    spyMail.reset();

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - without email (existing file)", async () => {
    await Sequelize.instance.entity.update({
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
    });

    spyMail.reset();

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for entity - ru email (not existing file)", async () => {
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - ru email (not existing file)", async () => {
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for entity - en email (not existing file)", async () => {
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - en email (not existing file)", async () => {
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

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for entity - ru email (existing file)", async () => {
    await Sequelize.instance.entity.update({
      language: "ru",
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

    spyMail.reset();

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - ru email (existing file)", async () => {
    await Sequelize.instance.entity.update({
      language: "ru",
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

    spyMail.reset();

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for entity - en email (existing file)", async () => {
    await Sequelize.instance.entity.update({
      language: "en",
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

    spyMail.reset();

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });

  it("correct delete for employee - en email (existing file)", async () => {
    await Sequelize.instance.entity.update({
      language: "en",
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

    spyMail.reset();

    await Sequelize.instance.entity.update({
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    await supertest(Web.instance.app).delete(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    await supertest(Web.instance.app).get(`${Const.API_MOUNT_POINT}/entities/2/attachments/files.zip`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .expect(404, {
        code: ApiCodes.ATTACHMENT_NOT_FOUND,
        message: "The specified key does not exist.",
      });

    expect((await Sequelize.instance.entity.findByPk("2") as IEntityInstance).verified).equal(false);
  });
});
