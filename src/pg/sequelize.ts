import * as cuid from "cuid";
import * as moment from "moment";
import * as SuperSequelize from "sequelize";

import {Const} from "../const";
import {Env} from "../env";
import {
  IEmployeeAttributes, IEmployeeInstance, IEmployeeModel,
  IEntityAttributes, IEntityInstance, IEntityModel,
  ILotAttributes, ILotInstance, ILotModel,
  ILotParticipantsAttributes, ILotParticipantsInstance, ILotParticipantsModel,
  IStuffAttributes, IStuffInstance, IStuffModel,
  IStuffTranslationsAttributes, IStuffTranslationsInstance, IStuffTranslationsModel,
  ITokensPasswordResetAttributes, ITokensPasswordResetInstance, ITokensPasswordResetModel,
  ITokensTfaOtpAttributes, ITokensTfaOtpInstance, ITokensTfaOtpModel,
  ITokensTfaPurgatoryAttributes, ITokensTfaPurgatoryInstance, ITokensTfaPurgatoryModel,
  ITokensTfaRecoveryAttributes, ITokensTfaRecoveryInstance, ITokensTfaRecoveryModel,
  IUserAttributes, IUserInstance, IUserModel,
} from "../interfaces";

/**
 * Sequelize
 */
export class Sequelize extends SuperSequelize {
  /**
   * Instantiate instance for Web
   */
  public static instantiateWeb(): void {
    Sequelize._instance = new Sequelize({
      poolMax: Env.DATABASE_POOL_MAX_WEB || Env.DATABASE_POOL_MAX_WORKER,
    });
  }

  /**
   * Instantiate instance for Worker
   */
  public static instantiateWorker(): void {
    Sequelize._instance = new Sequelize({
      poolMax: Env.DATABASE_POOL_MAX_WORKER || Env.DATABASE_POOL_MAX_WEB,
    });
  }

  /**
   * Operators
   */
  public static get op(): SuperSequelize.Operators {
    return SuperSequelize.Op;
  }

  /**
   * Instance
   */
  public static get instance(): Sequelize {
    return Sequelize._instance;
  }

  private static _instance: Sequelize;

  private _user: IUserModel = undefined as any;
  private _employee: IEmployeeModel = undefined as any;
  private _entity: IEntityModel = undefined as any;
  private _tokensTfaPurgatory: ITokensTfaPurgatoryModel = undefined as any;
  private _tokensTfaOtp: ITokensTfaOtpModel = undefined as any;
  private _tokensTfaRecovery: ITokensTfaRecoveryModel = undefined as any;
  private _tokensPasswordReset: ITokensPasswordResetModel = undefined as any;
  private _stuff: IStuffModel = undefined as any;
  private _stuffTranslations: IStuffTranslationsModel = undefined as any;
  private _lot: ILotModel = undefined as any;
  private _lotParticipants: ILotParticipantsModel = undefined as any;

  private constructor(options: {
    poolMax: number,
  }) {
    super(Env.DATABASE_URL, {
      define: {
        timestamps: false,
      },
      dialect: "postgres",
      dialectOptions: {
        ssl: Env.DATABASE_SSL,
      },
      logging: false,
      native: Env.DATABASE_NATIVE,
      pool: {
        max: options.poolMax,
      },
    });
    this.defineUser();
    this.defineEmployee();
    this.defineEntity();
    this.defineTokensTfaPurgatory();
    this.defineTokensTfaOtp();
    this.defineTokensPasswordReset();
    this.defineTokensTfaRecovery();
    this.defineStuff();
    this.defineStuffTranslations();
    this.defineLot();
    this.defineLotParticipants();
  }

  /**
   * User
   */
  public get user(): IUserModel {
    return this._user;
  }

  /**
   * Employee
   */
  public get employee(): IEmployeeModel {
    return this._employee;
  }

  /**
   * Entity
   */
  public get entity(): IEntityModel {
    return this._entity;
  }

  /**
   * Tokens TFA purgatory
   */
  public get tokensTfaPurgatory(): ITokensTfaPurgatoryModel {
    return this._tokensTfaPurgatory;
  }

  /**
   * Tokens TFA otp
   */
  public get tokensTfaOtp(): ITokensTfaOtpModel {
    return this._tokensTfaOtp;
  }

  /**
   * Tokens TFA recovery
   */
  public get tokensTfaRecovery(): ITokensTfaRecoveryModel {
    return this._tokensTfaRecovery;
  }

  /**
   * Tokens password reset
   */
  public get tokensPasswordReset(): ITokensPasswordResetModel {
    return this._tokensPasswordReset;
  }

  /**
   * Stuff
   */
  public get stuff(): IStuffModel {
    return this._stuff;
  }

  /**
   * Stuff translations
   */
  public get stuffTranslations(): IStuffTranslationsModel {
    return this._stuffTranslations;
  }

  /**
   * Lot
   */
  public get lot(): ILotModel {
    return this._lot;
  }

  /**
   * Lot participants
   */
  public get lotParticipants(): ILotParticipantsModel {
    return this._lotParticipants;
  }

  private defineUser(): void {
    this._user = this.define<IUserInstance, IUserAttributes>("users_common", {
      banned: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      email: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: SuperSequelize.BIGINT,
      },
      language: {
        allowNull: false,
        type: "LANGUAGE_CODE",
      },
      name: {
        allowNull: false,
        type: SuperSequelize.TEXT,
      },
      password: {
        allowNull: true,
        type: SuperSequelize.TEXT,
      },
      phone: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      registration: {
        allowNull: false,
        defaultValue: SuperSequelize.NOW,
        type: SuperSequelize.DATE,
      },
      tfa: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      type: {
        allowNull: false,
        type: "USER_TYPE",
      },
    }, {
      freezeTableName: true,
    });
  }

  private defineEmployee(): void {
    this._employee = this.define<IEmployeeInstance, IEmployeeAttributes>("employees", {
      admin: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      banned: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      email: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: SuperSequelize.BIGINT,
      },
      language: {
        allowNull: false,
        type: "LANGUAGE_CODE",
      },
      moderator: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      name: {
        allowNull: false,
        type: SuperSequelize.TEXT,
      },
      password: {
        allowNull: true,
        type: SuperSequelize.TEXT,
      },
      phone: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      registration: {
        allowNull: false,
        defaultValue: SuperSequelize.NOW,
        type: SuperSequelize.DATE,
      },
      tfa: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
    }, {
      freezeTableName: true,
    });
  }

  private defineEntity(): void {
    this._entity = this.define<IEntityInstance, IEntityAttributes>("entities", {
      banned: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      ceo: {
        allowNull: false,
        type: SuperSequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: SuperSequelize.BIGINT,
      },
      itn: {
        allowNull: false,
        type: SuperSequelize.BIGINT,
        unique: true,
      },
      language: {
        allowNull: false,
        type: "LANGUAGE_CODE",
      },
      name: {
        allowNull: false,
        type: SuperSequelize.TEXT,
      },
      password: {
        allowNull: true,
        type: SuperSequelize.TEXT,
      },
      phone: {
        allowNull: false,
        type: SuperSequelize.TEXT,
        unique: true,
      },
      psrn: {
        allowNull: false,
        type: SuperSequelize.BIGINT,
        unique: true,
      },
      registration: {
        allowNull: false,
        defaultValue: SuperSequelize.NOW,
        type: SuperSequelize.DATE,
      },
      tfa: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
      verified: {
        allowNull: false,
        defaultValue: false,
        type: SuperSequelize.BOOLEAN,
      },
    }, {
      freezeTableName: true,
    });
  }

  private defineTokensTfaPurgatory(): void {
    this._tokensTfaPurgatory = this.define<ITokensTfaPurgatoryInstance, ITokensTfaPurgatoryAttributes>(
      "tokens_tfa_purgatory", {
        expires: {
          allowNull: false,
          defaultValue() {
            return moment().add(Const.TOKENS_TFA_PURGATORY_EXPIRESIN).toDate();
          },
          type: SuperSequelize.DATE,
        },
        token: {
          defaultValue() {
            return cuid();
          },
          primaryKey: true,
          type: SuperSequelize.TEXT,
        },
        userid: {
          allowNull: false,
          type: SuperSequelize.BIGINT,
        },
      }, {
        freezeTableName: true,
      });
    this.user.hasMany(this._tokensTfaPurgatory, {
      foreignKey: "userid",
      sourceKey: "id",
    });
    this._tokensTfaPurgatory.belongsTo(this.user, {
      foreignKey: "userid",
      targetKey: "id",
    });
  }

  private defineTokensTfaOtp(): void {
    this._tokensTfaOtp = this.define<ITokensTfaOtpInstance, ITokensTfaOtpAttributes>(
      "tokens_tfa_otp", {
        token: {
          allowNull: false,
          type: SuperSequelize.TEXT,
        },
        type: {
          allowNull: false,
          type: "OTP_TYPE",
        },
        userid: {
          primaryKey: true,
          type: SuperSequelize.BIGINT,
        },
      }, {
        freezeTableName: true,
      });
    this.user.hasOne(this._tokensTfaOtp, {
      foreignKey: "userid",
    });
    this._tokensTfaOtp.belongsTo(this.user, {
      foreignKey: "userid",
      targetKey: "id",
    });
  }

  private defineTokensTfaRecovery(): void {
    this._tokensTfaRecovery = this.define<ITokensTfaRecoveryInstance, ITokensTfaRecoveryAttributes>(
      "tokens_tfa_recovery", {
        token: {
          defaultValue() {
            return cuid();
          },
          primaryKey: true,
          type: SuperSequelize.TEXT,
        },
        userid: {
          allowNull: false,
          type: SuperSequelize.BIGINT,
        },
      }, {
        freezeTableName: true,
      });
    this.user.hasMany(this._tokensTfaRecovery, {
      foreignKey: "userid",
      sourceKey: "id",
    });
    this._tokensTfaRecovery.belongsTo(this.user, {
      foreignKey: "userid",
      targetKey: "id",
    });
  }

  private defineTokensPasswordReset(): void {
    this._tokensPasswordReset = this.define<ITokensPasswordResetInstance, ITokensPasswordResetAttributes>(
      "tokens_password_reset", {
        expires: {
          allowNull: false,
          defaultValue() {
            return moment().add(Const.TOKENS_PASSWORD_RESET_EXPIRESIN).toDate();
          },
          type: SuperSequelize.DATE,
        },
        token: {
          defaultValue() {
            return cuid();
          },
          primaryKey: true,
          type: SuperSequelize.TEXT,
        },
        userid: {
          allowNull: false,
          type: SuperSequelize.BIGINT,
        },
      }, {
        freezeTableName: true,
      });
    this.user.hasMany(this._tokensPasswordReset, {
      foreignKey: "userid",
      sourceKey: "id",
    });
    this._tokensPasswordReset.belongsTo(this.user, {
      foreignKey: "userid",
      targetKey: "id",
    });
  }

  private defineStuff(): void {
    this._stuff = this.define<IStuffInstance, IStuffAttributes>("stuffs", {
      amount_type: {
        allowNull: false,
        type: "AMOUNT_TYPE",
      },
      enabled: {
        allowNull: false,
        defaultValue: true,
        type: SuperSequelize.BOOLEAN,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: SuperSequelize.BIGINT,
      },
    }, {
      freezeTableName: true,
    });
  }

  private defineStuffTranslations(): void {
    this._stuffTranslations = this.define<IStuffTranslationsInstance, IStuffTranslationsAttributes>(
      "stuff_translations", {
        code: {
          primaryKey: true,
          type: "LANGUAGE_CODE",
        },
        description: {
          allowNull: false,
          defaultValue: "",
          type: SuperSequelize.TEXT,
        },
        stuffid: {
          primaryKey: true,
          type: SuperSequelize.BIGINT,
        },
        title: {
          allowNull: false,
          type: SuperSequelize.TEXT,
        },
      }, {
        freezeTableName: true,
      });
    this.stuff.hasMany(this._stuffTranslations, {
      foreignKey: "stuffid",
      sourceKey: "id",
    });
    this._stuffTranslations.belongsTo(this.stuff, {
      foreignKey: "stuffid",
      targetKey: "id",
    });
  }

  private defineLot(): void {
    this._lot = this.define<ILotInstance, ILotAttributes>("lots", {
      amount: {
        allowNull: false,
        type: SuperSequelize.NUMERIC,
      },
      buffer: {
        allowNull: false,
        type: "INTERVAL",
      },
      currency: {
        allowNull: false,
        type: "CURRENCY",
      },
      finish: {
        allowNull: false,
        type: SuperSequelize.DATE,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: SuperSequelize.BIGINT,
      },
      participants: {
        allowNull: false,
        defaultValue: 0,
        type: SuperSequelize.BIGINT,
      },
      start: {
        allowNull: false,
        type: SuperSequelize.DATE,
      },
      startbid: {
        allowNull: false,
        type: SuperSequelize.NUMERIC,
      },
      step: {
        allowNull: false,
        type: SuperSequelize.NUMERIC,
      },
      stuffid: {
        allowNull: false,
        type: SuperSequelize.BIGINT,
      },
      type: {
        allowNull: false,
        type: "LOT_TYPE",
      },
      winbid: {
        type: SuperSequelize.NUMERIC,
      },
      winner: {
        type: SuperSequelize.BIGINT,
      },
    }, {
      freezeTableName: true,
    });
    this.stuff.hasMany(this._lot, {
      foreignKey: "stuffid",
      sourceKey: "id",
    });
    this._lot.belongsTo(this.stuff, {
      foreignKey: "stuffid",
      targetKey: "id",
    });
    this.entity.hasMany(this._lot, {
      foreignKey: "winner",
      sourceKey: "id",
    });
    this._lot.belongsTo(this.entity, {
      foreignKey: "winner",
      targetKey: "id",
    });
  }

  private defineLotParticipants(): void {
    this._lotParticipants = this.define<ILotParticipantsInstance, ILotParticipantsAttributes>(
      "lot_participants", {
        lotid: {
          primaryKey: true,
          type: SuperSequelize.BIGINT,
        },
        userid: {
          primaryKey: true,
          type: SuperSequelize.BIGINT,
        },
      }, {
        freezeTableName: true,
      });
    this.lot.hasMany(this._lotParticipants, {
      foreignKey: "lotid",
      sourceKey: "id",
    });
    this._lotParticipants.belongsTo(this.lot, {
      foreignKey: "lotid",
      targetKey: "id",
    });
    this.entity.hasMany(this._lotParticipants, {
      foreignKey: "userid",
      sourceKey: "id",
    });
    this._lotParticipants.belongsTo(this.entity, {
      foreignKey: "userid",
      targetKey: "id",
    });
  }
}
