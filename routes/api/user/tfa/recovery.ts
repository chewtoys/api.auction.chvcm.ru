import {Router} from "express";

import $put from "./recovery-put";

const router = Router();
export default router;

router.put("/", $put);
