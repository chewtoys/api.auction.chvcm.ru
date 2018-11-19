import {ObjectUnit, PgBigSerialUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";

import {Auth} from "src";

import attachments from "./attachments";
import paramId from "./param_id";
import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(Auth.auth, new RequestValidator({
  params: {
    Unit: ObjectUnit,
    payload: {
      id: {
        Unit: PgBigSerialUnit,
      },
    },
  },
}).middleware, paramId);

router.use("/attachments", attachments);
router.use("/", root);
