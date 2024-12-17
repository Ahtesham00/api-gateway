import React from "react";
import { Space, Tag } from "antd";
import {
  FilePdfOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

export const columns = [
  {
    title: "Contractor Name",
    dataIndex: "icon",
    key: "icon",
    render: (icon, record) => (
      <Space>
        {icon}
        <div>
          <div style={{ fontWeight: "bold" }}>{record.name}</div>
          <div style={{ color: "#b3b3b3", fontSize: "12px" }}>
            Uploaded 5th Feb, 2023
          </div>
        </div>
      </Space>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Contractor Name",
    dataIndex: "contractor",
    key: "contractor",
  },
  {
    title: "SSN/TIN",
    dataIndex: "ssn",
    key: "ssn",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
        <DownloadOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
        <EllipsisOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
      </Space>
    ),
  },
];
