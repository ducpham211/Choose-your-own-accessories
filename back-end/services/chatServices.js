import { createMessage } from "../model/chatModel.js";
import { getChatHistory } from "../model/chatModel.js";
export const saveMessageAndPreparePayload = async (
  senderId,
  message,
  accessToken
) => {
  const savedMessage = await createMessage(senderId, message, accessToken);
  return {
    id: savedMessage.id,
    senderId,
    message: savedMessage.message,
    senderName: "User",
    createdAt: savedMessage.created_at,
  };
};

export const fetchChatHistory = async () => {
  return getChatHistory();
};
//chatServices.js
