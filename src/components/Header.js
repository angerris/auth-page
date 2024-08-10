import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer, Menu, Radio } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader({ loggedIn, onLogout }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("home");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleMenuChange = (e) => {
    setSelectedMenu(e.target.value);
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        width: "100%"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <UserOutlined style={{ fontSize: "24px", color: "#000" }} />
        {!isMobile && (
          <Radio.Group
            onChange={handleMenuChange}
            value={selectedMenu}
            style={{ marginLeft: 20 }}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="home">Home</Radio.Button>
            <Radio.Button value="contact">Contact</Radio.Button>
            <Radio.Button value="about">About</Radio.Button>
          </Radio.Group>
        )}
      </div>

      {!isMobile && (
        <div>
          {loggedIn ? (
            <Button type="primary" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button type="primary">Login</Button>
          )}
        </div>
      )}

      {isMobile && (
        <div className="mobile-menu">
          <MenuOutlined
            style={{ fontSize: "24px", color: "#000" }}
            onClick={showDrawer}
          />
        </div>
      )}

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Menu mode="vertical" selectedKeys={[selectedMenu]}>
          <Menu.Item key="home" onClick={() => setSelectedMenu("home")}>
            Home
          </Menu.Item>
          <Menu.Item key="contact" onClick={() => setSelectedMenu("contact")}>
            Contact
          </Menu.Item>
          <Menu.Item key="about" onClick={() => setSelectedMenu("about")}>
            About
          </Menu.Item>
          <Menu.Item key="login-logout">
            <Button
              type="primary"
              onClick={() => {
                closeDrawer();
                loggedIn && onLogout();
              }}
              block
            >
              {loggedIn ? "Logout" : "Login"}
            </Button>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
}

export default AppHeader;
