import {EventEmitter} from "events";
import * as path from "path";
import * as util from "util";

import * as cachePugTemplates from "cache-pug-templates";
import * as debug from "debug";
import * as Email from "email-templates";
import * as marked from "marked";
import * as nodemailer from "nodemailer";

import {baseDir} from "../../global";
import {Const} from "../const";
import {Env} from "../env";
import {IEmailOptions, IEmailUser} from "../interfaces";
import {RedisClient} from "../redis";

async function renderMarkdown(markdown?: string): Promise<string> {
  if (!markdown) {
    return "";
  }
  return await util.promisify(
    (src: string, callback: (error: Error | null, html: string) => void) => marked(src, callback))(markdown);
}

/**
 * Email notifications
 */
export class EmailNotifications extends EventEmitter {
  /**
   * Email event
   */
  public static readonly EMAIL_EVENT = "EMAIL_EVENT";

  /**
   * Instantiate instance with SMTP transport
   */
  public static instantiateSmtp() {
    this._instance = new EmailNotifications(nodemailer.createTransport(Env.EMAIL_SMTP));
  }

  /**
   * Instance
   * @return {EmailNotifications}
   */
  public static get instance() {
    return this._instance;
  }

  private static _instance: EmailNotifications;

  private readonly _email: Email;
  private readonly _i18nDebug: debug.IDebugger;
  private readonly _i18nWarn: debug.IDebugger;
  private readonly _i18nError: debug.IDebugger;

  private constructor(transport: nodemailer.Transporter) {
    super();
    this._i18nDebug = debug("i18n:debug");
    this._i18nWarn = debug("i18n:warn");
    this._i18nError = debug("i18n:error");
    const views = path.join(baseDir, "emails", "templates");
    // noinspection JSUnusedGlobalSymbols
    this._email = new Email({
      i18n: {
        defaultLocale: "en",
        directory: path.join(baseDir, "emails", "locales"),
        locales: ["ru", "en"],
        logger: {
          debug: (msg: any) => {
            this._i18nDebug(msg);
          },
          error: (msg: any) => {
            this._i18nError(msg);
          },
          warn: (msg: any) => {
            this._i18nWarn(msg);
          },
        },
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          images: true,
          relativeTo: baseDir,
        },
      },
      message: {
        from: Env.EMAIL_FROM,
      },
      preview: Const.STAGING && Env.EMAIL_PREVIEW,
      send: Const.PRODUCTION,
      transport,
      views: {
        root: views,
      },
    });
    if (Const.PRODUCTION) {
      cachePugTemplates(RedisClient.instance, views);
    }
  }

  /**
   * Send "banned" message
   * @param user User
   * @param message Message
   * @throws Error
   */
  public async banned(user: IEmailUser, message?: string): Promise<void> {
    await this.send({
      locals: {
        locale: user.language,
        message: await renderMarkdown(message),
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "banned",
    });
  }

  /**
   * Send "inviteEmployee" message
   * @param user User
   * @throws Error
   */
  public async inviteEmployee(user: IEmailUser): Promise<void> {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "invite_employee",
    });
  }

  /**
   * Send "passwordReset" message
   * @param user User
   * @param token Token
   * @throws Error
   */
  public async passwordReset(user: IEmailUser, token: string) {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
        token,
      },
      message: {
        to: user.email as string,
      },
      template: "password_reset",
    });
  }

  /**
   * Send "passwordResetComplete" message
   * @param user User
   * @throws Error
   */
  public async passwordResetComplete(user: IEmailUser) {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "password_reset_complete",
    });
  }

  /**
   * Send "signin" message
   * @param user User
   * @throws Error
   */
  public async signin(user: IEmailUser) {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "signin",
    });
  }

  /**
   * Send "signinTfa" message
   * @param user User
   * @throws Error
   */
  public async signinTfa(user: IEmailUser) {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "signin_tfa",
    });
  }

  /**
   * Send "signup" message
   * @param entity
   * @throws Error
   */
  public async signup(entity: IEmailUser) {
    await this.send({
      locals: {
        locale: entity.language,
        name: entity.name,
      },
      message: {
        to: entity.email as string,
      },
      template: "signup",
    });
  }

  /**
   * Send "test" message
   * @param to To
   * @param locale Locale
   * @throws Error
   */
  public async test(to: string, locale: string = "en") {
    await this.send({
      locals: {
        locale,
      },
      message: {
        to,
      },
      template: "test",
    });
  }

  /**
   * Send "unbanned" message
   * @param user User
   * @throws Error
   */
  public async unbanned(user: IEmailUser) {
    await this.send({
      locals: {
        locale: user.language,
        name: user.name,
      },
      message: {
        to: user.email as string,
      },
      template: "unbanned",
    });
  }

  /**
   * Send "unverified" message
   * @param entity Entity
   * @throws Error
   */
  public async unverified(entity: IEmailUser) {
    await this.send({
      locals: {
        locale: entity.language,
        name: entity.name,
      },
      message: {
        to: entity.email as string,
      },
      template: "unverified",
    });
  }

  /**
   * Send "verified" message
   * @param entity Entity
   * @throws Error
   */
  public async verified(entity: IEmailUser) {
    await this.send({
      locals: {
        locale: entity.language,
        name: entity.name,
      },
      message: {
        to: entity.email as string,
      },
      template: "verified",
    });
  }

  private async send(options: IEmailOptions) {
    const res = await this._email.send(options);
    if (Const.STAGING) {
      this.emit(EmailNotifications.EMAIL_EVENT, res);
    }
  }
}
