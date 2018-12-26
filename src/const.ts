import * as path from "path";

import {DurationInputObject} from "moment";
import {ZXCVBNScore} from "zxcvbn";

import {baseDir} from "../global";
import {Env} from "./env";

// tslint:disable no-var-requires
const constSharedJson = require(path.join(baseDir, "src", "const-shared.json"));

/**
 * Constants
 * TODO: refactoring it
 */
export class Const {
  /**
   * API mount point
   * @type {string}
   */
  public static readonly API_MOUNT_POINT: string = constSharedJson.API_MOUNT_POINT;

  /**
   * Production environment
   * @type {boolean}
   */
  public static readonly PRODUCTION: boolean = Env.NODE_ENV === "production";

  /**
   * Staging environment
   * @type {boolean}
   */
  public static readonly STAGING: boolean = Env.NODE_ENV === "staging";

  /**
   * Minimum password score in zxcvbn test >=
   * @type {number}
   */
  public static readonly MINIMUM_PASSWORD_SCORE: ZXCVBNScore = Const.PRODUCTION ? 3 : 1;

  /**
   * BCRYPT salt rounds
   * @type {number}
   */
  public static readonly BCRYPT_SALT_ROUNDS: number = 10;

  /**
   * JWT sign algorithm
   * @type {string}
   */
  public static readonly JWT_ALGORITHM: string = "HS512";

  /**
   * JWT verify algorithms
   * @type {string[]}
   */
  public static readonly JWT_ALGORITHMS: string[] = ["HS512"];

  /**
   * JWT lifetime
   * @type {string}
   */
  public static readonly JWT_EXPIRESIN: string = "100y"; // 100 years

  /**
   * Tokens (password reset) lifetime in milliseconds
   */
  public static readonly TOKENS_PASSWORD_RESET_EXPIRESIN: DurationInputObject = {hours: 1};

  /**
   * Tokens (tfa purgatory) lifetime in milliseconds
   */
  public static readonly TOKENS_TFA_PURGATORY_EXPIRESIN: DurationInputObject = {hours: 1};

  /**
   * User type (employee)
   * @type {string}
   */
  public static readonly USER_TYPE_EMPLOYEE = "employee";

  /**
   * User type (entity)
   * @type {string}
   */
  public static readonly USER_TYPE_ENTITY = "entity";

  /**
   * TFA recovery codes count
   * @type {number}
   */
  public static readonly TFA_RECOVERY_CODES_COUNT = 10;

  /**
   * Google Authenticator service
   * @type {string}
   */
  public static readonly AUTHENTICATOR_SERVICE = "auction.chvcm.ru";

  /**
   * Limit to limit (db)
   */
  public static readonly LIMIT_LIMIT = "100";

  /**
   * Limit to limit (AWS S3)
   */
  public static readonly AWS_S3_LIMIT_LIMIT = "1000";

  /**
   * Phone locale
   */
  public static readonly PHONE_LOCALE = "ru-RU";

  /**
   * Socket.IO transports
   */
  public static readonly SOCKET_TRANSPORTS: string[] = ["websocket", "polling"];
}
