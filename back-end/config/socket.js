import { Server } from "socket.io";
import { supabase } from "./supabase.js";
import { createMessage } from "../model/chatModel.js";
const onlineUsers = new Map(); // Map userId -> socket, private trong module

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Authorization"],
      allowEIO3: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error: No token"));

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);
      if (error || !user) return next(new Error("Invalid token"));
      socket.userId = user.id;
      next();
    } catch (err) {
      next(new Error("Auth failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);
    onlineUsers.set(socket.userId, socket);

    socket.on("join-chat", () => {
      socket.join("support-room");
      console.log(`${socket.userId} joined support-room`);
    });
    //     2. Quản lý Phòng (Room) 🚪
    // Đây là ứng dụng thực tế của khái niệm "Room" bạn đã nêu trong báo cáo .

    // socket.on("join-chat", () => { ... }): Khi client phát sự kiện join-chat.

    // socket.join("support-room");: Server sẽ thêm socket (client) này vào một phòng có tên là "support-room".

    socket.on("send-message", async ({ message }) => {
      if (!message || typeof message !== "string" || !message.trim()) {
        return socket.emit("error", { message: "Tin nhắn không hợp lệ" });
      }

      try {
        const senderId = socket.userId;
        const token = socket.handshake.auth.token;

        const savedMessage = await createMessage(
          senderId,
          message.trim(),
          token
        );

        const payload = {
          id: savedMessage.id,
          senderId,
          message: savedMessage.message,
          senderName: "User", // hoặc lấy từ DB
          createdAt: savedMessage.created_at,
        };

        io.to("support-room").emit("receive-message", payload); // gửi tin nhắn đến những người ở trong phòng chat
      } catch (err) {
        console.error("Send message error:", err);
        socket.emit("error", { message: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
      onlineUsers.delete(socket.userId);
    });
  });

  return io;
};
//socket.js
