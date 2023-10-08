import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import * as chatsController from "../controllers/chats";

const router = Router();

router.post("/", isAuth, chatsController.createChat);
router.get("/", isAuth, chatsController.getChats)

export default router;