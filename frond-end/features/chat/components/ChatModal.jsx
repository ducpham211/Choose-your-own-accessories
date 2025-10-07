// /src/features/chat/components/ChatModal.jsx
import { ChatPage } from "../pages/ChatPage";

export const ChatModal = ({
  isOpen,
  onClose,
  currentUserId,
  currentUserName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <ChatPage
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      </div>
    </div>
  );
};
//ChatModal.jsx
