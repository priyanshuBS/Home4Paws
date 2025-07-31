import { Server } from "socket.io";
import { Message } from "../models/message.model.js";
import { ChatRoom } from "../models/chatRoom.model.js";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Custom property to track current user
    socket.userId = socket.handshake.auth?.userId;

    socket.on("chat:join", async (roomId) => {
      const room = await ChatRoom.findById(roomId);

      if (
        !room ||
        ![room.owner.toString(), room.customer.toString()].includes(
          socket.userId
        )
      ) {
        return socket.emit("chat:error", "Unauthorized to join this room");
      }

      socket.join(roomId);
      socket.emit("chat:joined", roomId);
    });

    socket.on("chat:send", async ({ roomId, content }) => {
      if (!content || !roomId) return;

      const room = await ChatRoom.findById(roomId);
      if (
        !room ||
        ![room.owner.toString(), room.customer.toString()].includes(
          socket.userId
        )
      ) {
        return socket.emit("chat:error", "Unauthorized to send message");
      }

      const message = await Message.create({
        chatRoom: roomId,
        sender: socket.userId,
        content,
      });

      io.to(roomId).emit("chat:message", message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

export default initSocket;
