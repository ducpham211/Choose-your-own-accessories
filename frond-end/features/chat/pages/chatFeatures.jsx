// /src/features/chat/components/ChatFeature.jsx
import React, { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { ChatWindow } from "../components/ChatWindow"; // 👈 Đảm bảo đường dẫn đúng

export const ChatFeature = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const currentUserId = user.id;
  const currentUserName =
    user.user_metadata?.full_name || user.email.split("@")[0] || "User";

  return (
    <>
      {/* Nút chat nổi */}
      {!isOpen && (
        <button className="chat-float-button" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Modal chat - CHỈ HIỂN THỊ KHI isOpen = true */}
      {isOpen && (
        <div className="chat-modal-overlay">
          <div className="chat-modal">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            <ChatWindow
              currentUserId={currentUserId}
              currentUserName={currentUserName}
            />
          </div>
        </div>
      )}
    </>
  );
};
//ChatFeature.jsx
