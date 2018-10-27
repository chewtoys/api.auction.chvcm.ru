import {Router} from "express";

import {Const} from "src";

const router = Router();
export default router;

import api from "./api";

router.use(Const.API_MOUNT_POINT, api);
