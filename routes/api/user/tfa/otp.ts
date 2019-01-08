import {Router} from "express";

import $post from "./otp-post";
import $put from "./otp-put";

const router = Router();
export default router;

router.post("/", $post);
router.put("/", $put);
