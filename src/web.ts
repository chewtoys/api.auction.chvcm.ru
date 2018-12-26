import * as http from "http";
import * as path from "path";
import * as util from "util";

import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import {Express} from "express";
import * as bearerToken from "express-bearer-token";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as io from "socket.io";
import * as ioRedis from "socket.io-redis";

import {baseDir} from "../global";
import {Const} from "./const";
import {Env} from "./env";
import {Auth, ResponseChain} from "./middleware";
import {RedisClient} from "./redis";

/**
 * Web
 * TODO: refactoring it
 */
export class Web {
  /**
   * Instantiate web
   */
  public static instantiate() {
    Web._instance = new Web();
  }

  /**
   * Instance
   * @returns {Web}
   */
  public static get instance(): Web {
    return Web._instance;
  }

  private static _instance: Web;

  private readonly _app: Express;
  private readonly _server: http.Server;
  private readonly _io: io.Server;
  private readonly _redisAdapter: ioRedis.RedisAdapter;

  private constructor() {
    this._app = express();
    this._server = http.createServer(this._app);
    this._io = io(this.server, {
      transports: Const.SOCKET_TRANSPORTS,
    });
    this._redisAdapter = ioRedis(Env.REDIS_URL);
    this._io.adapter(this._redisAdapter);
    this.init();
  }

  /**
   * Express application
   * @returns {e.Express}
   */
  public get app(): Express {
    return this._app;
  }

  /**
   * Http server
   * @return {module:http.Server}
   */
  public get server(): http.Server {
    return this._server;
  }

  /**
   * Socket.io
   */
  public get io(): io.Server {
    return this._io;
  }

  /**
   * Socket.io Redis adapter
   */
  public get redisAdapter(): ioRedis.RedisAdapter {
    return this._redisAdapter;
  }

  /**
   * Socket.io API namespace
   * @return {SocketIO.Namespace}
   */
  public get nsp(): io.Namespace {
    return this.io.of(Const.API_MOUNT_POINT);
  }

  /**
   * Close all connections
   * @returns {Promise<void>}
   */
  public async close() {
    await util.promisify((callback) => this.server.close(callback))();
    await util.promisify((callback) => this.io.close(() => callback(null, {})))();
    await RedisClient.close(this.redisAdapter.pubClient);
    await RedisClient.close(this.redisAdapter.subClient);
  }

  /**
   * Listen
   * @throws Error
   */
  public async listen(): Promise<void> {
    await util.promisify((callback) => this.server.listen(Env.PORT, Env.HOST, callback))();
  }

  private init() {
    this.initApp();
    this.initIO();
  }

  private initApp() {
    this.app.use(ResponseChain.middleware());

    if (Const.STAGING) {
      this.app.use(morgan("tiny"));
    }

    this.app.use(helmet());

    this.app.use(express.static(path.join(baseDir, "public", "dist")));

    this.app.use(cors({
      origin(origin, callback) {
        callback(null, Env.CORS_WHITELIST.length === 0 || Env.CORS_WHITELIST.indexOf(origin) !== -1);
      },
    }));

    this.app.use(compression());
    this.app.use(bearerToken());

    this.app.use(bodyParser.json({
      limit: Env.EXPRESS_BODY_PARSER_LIMIT_JSON,
    }));
    this.app.use(bodyParser.raw({
      limit: Env.EXPRESS_BODY_PARSER_LIMIT_RAW,
    }));

    this.app.use("/", rootRoute);

    this.app.use(ResponseChain.errorHandlerMiddleware);
  }

  private initIO() {
    this.nsp.use(Auth.authIO);
    this.nsp.on("connection", (socket) => {
      socket.join("lots");
    });
  }
}

import rootRoute from "../routes/index";
