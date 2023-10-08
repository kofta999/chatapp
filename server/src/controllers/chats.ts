import { RequestHandler } from "express";
import { Chat } from "../models/chat";

export const createChat: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { name, isGroupChat } = req.body;
  const participants = JSON.parse(req.body.participants);
  const chat = new Chat({
    name,
    participants,
    isGroupChat,
    admin: userId,
  });
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
  const chats = await Chat.find({ participants: { $in: [userId] } });
  const response: CustomResponse = {
    success: true,
    status_message: "Fetched all chats for user",
    data: chats,
  };
  res.status(200).json(response);
};