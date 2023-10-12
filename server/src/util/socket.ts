import { Namespace, Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

let io: Server;
let chatNamespace: Namespace;
export function initIO(server: any) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://admin.socket.io"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  instrument(io, {
    auth: false,
    mode: "development",
  });
  return io;
}

export function initChatNamespace(io: Server) {
  chatNamespace = io.of("/chat");
  return chatNamespace;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
}

export function getChatNamespace() {
  if (!chatNamespace) {
    throw new Error("Chat namespace is not initialized");
  }
  return chatNamespace;
}
