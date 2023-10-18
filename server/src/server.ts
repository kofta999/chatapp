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
  socket.on("joinRooms", (roomIds) => {
    roomIds.forEach((room: string) => {
      console.log("Joined room " + room);
      socket.join(room);
    });
  });

  socket.on("sendMessage", ({ message, roomId }) => {
    socket.to(roomId).emit("receiveMessage", message);
    console.log("received message " + message.content);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
