// src/app/features/api/conversations.ts
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/* 新增對話 */
type conversation = {
  role: string;
  content: string;
};

export const postConversation = async (payload: conversation) => {
  console.log(baseUrl);
  try {
    const response = await axios.post(`${baseUrl}/api/conversations`, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting conversation:", error);
    throw error;
  }
};
