import React from "react";
import { Card, Slider, Row, Col } from "antd";

const ModelSensitivitySection = ({ temperature, setTemperature, maxTokens, setMaxTokens }) => {
  return (
    <div className="model-sensitivity">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Temperature" className="slider-card">
            <Slider
              min={0.0}
              max={2.0}
              step={0.1}
              value={temperature}
              onChange={(value) => setTemperature(value)}
              // tooltipVisible
            />
            <div className="slider-range">
              <span>0</span>
              <span>2.0</span>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Max Tokens" className="slider-card">
            <Slider
              min={1}
              max={16383}
              step={1}
              value={maxTokens}
              onChange={(value) => setMaxTokens(value)}
            />
            <div className="slider-range">
              <span>1</span>
              <span>16383</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModelSensitivitySection;
