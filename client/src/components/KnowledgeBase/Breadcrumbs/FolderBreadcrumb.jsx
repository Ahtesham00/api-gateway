import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  List,
  Spin,
  Empty,
  message,
  Button,
  Modal,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import {
  FolderOutlined,
  HomeOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  getFolders,
  createFolder,
  deleteFolder,
} from "../../../api/knowledgeBaseApi";

const FolderBreadcrumb = ({
  knowledgeBaseName,
  onBack,
  onNavigateToFolder,
}) => {
  const [folders, setFolders] = useState([]); // Folder list
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for adding folders
  const [newFolderName, setNewFolderName] = useState(""); // Input field for new folder name
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null); // Folder selected for deletion

  // Fetch folders
  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await getFolders(knowledgeBaseName);
      if (response.success) {
        setFolders(response.data.folders || []);
      } else {
        message.error("Failed to fetch folders");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      message.error("Error fetching folders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [knowledgeBaseName]);

  // Handle folder creation
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      message.warning("Folder name cannot be empty!");
      return;
    }

    try {
      const response = await createFolder(knowledgeBaseName, newFolderName);
      if (response.success) {
        message.success(response.message);
        setIsModalVisible(false);
        setNewFolderName("");
        fetchFolders();
      } else {
        message.error(response.message || "Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      message.error("Error creating folder");
    }
  };

  // Handle folder deletion
  const handleDeleteFolder = async () => {
    try {
      const response = await deleteFolder(knowledgeBaseName, folderToDelete);
      if (response.success) {
        message.success(response.message);
        setDeleteModalVisible(false);
        fetchFolders();
      } else {
        message.error(response.message || "Failed to delete folder");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
      message.error("Error deleting folder");
    }
  };

  // Dropdown menu for folder options
  const folderOptionsMenu = (folderName) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setFolderToDelete(folderName);
          setDeleteModalVisible(true);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Header with Breadcrumb and Add Folder Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Breadcrumb
          separator=">"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          <Breadcrumb.Item
            onClick={onBack}
            style={{ cursor: "pointer", color: "#1890ff" }}
          >
            <HomeOutlined style={{ marginRight: "5px" }} /> Knowledge Bases
          </Breadcrumb.Item>
          <Breadcrumb.Item>{knowledgeBaseName}</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          New Folder
        </Button>
      </div>

      {/* Loading or Folder List */}
      {loading ? (
        <Spin tip="Loading Folders..." />
      ) : folders.length === 0 ? (
        <Empty
          description={
            <div>
              <p>No folders found</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                New Folder
              </Button>
            </div>
          }
        />
      ) : (
        <>
          {/* Column Headers */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            <div style={{ flex: 2 }}>Name</div>
            <div style={{ flex: 0.2, textAlign: "right" }}></div>
          </div>

          {/* Folder List */}
          <List
            dataSource={folders}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                onClick={() => onNavigateToFolder(knowledgeBaseName, item.folder_name)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    icon={<FolderOutlined />}
                    style={{ marginRight: "10px" }}
                  />
                  <span>{item.folder_name}</span>
                </div>
                <Dropdown
                  overlay={folderOptionsMenu(item.folder_name)}
                  trigger={["click"]}
                >
                  <Button type="text" icon={<EllipsisOutlined />} />
                </Dropdown>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Create Folder Modal */}
      <Modal
        title="Create New Folder"
        visible={isModalVisible}
        onOk={handleCreateFolder}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>

      {/* Delete Folder Confirmation Modal */}
      <Modal
        title="Delete Folder"
        visible={deleteModalVisible}
        onOk={handleDeleteFolder}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete the folder "{folderToDelete}"?</p>
      </Modal>
    </>
  );
};

export default FolderBreadcrumb;
