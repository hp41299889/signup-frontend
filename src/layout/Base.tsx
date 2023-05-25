import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const { Content } = Layout;

const Base: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Base;
