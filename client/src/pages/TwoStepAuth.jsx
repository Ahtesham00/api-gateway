import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTokens } from "../store";
import axios from "axios";
import { Button, Typography, Space, Row, Col, Input, message } from "antd";

const { Title, Text } = Typography;

const TwoStepAuth = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  // State for the 6 OTP input fields
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); // Ensure only one character
    setOtp(updatedOtp);

    // Focus on the next input if available
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    const code = otp.join(""); // Combine OTP fields into a single string
    if (code.length !== 6) {
      return message.error("Please enter a valid 6-digit OTP.");
    }

    const payload = { email, code };
    console.log("payload", payload);

    try {
      const response = await axios.post("/v1/auth/verify-2fa", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        const { access_token, refresh_token } = response.data.data;
        console.log("response", response.data.data);

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

          {/* OTP Input Fields */}
          <Space
            size="small"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {otp.map((digit, index) => (
              <Input
                key={index}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                style={{
                  backgroundColor: "#3b364c",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  width: "3rem",
                  height: "3rem",
                  border: "none",
                  borderRadius: "8px",
                  margin: "0 5px",
                }}
              />
            ))}
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
