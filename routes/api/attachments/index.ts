import {Router} from "express";

import {Auth} from "src";

import _id from "./_id";

const router = Router();
export default router;

router.use(Auth.auth);

router.use("/:id", _id);
