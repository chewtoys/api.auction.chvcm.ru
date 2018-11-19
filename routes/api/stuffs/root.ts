import {Router} from "express";

import $get from "./root-get";
import $post from "./root-post";

const router = Router();
export default router;

router.get("/", $get);
router.post("/", $post);
