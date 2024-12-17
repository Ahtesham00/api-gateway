import React from "react";
import { Card, Space, Typography, Tag, List, Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RightPanelBox = ({ folder }) => {
  if (!folder) {
    return (
      <Card style={{ height: "100%", textAlign: "center" }}>
        <Empty description="Select a folder to view details" />
      </Card>
    );
  }

  return (
    <Card title={folder.name} style={{ height: "100%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Text strong>Size: {folder.size}</Text>
        <Text strong>Modified: {folder.modified}</Text>

        {/* Tags */}
        <Space>
          <Tag color="blue">Work</Tag>
          <Tag color="purple">Source</Tag>
          <Tag color="cyan">Font</Tag>
        </Space>

        {/* Sharing Section */}
        <Title level={5}>Sharing</Title>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Avatar icon={<UserOutlined />} />
          <Avatar icon={<UserOutlined />} />
          <Text strong>+3</Text>
        </Space>

        {/* Activity Log */}
        <Title level={5}>Activity</Title>
        <List
          size="small"
          dataSource={[
            "You shared edit access to Miko",
            "You shared edit access to Ashley",
            "You changed file Maszeh.glyph",
            "You added tag Work",
            "You changed edit view access to Nolan",
          ]}
          renderItem={(activity) => <List.Item>{activity}</List.Item>}
        />
      </Space>
    </Card>
  );
};

export default RightPanelBox;
