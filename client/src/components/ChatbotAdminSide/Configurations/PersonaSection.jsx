import React from "react";
import { Typography, Divider, Input } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

const PersonaSection = () => (
  <div className="dropdown-section">
    <Title level={5} style={{ marginBottom: "0px" }}>Persona</Title>
    <Text type="secondary">Provide a persona for your chatbot</Text>
    <Divider dashed />
    <TextArea placeholder="Enter persona description" rows={4} className="textarea-transparent" />
  </div>
);

export default PersonaSection;
