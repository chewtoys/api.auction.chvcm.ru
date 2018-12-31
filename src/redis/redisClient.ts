import * as util from "util";

import * as redis from "redis";
import {Env} from "../env";

/**
 * Redis client
 */
export class RedisClient {
  /**
   * Instantiate instance
   */
  public static instantiate(): void {
    RedisClient._instance = redis.createClient(Env.REDIS_URL);
  }

  /**
   * Instance
   * @return {RedisClient}
   */
  public static get instance(): RedisClient {
    return RedisClient._instance;
  }

  /**
   * FLUSHDB
   * @throws Error
   */
  public static async flushdb(): Promise<void> {
    await util.promisify((callback) => {
      this._instance.FLUSHDB(callback);
    })();
  }

  /**
   * Close connection
   * @param client Client (instance by default)
   * @throws Error
   */
  public static async close(client?: redis.RedisClient): Promise<void> {
    await util.promisify((callback) => {
      (client || this._instance).quit(callback);
    })();
  }

  private static _instance: redis.RedisClient;
}
