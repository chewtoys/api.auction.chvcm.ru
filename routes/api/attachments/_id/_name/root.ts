import {Router} from "express";

import $delete from "./root-delete";
import $get from "./root-get";
import $put from "./root-put";

const router = Router({
  mergeParams: true,
});
export default router;

router.get("/", $get);
router.put("/", $put);
router.delete("/", $delete);
