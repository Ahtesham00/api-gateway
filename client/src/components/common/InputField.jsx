import React from "react";
import { Input } from "antd";
import "../../styles/Signup.css";

const InputField = ({ placeholder, name, value, onChange, type = "text" }) => {
  const inputStyle = {
    backgroundColor: "#3B364C",
    color: "white",
    fontWeight: "normal",
  };

  return type === "password" ? (
    <Input.Password
      placeholder={placeholder}
      name={name} // Attach name prop for form handling
      value={value} // Attach value prop for controlled input
      onChange={onChange} // Attach onChange handler
      size="large"
      style={inputStyle}
      className="custom-password-input"
    />
  ) : (
    <Input
      placeholder={placeholder}
      name={name} // Attach name prop for form handling
      value={value} // Attach value prop for controlled input
      onChange={onChange} // Attach onChange handler
      size="large"
      style={inputStyle}
      className="custom-input"
    />
  );
};

export default InputField;
