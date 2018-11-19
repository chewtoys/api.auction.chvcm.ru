import {allowReCaptcha} from "../../common";
import waitForExpect from "../../wait-for-expect/index";

import {
  BooleanUnitCodes,
  NotEmptyStringUnitCodes,
  ObjectUnitCodes,
  PgBigSerialUnitCodes,
  StringUnitCodes,
} from "@alendo/express-req-validator";

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
} from "../../../src";

describe("PATCH /entities/:id", () => {
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
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/id2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must contain only digits",
      });
  });

  it("Bad Request 400 - wrong id (on less)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/0`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be more or equal than 1",
      });
  });

  it("Bad Request 400 - wrong id (on more)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/9223372036854775808`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(400, {
        code: PgBigSerialUnitCodes.WRONG_PG_BIGSERIAL,
        message: "params.id: bigserial must be less or equal than 9223372036854775807",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (ban_message)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ban_message: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.ban_message: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (banned)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        banned: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.banned: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (ceo)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.ceo: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (name)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.name: value can't be null",
      });
  });

  it("Bad Request 400 - OBJECT_NULL_VALUE (verified)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        verified: null,
      })
      .expect(400, {
        code: ObjectUnitCodes.OBJECT_NULL_VALUE,
        message: "body.verified: value can't be null",
      });
  });

  it("Bad Request 400 - wrong ban_message", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ban_message: true,
      })
      .expect(400, {
        code: StringUnitCodes.WRONG_STRING,
        message: "body.ban_message: value must be string",
      });
  });

  it("Bad Request 400 - wrong banned", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        banned: "true",
      })
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.banned: value must be boolean",
      });
  });

  it("Bad Request 400 - wrong ceo", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: "",
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.ceo: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong name", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "",
      })
      .expect(400, {
        code: NotEmptyStringUnitCodes.WRONG_NOT_EMPTY_STRING,
        message: "body.name: value must be not empty string",
      });
  });

  it("Bad Request 400 - wrong verified", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        verified: "true",
      })
      .expect(400, {
        code: BooleanUnitCodes.WRONG_BOOLEAN,
        message: "body.verified: value must be boolean",
      });
  });

  it("401 Unauthorized - verify user (jwt must be provided)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt must be provided",
      });
  });

  it("401 Unauthorized - verify user (jwt malformed)", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer token`)
      .expect(401, {
        code: ApiCodes.JWT_VERIFY_USER,
        message: "jwt malformed",
      });
  });

  it("Unauthorized 401 - employee not found", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
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
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/999`)
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .expect(401, {
        code: ApiCodes.BANNED,
        message: "user was banned",
      });
  });

  it("Forbidden 403 - required entity with same id", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/999`)
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(403, {
        code: ApiCodes.REQUIRED_SAME_ENTITY_OR_MODERATOR,
        message: "required entity with same id or moderator",
      });
  });

  it("Not Found 404 - entity not found", async () => {
    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/999`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .set("Content-Type", "application/octet-stream")
      .expect(404, {
        code: ApiCodes.DB_ENTITY_NOT_FOUND_BY_ID,
        message: "entity with same id not found",
      });
  });

  it("unverified (entity) - change ceo", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("unverified (employee) - change ceo", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("unverified (entity) - change name", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("unverified (employee) - change name", async () => {
    await Sequelize.instance.entity.update({
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("verified (entity) - same ceo", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: "Catherine Havasi",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Catherine Havasi");
    expect(entity.verified).equal(true);
  });

  it("verified (employee) - same ceo", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ceo: "Catherine Havasi",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Catherine Havasi");
    expect(entity.verified).equal(true);
  });

  it("verified (entity) - same name", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "Luminoso",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso");
    expect(entity.verified).equal(true);
  });

  it("verified (employee) - same name", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        name: "Luminoso",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso");
    expect(entity.verified).equal(true);
  });

  it("verified (entity) - change ceo - ru email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("verified (entity) - change ceo - en email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("verified (employee) - change ceo - ru email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("verified (employee) - change ceo - en email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ceo: "Havasi Catherine",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.ceo).equal("Havasi Catherine");
    expect(entity.verified).equal(false);
  });

  it("verified (entity) - change name - ru email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("verified (entity) - change name - en email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("verified (employee) - change name - ru email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("verified (employee) - change name - en email", async () => {
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

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        name: "Luminoso Inc.",
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.name).equal("Luminoso Inc.");
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (entity) - ban", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - ban - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - ban - ru email with custom message", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - ban - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - ban - en email with custom message", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified banned (employee) - ban", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (entity) - ban", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEntity}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });

  it("verified unbanned (employee) - ban - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (employee) - ban - ru email with custom message", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была забанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (employee) - ban - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (employee) - ban - en email with custom message", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        ban_message: "custom message",
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been banned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.html).contains("custom message");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("custom message");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified banned (employee) - ban", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified banned (employee) - unban - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была разбанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified banned (employee) - unban - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been unbanned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - unban", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - verify - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была проверена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });

  it("unverified unbanned (employee) - verify - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been verified!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });

  it("verified unbanned (employee) - verify", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });

  it("unverified banned (employee) - verify", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (employee) - unverify - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "ru",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись ожидает проверки!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("verified unbanned (employee) - unverify - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: true,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledOnce(spyMail);
      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account is awaiting verification!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified unbanned (employee) - unverify", async () => {
    await Sequelize.instance.entity.update({
      banned: false,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(false);
  });

  it("unverified banned (employee) - unverify", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        verified: false,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.notCalled(spyMail);
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(true);
    expect(entity.verified).equal(false);
  });

  it("unverified banned (employee) - verify + unbanned - ru email", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "ru",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: false,
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);

      expect(spyMail.args[0][0].originalMessage.subject).equal("Ваша учетная запись была разбанена!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");

      expect(spyMail.args[1][0].originalMessage.subject).equal("Ваша учетная запись была проверена!");
      expect(spyMail.args[1][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[1][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[1][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[1][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });

  it("unverified banned (employee) - verify + unbanned - en email", async () => {
    await Sequelize.instance.entity.update({
      banned: true,
      language: "en",
      verified: false,
    }, {
      where: {
        id: "2",
      },
    });

    const spyMail = sinon.stub();
    EmailNotifications.instance.on(EmailNotifications.EMAIL_EVENT, spyMail);

    await supertest(Web.instance.app).patch(`${Const.API_MOUNT_POINT}/entities/2`)
      .set("Authorization", `Bearer ${tokenEmployee}`)
      .send({
        banned: false,
        verified: true,
      })
      .expect(204);

    await waitForExpect(() => {
      sinon.assert.calledTwice(spyMail);

      expect(spyMail.args[0][0].originalMessage.subject).equal("Your account has been unbanned!");
      expect(spyMail.args[0][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[0][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[0][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[0][0].originalMessage.text).contains("Luminoso");

      expect(spyMail.args[1][0].originalMessage.subject).equal("Your account has been verified!");
      expect(spyMail.args[1][0].originalMessage.from).equal(Env.EMAIL_FROM);
      expect(spyMail.args[1][0].originalMessage.to).equal("entity@example.com");
      expect(spyMail.args[1][0].originalMessage.html).contains("Luminoso");
      expect(spyMail.args[1][0].originalMessage.text).contains("Luminoso");
    });

    const entity = await Sequelize.instance.entity.findByPk("2") as IEntityInstance;
    expect(entity.banned).equal(false);
    expect(entity.verified).equal(true);
  });
});
