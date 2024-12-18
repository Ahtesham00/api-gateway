import React from "react";
import { Space, Tag, Tooltip, Dropdown, Menu } from "antd";
import {
  RobotOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

export const getColumns = (navigate) => {
  const handleEdit = (id) => {
    if (id) {
      navigate("/configurations", { state: { chatbotId: id, chatbotName: name } });
    }
  };

  const columns = [
    {
      title: "Chatbot Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Space>
          <RobotOutlined style={{ color: "#1890FF", fontSize: 20 }} />
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
      render: (text, record) => {
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
              <EditOutlined
                style={{ fontSize: "16px", cursor: "pointer" }}
                onClick={() => handleEdit(record?._id)}
              />
            </Tooltip>
            <Dropdown overlay={menu} trigger={["click"]}>
              <EllipsisOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return columns;
};
