// /backend/model/messageModel.js

import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";
// messageModel.js
export const createMessage = async (senderId, message, accessToken) => {
  console.log("📥 [DB] createMessage called with:", {
    senderId,
    message,
  });

  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: senderId,
        message: message,
      })
      .select()
      .single();

    if (error) {
      console.error("❌ [DB] Insert error:", error);
      throw new Error(error.message);
    }

    console.log("✅ [DB] Message inserted:", data);
    return data;
  } catch (error) {
    console.error("💥 [DB] createMessage failed:", error);
    throw new Error(`Failed to create message: ${error.message}`);
  }
};

// messageModel.js

export const getChatHistory = async () => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
      *,
      sender:users!sender_id (email)
    `
      )
      .order("created_at", { ascending: true });
    console.log("messages fetched:", data);
    if (error) throw error;

    return data.map((msg) => ({
      id: msg.id,
      senderId: msg.sender_id,
      message: msg.message,
      senderName: msg.sender?.email?.split("@")[0] || "Anonymous",
      createdAt: msg.created_at,
    }));
  } catch (error) {
    console.error("💥 getChatHistory failed:", error);
    throw new Error(`Failed to get chat history: ${error.message || error}`);
  }
};
//chatModel.js
