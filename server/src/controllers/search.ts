import { RequestHandler } from "express";
import { User } from "../models/user";

export const searchUsername: RequestHandler = async (req, res, next) => {
  const { userId } = req;
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }, "_id");
    if (!user) {
      console.log("no user");
      const error = new Error("User not found") as CustomError;
      error.statusCode = 404;
      throw error;
    }
    if (userId === user._id.toString()) {
      const error = new Error("You can't add yourself to a chat") as CustomError;
      error.statusCode = 403;
      throw error
    }
    const response: CustomResponse = {
      success: true,
      status_message: "Found user",
      data: user,
    };
    res.status(200).json(response);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
