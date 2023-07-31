import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatBox from "../Chat/ChatBox"

const Layout = () => {
  return (
    <div>
      <Header />
      <div >
        <Outlet />
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default Layout;
