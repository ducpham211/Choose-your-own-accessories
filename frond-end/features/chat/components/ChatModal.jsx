// /src/features/chat/components/ChatModal.jsx
import { ChatFeature } from "../chatFeatures";

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
        <ChatFeature
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      </div>
    </div>
  );
};
//ChatModal.jsx
