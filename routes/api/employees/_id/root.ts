import {Router} from "express";

import $patch from "./root-patch";

const router = Router({
  mergeParams: true,
});
export default router;

router.patch("/", $patch);
