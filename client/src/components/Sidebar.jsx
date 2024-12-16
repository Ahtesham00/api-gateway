import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../store"; // Import the clearAuth action
import { Layout, Menu, Typography, Avatar, Space, Divider, Modal  } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  StarOutlined,
  CalendarOutlined,
  BookOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png"; // Import the logo image

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("in lgout function");
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        // Clear Redux state
        dispatch(clearAuth());

        // Clear localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirect to login
        navigate("/");
      },
    });
  };
  return (
    <Sider className="custom-sidebar" width={260}>
      <Space
        direction="vertical"
        size="large" /* Controls spacing between items */
        style={{
          borderRight: "1px solid #C0D2E3",
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
      >
        {/* Logo Section */}
        <div
          className="sidebar-logo"
          style={{
            height: "6vh",
          }}
        >
          <img src={logo} alt="logo" className="sidebar-logo-image" />
          <Text strong className="sidebar-title">
            Knowledge
          </Text>
        </div>

        <Space
          direction="vertical"
          size="large" /* Controls spacing between items */
          style={{
            height: "81vh",
            justifyContent: "space-between",
          }}
        >
          {/* Navigation Menu Section */}
          <div className="menu-section">
            <Menu
              mode="vertical"
              defaultSelectedKeys={["1"]}
              className="sidebar-menu"
              style={{
                background: "transparent",
                borderRight: "none",
              }}
            >
              <Menu.Item
                key="1"
                icon={<HomeOutlined />}
                style={{
                  borderRadius: "14px",
                  alignItems: "left",
                }}
              >
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <Link to="/knowledge-based">Knowledge Based</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<StarOutlined />}>
                <Link to="/popular-courses">Popular Courses</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CalendarOutlined />}>
                <Link to="/schedule">Schedule</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<BookOutlined />}>
                <Link to="/my-courses">My Courses</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<BarChartOutlined />}>
                <Link to="/statistics">Statistics</Link>
              </Menu.Item>
            </Menu>
          </div>

          {/* Bottom Section */}
          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <Avatar
                size={44}
                src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              />
              <div>
                <Text className="username">Volter Anderson</Text>
              </div>
            </div>
            {/* Divider */}
            <Divider style={{ margin: "0px 0", borderColor: "#C0D2E3" }} />
            <Menu
              mode="vertical"
              selectable={false}
              className="logout-menu"
              style={{
                background: "transparent",
                borderRight: "none",
              }}
            >
              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </Space>
      </Space>
    </Sider>
  );
};

export default Sidebar;
