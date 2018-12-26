import {Router} from "express";

import {Const} from "src";

import api from "./api";

const router = Router();
export default router;

router.use(Const.API_MOUNT_POINT, api);
