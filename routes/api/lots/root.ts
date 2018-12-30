import {Router} from "express";

const router = Router();
export default router;

import $get from "./root-get";
import $post from "./root-post";

router.get("/", $get);
router.post("/", $post);
