import React, { useState } from "react";
import { Table, Tabs, Input, Modal, Empty, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeaderSection from "../components/ChatbotConfiguration/HeaderSection";
import { getColumns } from "../components/ChatbotConfiguration/tableColumns.jsx";
import { tableData } from "../components/ChatbotConfiguration/mockData.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/ChatbotManager.css";

const { Search } = Input;

const ComplianceDocuments = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState(tableData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState("");

  const navigate = useNavigate(); // Use navigate here

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleCreateChatbot = () => {
    if (newChatbotName.trim()) {
      setData([
        ...data,
        {
          key: Date.now(),
          name: newChatbotName,
          createdBy: "New User",
          creationDate: new Date().toLocaleDateString(),
          status: "Inactive",
        },
      ]);
      setIsModalVisible(false);
      setNewChatbotName("");
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "transparent",
        borderRadius: "8px",
      }}
    >
      {/* Header Section */}
      <HeaderSection showModal={showModal} data={data} />

      {/* Table or Empty State */}
      {data.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
            textAlign: "center",
          }}
        >
          <Empty description="No chatbots created yet. Get started by creating a new chatbot.">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              style={{ backgroundColor: "#6E54B5" }}
            >
              Create Chatbot
            </Button>
          </Empty>
        </div>
      ) : (
        <>
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Tabs
              defaultActiveKey="all"
              onChange={(key) => setActiveTab(key)}
              items={[
                { label: "All", key: "all" },
                { label: "Active", key: "active" },
                { label: "InActive", key: "inactive" },
                { label: "Archive", key: "archive" },
              ]}
            />
            <Search
              placeholder="Search contact..."
              style={{ width: "250px", marginBottom: "16px" }}
            />
          </Space>
          <Table
            className="custom-table"
            columns={getColumns(navigate)} // Pass navigate to getColumns
            dataSource={data || []}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 4,
              showSizeChanger: false,
              showQuickJumper: false,
            }}
          />
        </>
      )}

      {/* Modal for Chatbot Creation */}
      <Modal
        title="Create Chatbot"
        visible={isModalVisible}
        onOk={handleCreateChatbot}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter chatbot name"
          value={newChatbotName}
          onChange={(e) => setNewChatbotName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ComplianceDocuments;
