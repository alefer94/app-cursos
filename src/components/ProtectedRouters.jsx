import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="protected-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;