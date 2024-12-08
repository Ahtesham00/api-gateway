import React, { useState } from "react";
import { Row } from "antd";
import leftPanelImage1 from "../assets/desert-at-night.jpg";
import leftPanelImage2 from "../assets/desert-at-night.jpg";
import leftPanelImage3 from "../assets/third-image.jpg";
import LeftPanel from "../components/common/LeftPanel";
import RightPanel from "../components/Signup/RightPanel";


const Signup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const content = [
    {
      img: leftPanelImage1,
      caption: "Capturing Moments, Creating Memories",
    },
    {
      img: leftPanelImage2,
      caption: "Phenomena of the Universe",
    },
    {
      img: leftPanelImage3,
      caption: "Explore the Infinite",
    },
  ];

  return (
    <Row style={{ height: "100vh", backgroundColor: "#2B2738" }}>
      <LeftPanel content={content} activeTab={activeTab} setActiveTab={setActiveTab} />
      <RightPanel />
    </Row>
  );
};

export default Signup;
