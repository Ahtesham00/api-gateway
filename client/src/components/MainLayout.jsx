import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import "../styles/MainLayout.css";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="site-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Content className="main-content" width={840}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
