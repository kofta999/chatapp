import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import * as searchController from "../controllers/search";

const router = Router();

router.post("/username", isAuth, searchController.searchUsername)

export default router;