import React from "react";
import { Col, Typography } from "antd";
import Tabs from "./Tabs";

const { Title } = Typography;

const LeftPanel = ({ content, activeTab, setActiveTab }) => (
  <Col
    xs={24}
    sm={24}
    md={12}
    style={{
      position: "relative",
      padding: "20px",
      paddingRight: "0px",
      borderRadius: "10px",
    }}
  >
    <img
      src={content[activeTab].img}
      alt="Left Panel"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        color: "white",
        textAlign: "center",
        padding: "10px",
        width: "50%",
      }}
    >
      <Title
        level={2}
        style={{
          color: "white",
          margin: 0,
          fontWeight: "500",
          fontSize: "clamp(1.2rem, 2vw, 4rem)",
        }}
      >
        {content[activeTab].caption}
      </Title>
    </div>
    <Tabs content={content} activeTab={activeTab} setActiveTab={setActiveTab} />
  </Col>
);

export default LeftPanel;
