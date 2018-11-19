import {Router} from "express";

import password from "./password";

import limits from "./limits";
import ping from "./ping";

const router = Router();
export default router;

router.use("/password", password);

router.use("/limits", limits);
router.use("/ping", ping);
