import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Slider, Typography, Row, Col, Select, Divider, Input } from "antd";
import "../styles/Configurations.css";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Configurations = () => {
  const location = useLocation();
  const {  chatbotId, chatbotName } =  location.state || { chatbotId: null, chatbotName: "Unnamed Chatbot" };

  return (
    <div className="configurations-container">
      <div className="configurations-content">
        {/* Header */}
        <div className="configurations-header">
          <Title level={2} className="heading">
            Settings for
          </Title>
          <Text type="secondary">
            Update settings for better features performance
          </Text>
        </div>

        <Divider />

        {/* Model Sensitivity */}
        <div className="model-sensitivity">
          <div className="configurations-header">
            <Title level={5} style={{ marginBottom: "0px", marginTop: "20px" }}>
              Model Configuration
            </Title>
            <Text type="secondary">Adjust sensitivity settings</Text>
          </div>
          <Divider dashed />
          <Row gutter={[16, 16]} className="full-width-row">
            <Col span={12} className="slider-col">
              <Card title="Temperature" className="slider-card">
                <Slider defaultValue={1.0} min={0.0} max={2.0} step={0.1} tooltipVisible />
                <div className="slider-range">
                  <span>0</span>
                  <span>2.00</span>
                </div>
              </Card>
            </Col>
            <Col span={12} className="slider-col">
              <Card title="Max Tokens" className="slider-card">
                <Slider defaultValue={2048} min={1} max={16383} step={1} tooltipVisible />
                <div className="slider-range">
                  <span>1</span>
                  <span>16383</span>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Dropdown Sections */}
        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Language Model</Title>
          <Text type="secondary">Select the language model version</Text>
          <Divider dashed />
          <Select placeholder="Choose a model" className="dropdown">
            <Option value="gpt-3.5">GPT-3.5</Option>
            <Option value="gpt-4">GPT-4</Option>
          </Select>
        </div>

        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Response Tone</Title>
          <Text type="secondary">Choose the tone of responses</Text>
          <Divider dashed />
          <Select placeholder="Choose a tone" className="dropdown">
            <Option value="formal">Formal</Option>
            <Option value="casual">Casual</Option>
            <Option value="friendly">Friendly</Option>
            <Option value="professional">Professional</Option>
          </Select>
        </div>

        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Response Language</Title>
          <Text type="secondary">Select the preferred response language</Text>
          <Divider dashed />
          <Select placeholder="Choose a language" className="dropdown">
            <Option value="english">English</Option>
            <Option value="french">French</Option>
            <Option value="spanish">Spanish</Option>
            <Option value="german">German</Option>
          </Select>
        </div>

        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Knowledge Base</Title>
          <Text type="secondary">Choose the knowledge base to use</Text>
          <Divider dashed />
          <Select placeholder="Choose a knowledge base" className="dropdown">
            <Option value="base1">Knowledge Base 1</Option>
            <Option value="base2">Knowledge Base 2</Option>
          </Select>
        </div>

        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Folder</Title>
          <Text type="secondary">Select the folder for storing outputs</Text>
          <Divider dashed />
          <Select placeholder="Choose a folder" className="dropdown">
            <Option value="folder1">Folder 1</Option>
            <Option value="folder2">Folder 2</Option>
          </Select>
        </div>

        {/* Persona Section */}
        <div className="dropdown-section">
          <Title level={5} style={{ marginBottom: "0px" }}>Persona</Title>
          <Text type="secondary">Provide a persona for your chatbot</Text>
          <Divider dashed />
          <TextArea placeholder="Enter persona description" rows={4} className="textarea-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Configurations;
