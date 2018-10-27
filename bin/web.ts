#!/usr/bin/env node

import "../global";
import {debug} from "./debug";

import {PgEnumUnitCacheMemory, PgEnumUnitClient} from "@alendo/express-req-validator";

import {EmailNotifications, Env, RedisClient, Sequelize, Web} from "src";

RedisClient.instantiate();
EmailNotifications.instantiateSmtp();
Sequelize.instantiateWeb();
PgEnumUnitClient.instantiate(Sequelize.instance as any); // TODO: remove "as any" when will be used normal types
PgEnumUnitCacheMemory.instantiate();
Web.instantiate();

(async () => {
  debug("Welcome to api.auction.chvcm.ru!");
  await Web.instance.listen();
  debug(`Web listen on port ${Env.PORT} and bind to host ${Env.HOST}`);
})();

async function handle(signal: string): Promise<void> {
  await Web.instance.close();
  await Sequelize.instance.close();
  await RedisClient.close();
  debug(`Web was stopped by ${signal} signal`);
}

process.on("SIGINT", handle);
process.on("SIGTERM", handle);
