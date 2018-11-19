import {Router} from "express";

import {Auth} from "src";

import root from "./root";
import tfa from "./tfa";

const router = Router();
export default router;

router.use(Auth.auth);

router.use("/tfa", tfa);
router.use("/", root);
