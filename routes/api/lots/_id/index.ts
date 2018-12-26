import {Router} from "express";

import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use("/", root);
