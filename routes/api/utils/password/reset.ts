import {Router} from "express";

import $get from "./reset-get";
import $post from "./reset-post";

const router = Router();
export default router;

router.get("/", $get);
router.post("/", $post);
