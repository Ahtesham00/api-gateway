import React from "react";

const Tabs = ({ content, activeTab, setActiveTab }) => (
  <div
    style={{
      position: "absolute",
      bottom: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      justifyContent: "center",
      gap: "8px",
    }}
  >
    {content.map((_, index) => (
      <div
        key={index}
        onClick={() => setActiveTab(index)}
        style={{
          width: index === activeTab ? "30px" : "15px",
          height: "3px",
          backgroundColor: index === activeTab ? "white" : "rgba(255, 255, 255, 0.5)",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      ></div>
    ))}
  </div>
);

export default Tabs;
