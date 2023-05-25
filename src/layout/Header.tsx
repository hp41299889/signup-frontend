import React from "react";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/">首頁</Link>,
  },
  {
    key: "2",
    label: <Link to="/signup">報名</Link>,
  },
  {
    key: "3",
    label: <Link to="/service">客服資訊</Link>,
  },
];

const Header: React.FC = () => {
  return (
    <Layout.Header style={{ background: "#ffffff", padding: "0" }}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button>
          <MenuOutlined style={{ fontSize: "22px" }} />
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
