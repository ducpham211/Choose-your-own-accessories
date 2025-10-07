// /src/features/chat/services/chatApi.jsx
import axios from "axios";
import { supabase } from "../../../src/supabaseClient";

export const fetchChatHistory = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session?.access_token) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      "http://localhost:3000/api/chat/messages",
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }
    );
    console.log("Fetched chat history:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    throw new Error("Failed to fetch chat history");
  }
};

// Hàm fetchContacts không còn cần thiết → có thể xóa
