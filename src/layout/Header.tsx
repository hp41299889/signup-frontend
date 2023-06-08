import React from "react";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
  const isXS = useMediaQuery({ maxWidth: 991.9 });
  const isLG = useMediaQuery({ minWidth: 992 });

  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        padding: "0",
        width: "auto",
        height: "auto",
      }}
    >
      {isXS && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>
              <MenuOutlined style={{ fontSize: "22px" }} />
            </Button>
          </Dropdown>
          <Title
            style={{
              marginTop: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            兆豐銀行福委會2023
            <br />
            悠活家庭日報名系統
          </Title>
        </Space>
      )}
      {isLG && (
        <Space.Compact
          direction="vertical"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Title>兆豐銀行福委會2023悠活家庭日報名系統</Title>
          <Menu items={items} mode="horizontal" defaultSelectedKeys={["1"]} />
        </Space.Compact>
      )}
    </Layout.Header>
  );
};

export default Header;
