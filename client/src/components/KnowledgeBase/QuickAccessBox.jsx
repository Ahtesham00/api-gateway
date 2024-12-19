import React from "react";
import { Card, Space } from "antd";

const QuickAccessBox = () => {
  return (
    <Card
      title="Quick Access"
      style={{
        marginBottom: "16px",
        flexShrink: 0,
        backgroundColor: "#f7faff", // White background with reduced opacity
        border: "none", // Optional: remove border
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: slight shadow
      }}
    >
      <Space direction="horizontal" size="large">
        <Card style={{ width: 120, backgroundColor: "#f7faff", textAlign: "center" }}>Empty</Card>
        <Card style={{ width: 120, backgroundColor: "#f7faff", textAlign: "center" }}>Empty</Card>
        <Card style={{ width: 120, backgroundColor: "#f7faff", textAlign: "center" }}>Empty</Card>
      </Space>
    </Card>
  );
};

export default QuickAccessBox;
