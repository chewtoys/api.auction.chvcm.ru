import {Router} from "express";

import {Auth} from "src";

const router = Router();
export default router;

import _id from "./_id";
import root from "./root";

router.use(Auth.auth);

router.use("/:id", _id);
router.use("/", root);
