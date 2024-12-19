import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import "../styles/MainLayout.css";

const { Content } = Layout;

const MainLayout = ({ children, hideSidebar = false }) => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="site-layout">
      {!hideSidebar && <Sidebar />}
      <Content className="main-content" style={{ width: hideSidebar ? "100%" : "calc(100% - 260px)" }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
