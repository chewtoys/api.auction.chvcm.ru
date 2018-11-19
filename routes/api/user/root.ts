import {Router} from "express";

import $get from "./root-get";
import $patch from "./root-patch";

const router = Router();
export default router;

router.get("/", $get);
router.patch("/", $patch);
