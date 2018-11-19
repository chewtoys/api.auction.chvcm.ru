import {
  ObjectUnit,
  PgEnumUnit,
  PgEnumUnitCacheMemory,
  PgEnumUnitClient,
  RequestValidator,
} from "@alendo/express-req-validator";

import {Router} from "express";

import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(new RequestValidator({
  params: {
    Unit: ObjectUnit,
    payload: {
      code: {
        Unit: PgEnumUnit,
        payload: {
          cache: PgEnumUnitCacheMemory,
          client: PgEnumUnitClient,
          enumName: "LANGUAGE_CODE",
        },
      },
    },
  },
}).middleware);

router.use("/", root);
