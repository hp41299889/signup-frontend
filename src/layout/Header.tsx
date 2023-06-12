import React from "react";
import { Layout, Menu, MenuProps, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/">首頁</Link>,
  },
  {
    key: "2",
    label: <Link to="/signup">我要報名</Link>,
  },
  {
    key: "3",
    label: <Link to="/service">客服資訊</Link>,
  },
];

const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        padding: "0",
        width: "auto",
        height: "auto",
      }}
    >
      <Space.Compact
        direction="vertical"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Title>兆豐銀行福委會2023悠活家庭日報名系統</Title>
        <Menu items={items} mode="horizontal" defaultSelectedKeys={["1"]} />
      </Space.Compact>
    </Layout.Header>
  );
};

export default Header;
