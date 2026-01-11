import express from "express";
import session from "express-session";
import { createServer } from "http";
import apiRoutes from "./routes/index.js";
import cors from "cors";
import { initSocket } from "./config/socket.js";
// import axios from "axios"; // Nếu chưa dùng thì có thể comment lại cho gọn
// import crypto from "crypto";

const app = express();
const server = createServer(app);

// 1. Cấu hình CORS (Gộp lại làm 1, bỏ cái thừa đi)
app.use(
  cors({
    // Cho phép cả localhost (để test local) và sau này thêm domain Vercel
    origin: ["http://localhost:5173", "http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 2. Cấu hình Session
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax", // Hoặc 'none' nếu frontend và backend khác domain (cần secure: true)
      secure: false, // Đổi thành true nếu chạy https (Render có https)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// 3. Route kiểm tra sức khỏe (Health Check) - QUAN TRỌNG VỚI RENDER
// Render sẽ ping vào đây để xem server sống chưa
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Routes API
app.use("/api", apiRoutes);

// Khởi tạo Socket
initSocket(server);

// 4. SỬA PORT (QUAN TRỌNG NHẤT)
// Lấy PORT từ Render, nếu không có thì mới dùng 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
