import {ObjectUnit, PgBigSerialUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";

import _name from "./_name";
import paramId from "./param_id";
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
}).middleware, paramId);

router.use("/:name", _name);
router.use("/", root);
