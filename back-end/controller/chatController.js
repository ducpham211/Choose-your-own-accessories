import { supabase } from "../config/supabase.js";
import { fetchChatHistory } from "../services/chatServices.js";

export const handleGetChatHistory = async (req, res) => {
  try {
    const history = await fetchChatHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//chatController.js
