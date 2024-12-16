import React, { useState } from "react";
import { Button, Typography, Space, Input, message, Empty } from "antd";
import apiClient from "../utils/apiClient";
import { useDispatch } from "react-redux";
import { setTokens } from "../store";

const { Title, Text } = Typography;

const KnowledgeBasePanel = () => {
  const [folders, setFolders] = useState([]); // Folder list
  const [loading, setLoading] = useState(false); // Loading state
  const [newFolderName, setNewFolderName] = useState(""); // Input value for new folder
  const dispatch = useDispatch();

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      message.warning("Folder name cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const payload = { knowledge_base_name: newFolderName };
      const response = await apiClient.post("/v1/knowledge_base", payload);

      if (response.data.success) {
        message.success(response.data.message);
        setFolders((prev) => [...prev, { name: newFolderName }]);
        setNewFolderName("");
      } else {
        message.error(response.data.message || "Folder creation failed.");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      message.error("Failed to create folder. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        padding: "24px",
        width: "100%",
        backgroundColor: "#f7f9fc",
        borderRadius: "8px",
      }}
    >
      <Title level={3}>Knowledge Base</Title>
      {folders.length === 0 ? (
        <Empty description="No folders yet. Create one to get started!" />
      ) : (
        <div>
          {folders.map((folder, index) => (
            <Text key={index} style={{ display: "block", marginBottom: "8px" }}>
              {folder.name}
            </Text>
          ))}
        </div>
      )}

      <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
        <Input
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={handleCreateFolder}
          loading={loading}
          style={{ backgroundColor: "#6E54B5" }}
        >
          Create Folder
        </Button>
      </Space>
    </Space>
  );
};

export default KnowledgeBasePanel;
