import {Router} from "express";

import $put from "./otp-put";

const router = Router();
export default router;

router.put("/", $put);
