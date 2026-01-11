import { Server } from "socket.io";
import { supabase } from "./supabase.js";
import { createMessage } from "../model/chatModel.js";

const onlineUsers = new Map(); // Map userId -> socket

export const initSocket = (server) => {
  // 1. CẤU HÌNH DANH SÁCH ĐƯỢC PHÉP KẾT NỐI (CORS)
  const allowedOrigins = [
    "http://localhost:5173", // Cho phép Frontend chạy local (Vite)
    "http://localhost:3000", // Cho phép test local
    process.env.CLIENT_URL, // Cho phép Frontend trên Vercel (Lấy từ biến môi trường)
  ].filter(Boolean); // Lọc bỏ các giá trị rỗng (ví dụ khi chưa setup CLIENT_URL)

  const io = new Server(server, {
    cors: {
      // Nếu có CLIENT_URL thì dùng danh sách trên, nếu không thì tạm cho phép tất cả (*)
      origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Authorization"],
    },
    // Thêm transports để kết nối ổn định hơn trên môi trường mạng
    transports: ["websocket", "polling"],
  });

  // 2. MIDDLEWARE XÁC THỰC (AUTH)
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error: No token"));

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) return next(new Error("Invalid token"));

      socket.userId = user.id; // Lưu ID user vào socket để dùng sau này
      next();
    } catch (err) {
      next(new Error("Auth failed"));
    }
  });

  // 3. XỬ LÝ KẾT NỐI CHÍNH
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);
    onlineUsers.set(socket.userId, socket);

    // Sự kiện tham gia phòng chat hỗ trợ
    socket.on("join-chat", () => {
      socket.join("support-room");
      console.log(`${socket.userId} joined support-room`);
    });

    // Sự kiện gửi tin nhắn
    socket.on("send-message", async ({ message }) => {
      if (!message || typeof message !== "string" || !message.trim()) {
        return socket.emit("error", { message: "Tin nhắn không hợp lệ" });
      }

      try {
        const senderId = socket.userId;
        const token = socket.handshake.auth.token;

        // Lưu tin nhắn vào Database
        const savedMessage = await createMessage(
          senderId,
          message.trim(),
          token
        );

        // Tạo gói dữ liệu để gửi lại cho Client
        const payload = {
          id: savedMessage.id,
          senderId,
          message: savedMessage.message,
          senderName: "User", // Có thể query thêm tên user nếu cần
          createdAt: savedMessage.created_at,
        };

        // Gửi tin nhắn cho tất cả mọi người trong phòng "support-room"
        io.to("support-room").emit("receive-message", payload);
      } catch (err) {
        console.error("Send message error:", err);
        socket.emit("error", { message: err.message });
      }
    });

    // Sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
      onlineUsers.delete(socket.userId);
    });
  });

  return io;
};
