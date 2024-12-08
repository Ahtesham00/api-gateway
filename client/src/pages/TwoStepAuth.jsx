import React from "react";
import { Button, Typography, Space, Row, Col, Input, message } from "antd";
import "../styles/Signup.css";

const { Title, Text } = Typography;

const TwoStepAuth = () => {
  const onChange = (text) => {
    console.log("onChange:", text);
  };

  const onInput = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  const handleSubmit = () => {
    if (!sharedProps.onInput) {
      return message.error("Please enter the OTP.");
    }

    // Simulating submission (replace with your API call)
    message.success("OTP verified successfully!");
    console.log("OTP submitted:", sharedProps.onInput);
  };

  return (
    <Row
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B2738",
      }}
    >
      <Col
        xs={24}
        sm={18}
        md={12}
        lg={8}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#2c2c3d",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <Title
            level={1}
            style={{
              color: "white",
              fontSize: "clamp(1.5rem, 2rem, 2.5rem)",
              marginBottom: "0px",
            }}
          >
            Two-Step Authentication
          </Title>
          <Text style={{ color: "#b3b3b3" }}>
            Enter the 6-digit code sent to your email or phone
          </Text>
          <Space
            direction="vertical"
            size="small"
            style={{ width: "100%", alignItems: "center" }}
          >
            {/* OTP Input with formatter */}
            <Input.OTP
              formatter={(str) => str.toUpperCase()} // Convert input to uppercase
              {...sharedProps} // Attach shared properties
              style={{
                backgroundColor: "#3b364c",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
                letterSpacing: "5px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
              }}
            />
          </Space>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#6E54B5",
              color: "white",
              borderRadius: "8px",
              width: "100%",
            }}
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>
          <Text
            style={{
              color: "#6E54B5",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => message.info("OTP resent successfully!")}
          >
            Resend OTP
          </Text>
        </Space>
      </Col>
    </Row>
  );
};

export default TwoStepAuth;
