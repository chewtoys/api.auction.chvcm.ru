import * as path from "path";

import {PgMigrate as SuperPgMigrate} from "@alendo/pg-migrate";

import {baseDir} from "../../global";
import {Sequelize} from "./sequelize";

/**
 * Umzug based pure SQL migration tool for PostgreSQL
 */
export class PgMigrate extends SuperPgMigrate {
  /**
   * Pure SQL migration tool for PostgreSQL constructor
   */
  public constructor() {
    super({
      client: Sequelize.instance as any, // TODO: remove "as any" when will be used normal types
      path: path.join(baseDir, "db"),
      tableName: `"public"."alendo-pg-migrate"`,
    });
  }
}
