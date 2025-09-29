import { supabase } from "../config/supabase.js";
import { getUserById } from "../model/userModel.js";
export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user)
      return res.status(401).json({ error: "Invalid or expired token" });

    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser(user.id, user.email);
    }
    res.json({
      user: { id: dbUser.id, email: dbUser.email, role: dbUser.role },
    });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};
