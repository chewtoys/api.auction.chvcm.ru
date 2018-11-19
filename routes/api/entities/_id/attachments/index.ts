import {Router} from "express";

import _name from "./_name";
import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use("/:name", _name);
router.use("/", root);
