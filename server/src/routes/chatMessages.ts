import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import * as chatMessagesController from "../controllers/chatMessages";

const router = Router();

router.post("/", isAuth, chatMessagesController.sendMessage);
router.get("/", isAuth, chatMessagesController.getMessages)

export default router;