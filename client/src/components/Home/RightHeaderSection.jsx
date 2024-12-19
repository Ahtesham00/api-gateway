import React from "react";
import { Input, Badge } from "antd";
import { SearchOutlined, MessageOutlined, BellFilled } from "@ant-design/icons";
import "../../styles/Home.css";

const RightHeaderSection = () => {
  return (
    <div className="right-header-section">
      {/* Search Bar */}
      <div className="search-bar-container">
        <Input
          className="custom-search-bar"
          placeholder="Search"
          prefix={<SearchOutlined className="search-icon" />}
        />
      </div>

      {/* Icons Section */}
      <div className="header-icons">
        <MessageOutlined className="icon" />
        <Badge dot offset={[-2, 2]} className="notification-badge">
          <BellFilled className="icon" />
        </Badge>
      </div>
    </div>
  );
};

export default RightHeaderSection;
