import express from "express";
import session from "express-session";
import apiRoutes from "./routes/index.js";
import cors from "cors";
const app = express();
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

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
