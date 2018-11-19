import {Router} from "express";

import $post from "./check-post";

const router = Router();
export default router;

router.post("/", $post);
