import "../global";

import * as debug from "debug";

if (process.env.DEBUG) {
  debug.enable(process.env.DEBUG);
}

import {PgEnumUnitCacheMemory, PgEnumUnitClient} from "@alendo/express-req-validator";

import "mocha";

import {EmailNotifications, PgMigrate, RedisClient, S3, Sequelize, Web} from "../src";

let beforeAll = true;

export function prepareApi() {
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

    await Web.instance.listen();
  });

  afterEach(async () => {
    await Web.instance.close();
    await Sequelize.instance.close();
    await RedisClient.close();
  });
}

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
