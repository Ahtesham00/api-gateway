import React from "react";
import { Typography, Divider } from "antd";
import { WalletOutlined, BookOutlined } from "@ant-design/icons";
import "../../styles/Home.css";

const { Title, Text } = Typography;

const LeftHeaderSection = () => {
  return (
    <div className="header-section">
      {/* Title Section */}
      <div className="header-title">
        <Title level={2} className="heading">
          Home
        </Title>

        <Text className="header-subtitle">Welcome back!</Text>
      </div>

      {/* Divider */}
      <Divider type="vertical" className="header-divider" />

      {/* Balance Info */}
      <div className="balance-info">
        <div className="balance-item">
          <WalletOutlined className="balance-icon" />
          <div className="balance-text">
            <Text className="balance-value"> $ 323 </Text>
            <Text className="balance-label"> My Balance </Text>
          </div>
        </div>
        <div className="balance-item">
          <BookOutlined className="balance-icon" />
          <div className="balance-text">
            <Text className="balance-value"> 5 lesson </Text>
            <Text className="balance-label"> Deposit </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftHeaderSection;
