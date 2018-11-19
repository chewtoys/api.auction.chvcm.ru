import {Router} from "express";

import {Auth} from "src";

import _id from "./_id";
import root from "./root";

const router = Router();
export default router;

router.use(Auth.auth);
router.use(Auth.requireAdmin);

router.use("/:id", _id);
router.use("/", root);
