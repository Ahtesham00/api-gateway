import React from "react";
import { Space, Tag, Tooltip, Dropdown, Menu } from "antd";
import {
  RobotOutlined, // Chatbot icon
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

export const columns = [
  {
    title: "Chatbot Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <Space>
        <RobotOutlined style={{ color: "#1890FF", fontSize: 20 }} /> {/* Chatbot icon */}
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ color: "#b3b3b3", fontSize: "12px" }}>
            Created on: 5th Feb, 2023
          </div>
        </div>
      </Space>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Creation Date",
    dataIndex: "creationDate",
    key: "creationDate",
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
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item key="delete" style={{ color: "red" }}>
            <DeleteOutlined /> Delete
          </Menu.Item>
        </Menu>
      );

      return (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
          </Tooltip>
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined
              style={{ fontSize: "16px", cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </Space>
      );
    },
  },
];
