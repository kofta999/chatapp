import { Server } from "socket.io";

let io: Server;
export function initIO(server: any) {
  io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initalized");
  }
  return io;
}
