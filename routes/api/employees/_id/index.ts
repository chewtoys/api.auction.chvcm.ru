import {ObjectUnit, PgBigSerialUnit, RequestValidator} from "@alendo/express-req-validator";

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
      id: {
        Unit: PgBigSerialUnit,
      },
    },
  },
}).middleware);

router.use("/", root);
