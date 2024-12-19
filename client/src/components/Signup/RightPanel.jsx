import React, { useState } from "react";
import axios from "axios";
import { Button, Checkbox, Typography, Space, Row, Col, message } from "antd";
import googleLogo from "../../assets/google-logo.svg";
import appleLogo from "../../assets/apple-logo.svg";
import InputField from "../common/InputField";

const { Title, Text, Link } = Typography;

const RightPanel = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      return message.error("You must agree to the Terms & Conditions.");
    }
    console.log("firstName", formData.firstName);
    console.log("lastName", formData.lastName);
    console.log("email", formData.email);
    console.log("password", formData.password);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      return message.error("All fields are required.");
    }

    // Combine first name and last name into username
    const payload = {
      username: `${formData.firstName} ${formData.lastName}`.trim(), // Combine and trim
      email: formData.email,
      password: formData.password,
      role: "Admin",
    };

    try {
      // Log the payload to the console
      console.log("Payload being sent to the server:", payload);

      const response = await axios.post(
        "/v1/auth/signup", // Endpoint
        payload, // Payload
        {
          headers: {
            "Content-Type": "application/json", // Set content type
          },
        }
      );

      // If the request is successful, handle the response
      message.success("Account created successfully!");
      console.log("Server response:", response.data); // Log server response
    } catch (error) {
      // Handle error
      console.error(error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
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
        <Title
          level={1}
          style={{
            color: "white",
            textAlign: "left",
            marginBottom: "0px",
            fontSize: "clamp(1.5rem, 2rem, 2rem)",
          }}
        >
          Create an account
        </Title>
        <Text style={{ color: "#b3b3b3", textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#6E54B5",
              textDecoration: "underline",
              fontWeight: "normal",
            }}
          >
            Log in
          </Link>
        </Text>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <InputField
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col xs={24} sm={12}>
              <InputField
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Col>
          </Row>
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
          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            style={{ color: "white" }}
          >
            I agree to the{" "}
            <Link
              href="/terms"
              style={{
                color: "#6E54B5",
                textDecoration: "underline",
                fontWeight: "normal",
              }}
            >
              Terms & Conditions
            </Link>
          </Checkbox>
        </Space>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#6E54B5",
          }}
          block
          onClick={handleSubmit}
        >
          Create account
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
          <Text style={{ color: "#b3b3b3" }}>Or register with</Text>
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
