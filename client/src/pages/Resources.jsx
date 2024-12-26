import React, { useState } from "react";
import { Button, Typography, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/Resources.css";
import ResourcesTable from "../components/Resources/ResourcesTable";
import UploadModal from "../components/Resources/UploadModal";

const { Title } = Typography;

const ResourcesPage = () => {
  // Sample data for the table
  // Make this empty to test empty state: const [data, setData] = useState([]);
  const [data, setData] = useState([
    {
      key: "1",
      fileName: "Dashboard tech requirements",
      updatedBy: "Amélie Laurent",
      lastModified: "Jan 4, 2024",
      extension: "docx",
      size: "220 KB",
    },
    {
      key: "2",
      fileName: "Marketing site requirements",
      updatedBy: "Ammar Foley",
      lastModified: "Jan 6, 2024",
      extension: "docx",
      size: "488 KB",
    },
    {
      key: "3",
      fileName: "Q4_2023 Reporting",
      updatedBy: "Sienna Hewitt",
      lastModified: "Jan 8, 2024",
      extension: "pdf",
      size: "1.2 MB",
    },
    {
        key: "4",
        fileName: "Q4_2023 Reporting",
        updatedBy: "Sienna Hewitt",
        lastModified: "Jan 8, 2024",
        extension: "pdf",
        size: "1.2 MB",
      },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = (newFiles) => {
    // Here you can add the new files to 'data' or handle them as needed
    // For demo, let's just close the modal.
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} className="heading" style={{ marginBottom: 0 }}>
          Resources
        </Title>
        {data && data.length > 0 && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#6E54B5" }}
            onClick={handleUploadClick}
          >
            Upload
          </Button>
        )}
      </div>

      {data && data.length > 0 ? (
        <ResourcesTable data={data} />
      ) : (
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
          <Empty description="No files found">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#6E54B5" }}
              onClick={handleUploadClick}
            >
              Upload
            </Button>
          </Empty>
        </div>
      )}

      <UploadModal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default ResourcesPage;
