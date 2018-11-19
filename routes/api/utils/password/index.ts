import {Router} from "express";

const router = Router();
export default router;

import check from "./check";
import reset from "./reset";

router.use("/check", check);
router.use("/reset", reset);
