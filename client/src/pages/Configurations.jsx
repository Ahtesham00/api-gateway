import React from "react";
import { useLocation } from "react-router-dom";

const Configurations = () => {
  const location = useLocation();
  const { chatbotId } = location.state || {}; // Extract chatbotId from navigation state

  return (
    <div>
      <h1>Chatbot Settings</h1>
      <p>Chatbot ID: {chatbotId}</p>
    </div>
  );
};

export default Configurations;
