import app from "./app";
import { connect } from "mongoose";
import { initChatNamespace, initIO } from "./util/socket";

await connect(process.env.DATABASE_URI!);
const server = app.listen(3000, () => console.log("Connected on port 3000"));
const io = initIO(server);
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (data) => console.log(data));
});
initChatNamespace(io).on("connection", (socket) => {
  console.log("Client connected to chat namespace");
  socket.on("getMessages", (roomId) => {
    console.log("Joined room " + roomId);
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ message, roomId }) => {
    console.log("received message");
    socket.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
