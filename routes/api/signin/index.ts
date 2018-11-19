import {Router} from "express";

import root from "./root";

const router = Router();
export default router;

router.use("/", root);
