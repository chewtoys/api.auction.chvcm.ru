import {Router} from "express";

import $post from "./root-post";
import $put from "./root-put";

const router = Router();
export default router;

router.post("/", $post);
router.put("/", $put);
