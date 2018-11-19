import {ObjectUnit, RequestValidator} from "@alendo/express-req-validator";

import {Router} from "express";

import {AttachmentNameUnit} from "src/index";

import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(new RequestValidator({
  params: {
    Unit: ObjectUnit,
    payload: {
      name: {
        Unit: AttachmentNameUnit,
      },
    },
  },
}).middleware);

router.use("/", root);
