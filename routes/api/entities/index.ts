import {Router} from "express";

import _id from "./_id";
import root from "./root";

const router = Router();
export default router;

router.use("/:id", _id);
router.use("/", root);
