// /src/features/chat/components/ChatWindow.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { fetchChatHistory } from "../services/chatApi";
import { supabase } from "../../../src/supabaseClient";

const SOCKET_URL = "http://localhost:3000";

export const ChatWindow = ({ currentUserId, currentUserName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!input.trim() || !socketRef.current) return;

      // Trong handleSubmit
      socketRef.current.emit("send-message", {
        message: input.trim(),
        senderId: currentUserId, // 👈 thêm để biết ai gửi
      });
      setInput("");
    },
    [input]
  );

  useEffect(() => {
    const initSocket = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error || !session?.access_token) {
          alert("Vui lòng đăng nhập để chat.");
          setLoading(false);
          return;
        }

        // 👇 1. Fetch history TRƯỚC khi kết nối socket
        const history = await fetchChatHistory();
        setMessages(history || []);

        // 👇 2. Kết nối socket SAU khi đã có history
        const socket = io(SOCKET_URL, {
          auth: { token: session.access_token },
          transports: ["websocket"],
        });

        socketRef.current = socket;
        socket.emit("join-chat");

        // 👇 3. Chỉ lắng nghe tin nhắn MỚI từ socket
        socket.on("receive-message", (msg) => {
          setMessages((prev) => {
            // 👉 Tránh duplicate: kiểm tra xem msg.id đã tồn tại chưa
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        });

        socket.on("error", (err) => {
          console.error("Socket error:", err);
          alert(`Lỗi: ${err.message}`);
        });
      } catch (err) {
        console.error("Init socket failed:", err);
      } finally {
        setLoading(false);
      }

      // Cleanup
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    };

    initSocket();
  }, []); // 👈 Dependency array trống: chỉ chạy 1 lần

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Hỗ trợ chung</h3>
      </div>

      <div className="messages-container">
        {loading && <p className="loading-text">Đang tải...</p>}
        {!loading && messages.length === 0 && (
          <p className="no-messages">Chưa có tin nhắn nào.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.senderId === currentUserId ? "sent" : "received"
            }`}
          >
            <div className="message-sender">{msg.senderName || "Ẩn danh"}:</div>
            <div className="message-content">{msg.message}</div>
            <div className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="message-input"
          disabled={!socketRef.current}
        />
        <button type="submit" className="send-button" disabled={!input.trim()}>
          Gửi
        </button>
      </form>
    </div>
  );
};
// ChatWindow.jsx
