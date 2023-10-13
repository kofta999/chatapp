import { RequestHandler } from "express";
import { Chat } from "../models/chat";
import { ChatMessage } from "../models/chatMessage";
import { CustomResponse, CustomError } from "../../types";

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
  const chats = await Chat.find({ participants: { $in: [userId] } })
    .populate("participants", "_id username")
    .populate({
      path: "lastMessage",
      select: "content sender updatedAt",
      populate: {
        path: "sender",
        model: "User",
        select: "_id username",
      },
    });

  const response: CustomResponse = {
    success: true,
    status_message: "Fetched all chats for user",
    data: chats,
  };
  console.log(chats[0]);
  res.status(200).json(response);
};

export const getMessages: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { chatId } = req.params;
  const chatMessages = await ChatMessage.find({ chat: chatId }).populate(
    "sender",
    "_id username"
  );
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
  try {
    await chatMessage.save();
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: chatMessage,
    });
    const message = await chatMessage.populate("sender", "_id, username");
    const response: CustomResponse = {
      success: true,
      status_message: "Saved message",
      data: message,
    };
    res.status(201).json(response);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
