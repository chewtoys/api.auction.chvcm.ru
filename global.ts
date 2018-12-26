import * as path from "path";

import * as appModulePath from "app-module-path";
import * as dotenv from "dotenv";
import * as pkgDir from "pkg-dir";

appModulePath.addPath(__dirname);

export const baseDir = pkgDir.sync(__dirname) as string;

dotenv.config({
  path: path.join(baseDir, ".env"),
});
