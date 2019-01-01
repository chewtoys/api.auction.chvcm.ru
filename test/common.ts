import "../global";

import * as debug from "debug";

if (process.env.DEBUG) {
  debug.enable(process.env.DEBUG);
}

import {PgEnumUnitCacheMemory, PgEnumUnitClient} from "@alendo/express-req-validator";

import MockAdapter from "axios-mock-adapter";
import "mocha";

import {EmailNotifications, PgMigrate, Recaptcha2, RedisClient, S3, Sequelize, Web} from "../src";

export let reCaptchaMockAdapter: MockAdapter;

export function allowReCaptcha(): void {
  reCaptchaMockAdapter.onPost(Recaptcha2.VERIFY_URL).reply(200, {
    success: true,
  });
}

export function disallowReCaptcha(): void {
  reCaptchaMockAdapter.onPost(Recaptcha2.VERIFY_URL).reply(200, {
    success: false,
  });
}

let beforeAll = true;

beforeEach(async () => {
  await S3.emptyBucket(true);

  RedisClient.instantiate();
  await RedisClient.flushdb();

  EmailNotifications.instantiateSmtp();

  Sequelize.instantiate();
  PgEnumUnitClient.instantiate(Sequelize.instance as any); // TODO: remove "as any" when will be used normal types
  PgEnumUnitCacheMemory.instantiate();

  if (beforeAll) {
    await Sequelize.instance.query(`
      CREATE SCHEMA IF NOT EXISTS public;
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;`);
    await new PgMigrate().upPending();
    beforeAll = false;
  } else {
    await Sequelize.instance.query("TRUNCATE users_common, stuffs RESTART IDENTITY CASCADE;");
  }

  Web.instantiate();
  reCaptchaMockAdapter = new MockAdapter(Recaptcha2.AXIOS);

  await Web.instance.listen();
});

afterEach(async () => {
  await Web.instance.close();
  await Sequelize.instance.close();
  await RedisClient.close();
  reCaptchaMockAdapter.restore();
});

process.on("uncaughtException", (error) => {
  // tslint:disable no-console
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  // tslint:disable no-console
  console.error(error);
  process.exit(1);
});
