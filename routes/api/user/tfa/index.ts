import {Router} from "express";

const router = Router();
export default router;

import otp from "./otp";
import recovery from "./recovery";

router.use("/otp", otp);
router.use("/recovery", recovery);
