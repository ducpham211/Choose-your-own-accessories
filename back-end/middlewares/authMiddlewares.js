import { supabase } from "../config/supabase.js";

export const getUserIdFromSession = async (req, res, next) => {
  try {
    // Lấy token từ header (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Gắn user ID vào request để dùng ở các phần sau
    req.userId = user.id;
    req.accessToken = token;
    // Sau dòng req.userId = user.id;
    const { data: userRole } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    console.log("UID from token:", user.id, "Role:", userRole?.role);
    next(); // Chuyển tiếp nếu thành công
  } catch (error) {
    console.error("Error in getUserIdFromSession:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//authMiddlewares
