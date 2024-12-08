import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Space, Row, Col, message } from "antd";
import googleLogo from "../../assets/google-logo.svg";
import appleLogo from "../../assets/apple-logo.svg";
import InputField from "../common/InputField";

const { Title, Text, Link } = Typography;

const RightPanel = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      return message.error("Email and Password are required.");
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Log the payload to the console
      console.log("Payload being sent to the server:", payload);

      const response = await axios.post(
        "/v1/auth/v1/login", // Endpoint for login
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the request is successful, handle the response
      message.success("Login successful!");
      console.log("Server response:", response.data);
    } catch (error) {
      // Handle error
      console.error(error);
      message.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={12}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{
          width: "100%",
          maxWidth: "80%",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Space direction="vertical">
          <Text
            style={{
              color: "#b3b3b3",
              textAlign: "center",
              fontSize: "0.8rem",
              marginBottom: "0px",
            }}
          >
            Login your account
          </Text>
          <Title
            level={1}
            style={{
              color: "white",
              textAlign: "left",
              marginBottom: "0px",
              fontSize: "clamp(1.5rem, 2rem, 2rem)",
            }}
          >
            Welcome Back
          </Title>
          <Text style={{ color: "#b3b3b3", textAlign: "center" }}>
            Enter your email and password
          </Text>
        </Space>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <InputField
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Space>
        <Link
          href="/signup"
          style={{
            color: "#6E54B5",
            textDecoration: "underline",
            fontWeight: "normal",
          }}
        >
          Forgot Password?
        </Link>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#6E54B5",
          }}
          block
          onClick={handleSubmit}
        >
          Login
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#b3b3b3",
              marginRight: "10px",
            }}
          ></div>
          <Text style={{ color: "#b3b3b3" }}>Or login with</Text>
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#b3b3b3",
              marginLeft: "10px",
            }}
          ></div>
        </div>
        <Row gutter={[8, 8]} style={{ textAlign: "center" }}>
          <Col xs={24} sm={12}>
            <Button
              size="large"
              block
              style={{
                backgroundColor: "transparent",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #b3b3b3",
              }}
            >
              <img
                src={googleLogo}
                alt="Google"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Google
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              size="large"
              block
              style={{
                backgroundColor: "transparent",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #b3b3b3",
              }}
            >
              <img
                src={appleLogo}
                alt="Apple"
                style={{ width: "25px", marginRight: "10px" }}
              />
              Apple
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default RightPanel;
