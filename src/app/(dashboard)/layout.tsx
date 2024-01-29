import { Header } from "@/components/header/mainHeader";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />

      <div className="flex-1 px-5 md:px-8">{children}</div>
    </div>
  );
};

export default Layout;
