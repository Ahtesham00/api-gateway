import React from "react";
import { Typography, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import "../../styles/Home.css";

const { Title } = Typography;

const HeaderSection = ({ showModal, data }) => {
  return (
    <Space
      style={{
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
       <Title level={2} className="heading" style={{ marginBottom: 0 }}>
          Chatbots
        </Title>

      {data.length !== 0 && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{
            backgroundColor: "#6E54B5",
          }}
        >
          Create Chatbot
        </Button>
      )}
    </Space>
  );
};

export default HeaderSection;
