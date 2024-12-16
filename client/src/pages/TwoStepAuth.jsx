import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Typography, Space, Row, Col, Input, message } from "antd";

const { Title, Text } = Typography;

const TwoStepAuth = () => {
  const email = useSelector((state) => state.auth.email);
  // console.log("Email retrieved from Redux:", email);
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!code) {
      return message.error("Please enter the 2FA code.");
    }

    const payload = { email, code };
    console.log("payload", payload);
    try {
      const response = await axios.post("/v1/auth/verify-2fa", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        const { access_token, refresh_token } = response.data.data;
        // Save tokens in Redux
        dispatch(setTokens({ access_token, refresh_token }));

        // Store tokens and redirect to home page
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        window.location.href = "/home";
      } else {
        message.error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to verify the code."
      );
    }
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
          <Title level={1} style={{ color: "white" }}>
            Two-Step Authentication
          </Title>
          <Text style={{ color: "#b3b3b3" }}>
            Enter the 6-digit code sent to your email or phone.
          </Text>
          <Input
            placeholder="Enter 2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#6E54B5",
              color: "white",
              borderRadius: "8px",
              width: "100%",
            }}
            onClick={handleVerify}
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
