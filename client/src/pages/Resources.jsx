import React from "react";
import { Button, Table, Dropdown, Menu, Typography } from "antd";
import { MoreOutlined, FileWordOutlined, FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import "../styles/Resources.css";

const { Title } = Typography;

const Resources = () => {
  // Sample data for the table, now includes size and extension
  const data = [
    {
      key: "1",
      fileName: "Dashboard tech requirements",
      updatedBy: "Amélie Laurent",
      lastModified: "Jan 4, 2024",
      extension: "docx",
      size: "220 KB"
    },
    {
      key: "2",
      fileName: "Marketing site requirements",
      updatedBy: "Ammar Foley",
      lastModified: "Jan 6, 2024",
      extension: "docx",
      size: "488 KB"
    },
    {
      key: "3",
      fileName: "Q4_2023 Reporting",
      updatedBy: "Sienna Hewitt",
      lastModified: "Jan 8, 2024",
      extension: "pdf",
      size: "1.2 MB"
    },
  ];

  // Choose icon based on extension
  const getFileIcon = (extension) => {
    switch (extension) {
      case "docx":
      case "doc":
        return <FileWordOutlined style={{ fontSize: 20, color: '#1890ff' }} />;
      case "pdf":
        return <FilePdfOutlined style={{ fontSize: 20, color: '#f5222d' }} />;
      default:
        return <FileTextOutlined style={{ fontSize: 20, color: '#595959' }} />;
    }
  };

  // Columns for the table
  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (_, record) => {
        const icon = getFileIcon(record.extension);
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {icon}
            <div style={{ marginLeft: "8px" }}>
              <div style={{ fontWeight: "500" }}>{record.fileName}</div>
              <div style={{ fontSize: "0.85rem", color: "#888" }}>
                {record.size} • {record.extension}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Rename</Menu.Item>
              <Menu.Item key="2">Open in Browser</Menu.Item>
              <Menu.Item key="3">Available Offline</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4" danger>
                Delete File
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3}>Resources</Title>
        <Button type="primary">Upload</Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        style={{ marginTop: "20px" }}
        className="custom-table"
      />
    </div>
  );
};

export default Resources;
