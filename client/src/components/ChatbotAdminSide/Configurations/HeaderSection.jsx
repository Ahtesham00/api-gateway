import React from "react";
import { Typography, Button } from "antd";

const { Title, Text } = Typography;

const HeaderSection = ({ setIsChatbotOpen }) => (
  <div
    className="configurations-header"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <Title level={2} className="heading">
        Settings
      </Title>
      <Text type="secondary">
        Update settings for better features performance
      </Text>
    </div>
    <Button
      type="default"
      onClick={() => setIsChatbotOpen(true)}
      style={{ marginLeft: "auto" }}
    >
      Preview
    </Button>
  </div>
);

export default HeaderSection;
