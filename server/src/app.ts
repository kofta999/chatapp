import express from "express";
import authRouter from "./routes/auth";
import chatMessagesRouter from "./routes/chatMessages";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", authRouter);
app.use("/messages", chatMessagesRouter);
app.use(errorHandler);

export default app;