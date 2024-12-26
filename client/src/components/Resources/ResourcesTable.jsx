import React from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import {
  MoreOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const getFileIcon = (extension) => {
  switch (extension) {
    case "docx":
    case "doc":
      return <FileWordOutlined style={{ fontSize: 20, color: "#1890ff" }} />;
    case "pdf":
      return <FilePdfOutlined style={{ fontSize: 20, color: "#f5222d" }} />;
    default:
      return <FileTextOutlined style={{ fontSize: 20, color: "#595959" }} />;
  }
};

const ResourcesTable = ({ data }) => {
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
      },
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
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ position: ["bottomCenter"] }}
      style={{ marginTop: "40px" }}
      className="custom-table"
    />
  );
};

export default ResourcesTable;
