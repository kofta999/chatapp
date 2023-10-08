import { RequestHandler } from "express";
import { ChatMessage } from "../models/chatMessage";
import { getIO } from "../util/socket";

// TODO:
//  Error Handling
//  Validation

export const sendMessage: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { content } = req.body;
  const { chatId } = req.params;
  const chatMessage = new ChatMessage({
    sender: userId,
    content,
    chat: chatId,
  });
  await chatMessage.save();
  getIO().emit(chatId, { ...chatMessage.toJSON() });
  console.log("message saved");
  res.status(201);
};

export const getMessages: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { chatId } = req.params;
  getIO().on(chatId, (socket) => {
    socket.join(chatId);
  });
  const chatMessages = await ChatMessage.find({ chat: chatId });
  const response: CustomResponse = {
    success: true,
    status_message: "Fetched all messages",
    data: chatMessages,
  };
  res.status(200).json(response);
};
