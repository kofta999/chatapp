import { RequestHandler } from "express";
import { Chat } from "../models/chat";
import { ChatMessage } from "../models/chatMessage";
import { getChatNamespace } from "../util/socket";

export const createChat: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { name, isGroupChat, participants } = req.body;
  const chat = new Chat({
    name,
    participants,
    isGroupChat,
    admin: userId,
  });
  console.log(chat);
  await chat.save();
  const response: CustomResponse = {
    success: true,
    status_message: "Created chat",
    data: { ...chat.toJSON() },
  };
  res.status(200).json(response);
};

export const getChats: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const chats = await Chat.find({ participants: { $in: [userId] } }).populate(
    "participants",
    "_id username"
  );
  const response: CustomResponse = {
    success: true,
    status_message: "Fetched all chats for user",
    data: chats,
  };
  res.status(200).json(response);
};

export const getMessages: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { chatId } = req.params;
  const chatMessages = await ChatMessage.find({ chat: chatId });
  const response: CustomResponse = {
    success: true,
    status_message: "Fetched all messages",
    data: chatMessages,
  };
  res.status(200).json(response);
};

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
  const response: CustomResponse = {
    success: true,
    status_message: "Saved message",
    data: chatMessage,
  };
  res.status(201).json(response);
};
