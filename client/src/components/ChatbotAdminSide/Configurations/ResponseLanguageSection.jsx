import React, { useState } from "react";
import { Divider, Typography } from "antd";
import Select from "react-select";
import iso6391 from "iso-639-1";

const { Title, Text } = Typography;

const ResponseLanguageSection = ({onChange, selectedLanguage }) => {
 

  // Generate language options for react-select
  const languageOptions = iso6391.getAllNames().map((name) => ({
    label: name,
    value: iso6391.getCode(name),
  }));

  return (
    <div className="dropdown-section">
      <Title level={5} style={{ marginBottom: "0px" }}>
        Response Language
      </Title>
      <Text type="secondary">Select the preferred response language</Text>
      <Divider dashed />
      <Select
        options={languageOptions}
        placeholder="Choose a language"
        onChange={(option) => onChange(option)}
        value={selectedLanguage}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            border: "1px solid #D9D9D9",
            boxShadow: "none",
            color: "#000",
            borderRadius: "8px",
            minHeight: "30px",
            height: "30px",
            padding: "0 8px",
            fontSize: "13px",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            fontSize: "13px",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#999999",
            fontSize: "13px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#000",
            fontSize: "13px",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
              ? "rgba(0, 0, 0, 0.1)"
              : "transparent",
            color: "#000",
            fontSize: "13px",
            padding: "6px 10px",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            height: "30px",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "4px",
          }),
        }}
      />
    </div>
  );
};

export default ResponseLanguageSection;
