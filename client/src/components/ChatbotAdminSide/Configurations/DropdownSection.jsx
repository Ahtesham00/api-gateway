import React from "react";
import { Typography, Divider, Select } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const DropdownSection = ({
  title,
  description,
  options,
  onChange,
  mode = "",
}) => (
  <div className="dropdown-section">
    <Title level={5} style={{ marginBottom: "0px" }}>
      {title}
    </Title>
    <Text type="secondary">{description}</Text>
    <Divider dashed />
    <Select
      mode={mode}
      placeholder={`Choose ${title}`}
      className="dropdown"
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  </div>
);

export default DropdownSection;
