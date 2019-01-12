import "../../common";
import waitForExpect from "../../wait-for-expect/index";

import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";

import {BooleanUnitCodes, ObjectUnitCodes, PgBigSerialUnitCodes, StringUnitCodes} from "@alendo/express-req-validator";

import {
  ApiCodes,
  Bcrypt,
  Const,
  EmailNotifications,
  Env,
  IEmployeeInstance,
  Sequelize,
  Web,
} from "../../../src";

describe("PATCH /employees/:id", () => {
  let token: string;
  beforeEach(async () => {
    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await Sequelize.instance.employee.create({
      admin: true,
      email: "admin@example.com",
      language: "ru",
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

    await supertest(Web.instance.app).post(`${Const.API_MOUNT_POINT}/employees`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "moderator@example.com",
        language: "ru",
        name: "moderator",
        phone: "+79123456780",
      })
      .expect(201, {
        id: "2",
      });

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);
    });
  });

  it("Bad Request 400 - wrong id", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/0`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (ban_message)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        ban_message: null,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.ban_message: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (banned)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        banned: null,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.banned: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (moderator)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        moderator: null,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.moderator: value can't be null",
      });
  });

  it("Bad Request 400 - wrong ban_message", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        ban_message: true,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: StringUnitCodes.WRONG_STRING,
        message: "body.ban_message: value must be string",
      });
  });

  it("Bad Request 400 - wrong banned", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        banned: "true",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.banned: value must be boolean",
      });
  });

  it("Bad Request 400 - wrong moderator", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .send({
        moderator: "true",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.moderator: value must be boolean",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - banned", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required admin", async () => {
    await Sequelize.instance.employee.update({
      admin: false,
    }, {
      where: {
        id: "1",
      },
    });

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403, {
        code: ApiCodes.REQUIRED_ADMIN,
        message: "required admin",
      });
  });

  it("Not Found 404 - employee not found", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/999`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404, {
        code: ApiCodes.DB_EMPLOYEE_NOT_FOUND_BY_ID,
        message: "employee with same id not found",
      });
  });

  it("grant moderator (for employee)", async () => {
    await Sequelize.instance.employee.update({
      moderator: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        moderator: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(true);
  });

  it("grant moderator (for moderator)", async () => {
    await Sequelize.instance.employee.update({
      moderator: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        moderator: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(true);
  });

  it("prohibit moderator (for employee)", async () => {
    await Sequelize.instance.employee.update({
      moderator: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        moderator: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("prohibit moderator (for moderator)", async () => {
    await Sequelize.instance.employee.update({
      moderator: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        moderator: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("unbanned - ban - ru email", async () => {
    await Sequelize.instance.employee.update({
      banned: false,
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(true);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("unbanned - ban - ru email (with custom message)", async () => {
    await Sequelize.instance.employee.update({
      banned: false,
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(true);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("unbanned - ban - en email", async () => {
    await Sequelize.instance.employee.update({
      banned: false,
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(true);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("unbanned - ban - en email (with custom message)", async () => {
    await Sequelize.instance.employee.update({
      banned: false,
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(true);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("banned - ban", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(true);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("banned - unban - ru email", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
      language: "ru",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была разбанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("banned - unban - en email", async () => {
    await Sequelize.instance.employee.update({
      banned: true,
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been unbanned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("moderator@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("moderator");
      expect(spyMail.args[0][0].originalMessage.text).contains("moderator");
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });

  it("unbanned - unban", async () => {
    await Sequelize.instance.employee.update({
      banned: false,
      language: "en",
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/employees/2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const employee = await Sequelize.instance.employee.findByPk("2");
    expect((employee as IEmployeeInstance).banned).equal(false);
    expect((employee as IEmployeeInstance).moderator).equal(false);
  });
});
