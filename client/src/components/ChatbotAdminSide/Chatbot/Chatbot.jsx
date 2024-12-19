import React, { useState } from "react";
import { Drawer, Input, Button, FloatButton, Space } from "antd";
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../../styles/ChatbotAdmin.css";

const { TextArea } = Input;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{
          right: 30, // Padding from right edge
          bottom: 30, // Padding from bottom edge
          zIndex: 1000, // Visibility over other components
        }}
        onClick={toggleChat}
      />

      {/* Chatbot Drawer */}
      <Drawer
        title={
          <div className="chatbot-header">
            <span>Chatbot</span>
            <CloseOutlined onClick={toggleChat} style={{ cursor: "pointer" }} />
          </div>
        }
        placement="right"
        width={360} // Drawer width
        onClose={toggleChat}
        open={isOpen}
        closable={false}
        bodyStyle={{
          padding: "10px", // Control the spacing inside the Drawer
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "auto",
        }}
      >
        {/* Chat Messages */}
        <div
          className="chatbot-messages"
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: "20px", // Add spacing at the bottom
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <Space.Compact style={{ width: "100%", marginTop: "10px" }}>
          <TextArea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              borderRadius: "8px 0 0 8px",
              border: "1px solid #D9D9D9",
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={{
              borderRadius: "0 8px 8px 0",
            }}
          />
        </Space.Compact>
      </Drawer>
    </>
  );
};

export default Chatbot;
