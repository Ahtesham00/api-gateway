import apiClient from "../utils/apiClient";

// Fetch all knowledge bases
export const getKnowledgeBases = async () => {
  const response = await apiClient.get("/knowledge_base");
  return response.data;
};

// Create a new knowledge base
export const createKnowledgeBase = async (knowledgeBaseName) => {
  const payload = { knowledge_base_name: knowledgeBaseName };
  const response = await apiClient.post("/knowledge_base", payload);
  return response.data;
};

// Delete a knowledge base
export const deleteKnowledgeBase = async (knowledgeBaseName) => {
  const payload = { knowledge_base_name: knowledgeBaseName };
  const response = await apiClient.post("/delete_knowledge_base", payload);
  return response.data;
};


//................................................................


// Fetch folders for a specific knowledge base
export const getFolders = async (knowledgeBaseName) => {
  const payload = { knowledge_base_name: knowledgeBaseName };
  const response = await apiClient.post("/knowledge_base/folders", payload);
  return response.data;
};

// Create a new folder in a knowledge base
export const createFolder = async (knowledgeBaseName, folderName) => {
  const payload = { knowledge_base_name: knowledgeBaseName, folder_name: folderName };
  const response = await apiClient.post("/knowledge_base/create_folder", payload);
  return response.data;
};

// Delete a folder
export const deleteFolder = async (knowledgeBaseName, folderName) => {
  const payload = { knowledge_base_name: knowledgeBaseName, folder_name: folderName };
  const response = await apiClient.post("/delete_folder", payload);
  return response.data;
};


//....................................................................

// Fetch files for a folder
export const getFiles = async (knowledgeBaseName, folderName) => {
  const payload = { knowledge_base_name: knowledgeBaseName, folder_name: folderName };
  const response = await apiClient.post("/knowledge_base/folders", payload);
  return response.data;
};

// Upload file to a folder
export const uploadFile = async (formData) => {
  const response = await apiClient.post("/upload_area_file", formData);
  return response.data;
};

// Delete a file
export const deleteFile = async (payload) => {
  const response = await apiClient.post("/delete_file", payload);
  return response.data;
};

// Download a file
export const downloadFile = async (payload) => {
  const response = await apiClient.post("/download_file", payload, {
    responseType: "blob",
  });
  return response.data;
};
