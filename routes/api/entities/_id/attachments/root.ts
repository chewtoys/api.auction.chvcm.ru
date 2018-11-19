import {Router} from "express";

import $get from "./root-get";

const router = Router({
  mergeParams: true,
});
export default router;

router.get("/", $get);
