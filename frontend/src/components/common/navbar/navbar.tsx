import React from "react";
import { Button, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes";
import * as authService from "../../../services/authService";
import { LoginOutlined } from "@ant-design/icons";

const { Header } = Layout;

const handleLogout = () => {
  authService.logout();
};

const Navbar: React.FC = () => {
  return (
    <Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="home">
            <Link to={routes.HOME}>Home</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to={routes.ABOUT}>About</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to={routes.CONTACT}>Contact</Link>
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="logout">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
