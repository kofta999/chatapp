import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import * as chatsController from "../controllers/chats";

const router = Router();

router.post("/:chatId", isAuth, chatsController.sendMessage);
router.get("/:chatId", isAuth, chatsController.getMessages);
router.post("/", isAuth, chatsController.createChat);
router.get("/", isAuth, chatsController.getChats);

export default router;
