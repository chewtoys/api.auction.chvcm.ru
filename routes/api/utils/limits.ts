import {Router} from "express";

import $get from "./limits-get";

const router = Router();
export default router;

router.get("/", $get);
