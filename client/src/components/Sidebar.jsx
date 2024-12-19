import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth, setSelectedSidebarKey } from "../store"; // Import the clearAuth action
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Space,
  Divider,
  Modal,
  Dropdown,
} from "antd";
import { VStack } from "@chakra-ui/react";
import {
  HomeOutlined,
  AppstoreOutlined,
  StarOutlined,
  CalendarOutlined,
  BookOutlined,
  BarChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png"; // Import the logo image

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedKey = useSelector((state) => state.sidebar.selectedKey);

  const handleMenuClick = ({ key }) => {
    dispatch(setSelectedSidebarKey(key));
  };

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

  // Avatar Dropdown Menu
  const avatarMenu = (
    <Menu>
      <Menu.Item key="user-management" icon={<UserOutlined />}>
        <Link to="/user-management">User Management</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      {/* <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item> */}
    </Menu>
  );

  return (
    <Sider className="custom-sidebar" width={260}>
      <Space
        direction="vertical"
        size="large"
        style={{
          borderRight: "1px solid #C0D2E3",
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
      >
        {/* <VStack
        borderRight="1px solid #C0D2E3"
        paddingRight="20px"
        justifyContent="space-between"
      > */}
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
          size="large"
          style={{
            height: "81vh",
            justifyContent: "space-between",
          }}
        >
          {/* <VStack> */}
          {/* Navigation Menu Section */}
          <div className="menu-section">
            <Menu
              mode="vertical"
              selectedKeys={[selectedKey]} // Set the selected key from Redux
              onClick={handleMenuClick}
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
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <Link to="/knowledge-base">Knowledge Base</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<StarOutlined />}>
                <Link to="/chatbot">Chatbot</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CalendarOutlined />}>
                <Link to="/schedule">Resource</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<BookOutlined />}>
                <Link to="/my-courses">Avatar</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<BarChartOutlined />}>
                <Link to="/statistics">Prospects</Link>
              </Menu.Item>
            </Menu>
          </div>

          {/* Bottom Section */}
          <div className="sidebar-bottom">
            <Dropdown overlay={avatarMenu} trigger={["click"]}>
              <div className="sidebar-user" style={{ cursor: "pointer" }}>
                <Avatar
                  size={44}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                />
                <div>
                  <Text className="username">Volter Anderson</Text>
                </div>
              </div>
            </Dropdown>
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
          {/* </VStack> */}
        </Space>
        {/* </VStack> */}
      </Space>
    </Sider>
  );
};

export default Sidebar;
