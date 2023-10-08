import app from "./app";
import { connect } from "mongoose";
import { getIO, initIO } from "./util/socket";

await connect(process.env.DATABASE_URI!);
const server = app.listen(3000, () => console.log("Connected on port 3000"));
initIO(server).on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (data) => console.log(data));
});
