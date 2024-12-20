import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Input } from "antd";
import { SendOutlined, CloseOutlined } from "@ant-design/icons";
import "../../../styles/ChatbotAdmin.css";
import bgImage from "../../../assets/chrome-ball.png";

const { TextArea } = Input;

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
    { text: "Can you tell me about the latest updates?", sender: "user" },
    { text: "Sure! Here are the recent updates:", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const chatBodyRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      centered
      width={600}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
      }}
      bodyStyle={{
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
        overflow: "hidden",
        background: "#f9f9f9",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#70A1B9",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#333333",
            }}
          >
            AI Assist
          </span>
        </div>
        <CloseOutlined
          style={{
            cursor: "pointer",
            fontSize: "16px",
            color: "#999999",
          }}
          onClick={onClose}
        />
      </div>

      {/* Chat Body with Hidden Scrollbar */}
      <div
        ref={chatBodyRef}
        style={{
          flex: 1,
          paddingTop: "20px",
          paddingBottom: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          position: "relative",
          background: "#ffffff",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE and Edge
        }}
        className="chat-body"
      >
        {/* Hide scrollbar for Webkit browsers */}
        <style>
          {`
            .chat-body::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {messages.length === 0 ? (
          <>
            <img
              src={bgImage}
              alt="Chatbot Icon"
              style={{
                width: "100px",
                height: "100px",
                marginBottom: "16px",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#666666",
                textAlign: "center",
              }}
            >
              Ask me anything!
            </span>
          </>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "#63BDE1" : "#f1f1f1",
                color: msg.sender === "user" ? "#ffffff" : "#000000",
                padding: "10px 16px",
                borderRadius: "12px",
                maxWidth: "75%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input Section */}
      <div
        style={{
          padding: "0px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TextArea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            borderRadius: "12px",
            resize: "none",
            border: "1px solid #eaeaea",
            padding: "10px 12px",
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          style={{
            borderRadius: "12px",
            padding: "0 16px",
            height: "40px",
            backgroundColor: "#63BDE1",
          }}
        />
      </div>
    </Modal>
  );
};

export default ChatbotModal;
