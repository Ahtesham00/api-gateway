import apiClient from "../utils/apiClient";

// Save settings endpoint
export const saveConfigurations = async (payload) => {
  const response = await apiClient.post("/chatbot-configs", payload);
  return response.data;
};
