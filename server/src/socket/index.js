import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ roomId, sender, content }) => {
      try {
        const message = await Message.create({
          chatRoom: roomId,
          sender,
          content,
        });
        io.to(roomId).emit("newMessage", message);
      } catch (error) {
        console.error("Socket message error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

export default initSocket;
