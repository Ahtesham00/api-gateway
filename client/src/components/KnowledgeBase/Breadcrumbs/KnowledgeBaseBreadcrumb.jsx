import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  List,
  Spin,
  Empty,
  message,
  Modal,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import {
  HomeOutlined,
  PlusOutlined,
  DatabaseOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  getKnowledgeBases,
  createKnowledgeBase,
  deleteKnowledgeBase,
} from "../../../api/knowledgeBaseApi";

const KnowledgeBaseBreadcrumb = ({ onNavigateToKnowledgeBase }) => {
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newKnowledgeBaseName, setNewKnowledgeBaseName] = useState("");
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState(null);

  // Fetch knowledge bases
  const fetchKnowledgeBases = async () => {
    try {
      setLoading(true);
      const data = await getKnowledgeBases();
      if (data.success) {
        setKnowledgeBases(data.data || []);
      } else {
        message.error("Failed to fetch knowledge bases");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error fetching knowledge bases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgeBases();
  }, []);

  // Create knowledge base
  const handleCreateKnowledgeBase = async () => {
    if (!newKnowledgeBaseName.trim()) {
      message.warning("Knowledge base name cannot be empty!");
      return;
    }

    try {
      const data = await createKnowledgeBase(newKnowledgeBaseName);
      if (data.success) {
        message.success(data.message);
        setIsModalVisible(false);
        setNewKnowledgeBaseName("");
        fetchKnowledgeBases(); // Refresh
      } else {
        message.error(data.message || "Failed to create knowledge base.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error creating knowledge base");
    }
  };

  // Delete knowledge base
  const handleDeleteKnowledgeBase = async () => {
    try {
      const data = await deleteKnowledgeBase(selectedKnowledgeBase);
      if (data.success) {
        message.success(data.message);
        setIsDeleteModalVisible(false);
        fetchKnowledgeBases(); // Refresh
      } else {
        message.error(data.message || "Failed to delete knowledge base.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error deleting knowledge base");
    }
  };

  const showDeleteModal = (knowledgeBaseName) => {
    setSelectedKnowledgeBase(knowledgeBaseName);
    setIsDeleteModalVisible(true);
  };

  // Dropdown menu for folder options
  const moreOptionsMenu = (item) => (
    <Menu>
      <Menu.Item
        onClick={(e) => {
          e.domEvent.stopPropagation(); // Stop propagation
          showDeleteModal(item.knowledge_base_name);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          separator=">"
          style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
        >
          <Breadcrumb.Item>
            <HomeOutlined style={{ marginRight: "5px" }} /> Knowledge Bases
          </Breadcrumb.Item>
        </Breadcrumb>
        {knowledgeBases.length !== 0 && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add New
          </Button>
        )}
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Full height of the parent container
          }}
        >
          <Spin tip="Loading Knowledge Base..." />
        </div>
      ) : knowledgeBases.length === 0 ? (
        <Empty
          description={
            <div>
              <p>No knowledge bases found</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Add New
              </Button>
            </div>
          }
          style={{ marginTop: "20px" }}
        />
      ) : (
        <>
          {/* Column Headers */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              padding: "10px 0",
              borderBottom: "2px solid #f0f0f0",
            }}
          >
            <div style={{ flex: 2 }}>Name</div>
            <div style={{ flex: 1, textAlign: "center" }}>Time</div>
            <div style={{ flex: 0.2, textAlign: "right" }}> </div>
          </div>

          {/* List of Knowledge Bases */}
          <List
            dataSource={knowledgeBases}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                onClick={() => onNavigateToKnowledgeBase(item)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    icon={<DatabaseOutlined />}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ fontWeight: "500" }}>
                    {item.knowledge_base_name}
                  </span>
                </div>
                <div style={{ flex: 1, textAlign: "center", color: "#888" }}>
                  {new Date(item.timestamp || Date.now()).toLocaleDateString()}
                </div>
                <div style={{ flex: 0.2, textAlign: "right" }}>
                  <Dropdown overlay={moreOptionsMenu(item)} trigger={["click"]}>
                    <Tooltip title="More Options">
                      <Button
                        type="text"
                        icon={<EllipsisOutlined />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Tooltip>
                  </Dropdown>
                </div>
              </List.Item>
            )}
          />
        </>
      )}

      <Modal
        title="Create New Knowledge Base"
        visible={isModalVisible}
        onOk={handleCreateKnowledgeBase}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter knowledge base name"
          value={newKnowledgeBaseName}
          onChange={(e) => setNewKnowledgeBaseName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Delete Knowledge Base"
        visible={isDeleteModalVisible}
        onOk={handleDeleteKnowledgeBase}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete "{selectedKnowledgeBase}"?</p>
      </Modal>
    </>
  );
};

export default KnowledgeBaseBreadcrumb;
