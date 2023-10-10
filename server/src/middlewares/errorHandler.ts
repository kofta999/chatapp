import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const response: CustomResponse = {
    success: false,
    status_message: error.message,
    data: null,
  };
  res.status(error.statusCode).json(response);
};
