import React from "react";
import { Card, Slider, Row, Col, Divider } from "antd";

const ModelSensitivitySection = () => (
  <div className="model-sensitivity">
    <div className="configurations-header">
      <h5 style={{ marginBottom: "0px", marginTop: "20px" }}>Model Configuration</h5>
      <p>Adjust sensitivity settings</p>
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
);

export default ModelSensitivitySection;
