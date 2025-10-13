import express from "express";
import session from "express-session";
import { createServer } from "http";
import apiRoutes from "./routes/index.js";
import cors from "cors";
import { initSocket } from "./config/socket.js";
import axios from "axios";
import crypto from "crypto";
const app = express();
const server = createServer(app);
initSocket(server);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

//
app.use("/api", apiRoutes);

server.listen(3000, () => {
  // Sử dụng server.listen
  console.log("Server running on port 3000");
});
