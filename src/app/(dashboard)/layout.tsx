import { Header } from "@/components/header/mainHeader";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-[100vw] overflow-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
