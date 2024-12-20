import React from "react";
import { Button, Table, Dropdown, Menu, Typography, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "../styles/Resources.css"; // Add styles here if necessary

const { Title } = Typography;

const Resources = () => {
  // Sample data for the table
  const data = [
    {
      key: "1",
      fileName: "Dashboard tech requirements",
      updatedBy: "Amélie Laurent",
      lastModified: "Jan 4, 2024",
    },
    {
      key: "2",
      fileName: "Marketing site requirements",
      updatedBy: "Ammar Foley",
      lastModified: "Jan 6, 2024",
    },
    {
      key: "3",
      fileName: "Q4_2023 Reporting",
      updatedBy: "Sienna Hewitt",
      lastModified: "Jan 8, 2024",
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
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
      />
    </div>
  );
};

export default Resources;
