import React from "react";
import { Card, Space } from "antd";

const QuickAccessBox = () => {
  return (
    <Card
      title="Quick Access"
      style={{
        marginBottom: "16px",
        flexShrink: 0,
        // backgroundColor: "transparent", // Makes the Card background transparent
        // border: "none ", // Removes any border for the Card
        // boxShadow: "none",
      }}
    >
      <Space direction="horizontal" size="large">
        <Card style={{ width: 120, textAlign: "center" }}>Empty</Card>
        <Card style={{ width: 120, textAlign: "center" }}>Empty</Card>
        <Card style={{ width: 120, textAlign: "center" }}>Empty</Card>
      </Space>
    </Card>
  );
};

export default QuickAccessBox;
