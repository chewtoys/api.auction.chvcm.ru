import * as bytes from "bytes";

/**
 * Environment variables
 */
export class Env {
  // Node.js

  /**
   * Node.js environment - "production" or "staging"
   * @type {string}
   */
  public static readonly NODE_ENV: string = process.env.NODE_ENV as string;

  /**
   * To accept self signed certificate pass "0"
   */
  public static readonly NODE_TLS_REJECT_UNAUTHORIZED: string = process.env.NODE_TLS_REJECT_UNAUTHORIZED as string;

  // DB

  /**
   * AWS access key ID
   */
  public static readonly AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID as string;

  /**
   * AWS secret access key
   */
  public static readonly AWS_SECRET_ACCESS_KEY: string = process.env.AWS_SECRET_ACCESS_KEY as string;

  /**
   * AWS endpoint in format "https://{service}.{region}.amazonaws.com"
   */
  public static readonly AWS_ENDPOINT: string = process.env.AWS_ENDPOINT as string;

  /**
   * AWS S3 bucket name
   */
  public static readonly AWS_S3_BUCKET: string = process.env.AWS_S3_BUCKET as string;

  /**
   * PostgreSQL max pool clients
   */
  public static readonly DATABASE_POOL_MAX: number = parseInt(process.env.DATABASE_POOL_MAX as string, 10);

  /**
   * Does PostgreSQL use secure connection?
   */
  public static readonly DATABASE_SSL: boolean = !!process.env.DATABASE_SSL;

  /**
   * PostgreSQL connection string in format "postgres://user:password@host:5432/db"
   */
  public static readonly DATABASE_URL: string = process.env.DATABASE_URL as string;

  /**
   * Redis connection string in format "redis://host:6379"
   */
  public static readonly REDIS_URL: string = process.env.REDIS_URL as string;

  // Web

  /**
   * CORS - white list (semicolon ";" as separator), leave empty for any
   */
  public static readonly CORS_WHITELIST: string[] = (process.env.CORS_WHITELIST || "")
    .split(";").filter((host) => !!host);

  /**
   * Maximum size in "bytes" notation for json body
   */
  public static readonly EXPRESS_BODY_LIMIT_JSON: number =
    bytes(process.env.EXPRESS_BODY_LIMIT_JSON as string);

  /**
   * Max size in "bytes" notation for raw body
   */
  public static readonly EXPRESS_BODY_LIMIT_RAW: number =
    bytes(process.env.EXPRESS_BODY_LIMIT_RAW as string);

  /**
   * Port
   */
  public static readonly PORT: number = parseInt(process.env.PORT as string, 10);

  /**
   * Host
   */
  public static readonly HOST: string = process.env.HOST as string;

  // Email

  /**
   * Email for use in address "from"
   */
  public static readonly EMAIL_FROM: string = process.env.EMAIL_FROM as string;

  /**
   * Enable email preview? (only in staging mode)
   */
  public static readonly EMAIL_PREVIEW: boolean = !!process.env.EMAIL_PREVIEW;

  /**
   * SMTP email credentials in format "smtps://username:password@smtp.example.com/?pool=true"
   */
  public static readonly EMAIL_SMTP: string = process.env.EMAIL_SMTP as string;

  // Internal

  /**
   * JSON Web Token secret
   */
  public static readonly JWT_SECRET: string = process.env.JWT_SECRET as string;

  /**
   * Google reCaptcha v2 secret or fake "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
   * @type {string}
   */
  public static readonly RECAPTCHA_SECRET: string = process.env.RECAPTCHA_SECRET as string;
}
