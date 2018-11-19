import {ObjectUnit, PgBigSerialUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";

import {Auth} from "src";

import paramId from "./param_id";
import root from "./root";
import translations from "./translations";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(Auth.requireModerator, new RequestValidator({
  params: {
    Unit: ObjectUnit,
    payload: {
      id: {
        Unit: PgBigSerialUnit,
      },
    },
  },
}).middleware, paramId);

router.use("/translations", translations);
router.use("/", root);
