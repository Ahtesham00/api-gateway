import React from "react";
import { Layout, Row, Col } from "antd";
import LeftHeaderSection from "../components/Home/LeftHeaderSection";
import RightHeaderSection from "../components/Home/RightHeaderSection";
import ActivitySection from "../components/Home/ActivitySection";
import TeachersSection from "../components/Home/TeachersSection";
import PopularCoursesSection from "../components/Home/PopularCoursesSection";
import RightPanelSection from "../components/Home/RightPanelSection";
import "../styles/Home.css";

const { Content } = Layout;

const Home = () => {
  return (
    <Content className="home-container">
      <Row gutter={24}>
        {/* Left Panel */}
        <Col span={16} className="left-panel">
          <div className="left-panel-sections">
            <LeftHeaderSection />
            <ActivitySection />
            <TeachersSection />
            <PopularCoursesSection />
          </div>
        </Col>

        {/* Right Panel */}
        <Col span={8} className="right-panel">
        <RightHeaderSection />
          <RightPanelSection />
        </Col>
      </Row>
    </Content>
  );
};

export default Home;
