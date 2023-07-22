import React, { ReactNode } from "react";
import Navbar from "../common/navbar/navbar";
import Sidebar from "../common/sidebar/sidebar";
import { Layout } from "antd";

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout style={{ flex: 1, padding: "24px" }}>{children}</Layout>
        </Layout>
      </div>
    </div>
  );
};

export default DefaultLayout;
