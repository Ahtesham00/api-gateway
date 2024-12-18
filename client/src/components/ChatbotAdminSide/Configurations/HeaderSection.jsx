import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const HeaderSection = ({ chatbotName }) => (
  <div className="configurations-header">
    <Title level={2} className="heading">
      Settings for {chatbotName}
    </Title>
    <Text type="secondary">Update settings for better features performance</Text>
  </div>
);

export default HeaderSection;
