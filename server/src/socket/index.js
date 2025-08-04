import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Message } from "../models/message.model.js";
import { ChatRoom } from "../models/chatRoom.model.js";
import cookie from "cookie";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // Middleware to verify JWT in socket handshake
  io.use((socket, next) => {
    const parsedCookie = cookie.parse(socket.handshake.headers.cookie || "");
    console.log(parsedCookie);
    const token = parsedCookie.accessToken;

    if (!token) return next(new Error("Authentication token missing"));

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.userId = decoded._id;
      next();
    } catch (err) {
      return next(new Error("Invalid authentication token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id, "UserID:", socket.userId);

    // Join a specific chat room
    socket.on("chat:join", async (roomId) => {
      try {
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
      } catch (err) {
        console.error(err);
        socket.emit("chat:error", "Failed to join chat room");
      }
    });

    // Send a message
    socket.on("chat:send", async ({ roomId, content }) => {
      console.log("hello");
      if (!roomId || !content?.trim()) return;

      try {
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

        console.log(message);

        // Optional: Populate sender info for better frontend display
        const populatedMessage = await Message.findById(message._id).populate(
          "sender",
          "name avatar"
        );

        console.log(populatedMessage);

        io.to(roomId).emit("chat:message", populatedMessage);
      } catch (err) {
        console.error(err);
        socket.emit("chat:error", "Failed to send message");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

export default initSocket;
