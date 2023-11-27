import { Navigation } from "@/components/navigation/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation navRoutes={navRoutes} className="hidden my-5 md:flex" />
      {children}
    </div>
  );
};

export default Layout;

const navRoutes = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Services",
    to: "/services",
    type: "select",
    options: ["United States", "Canada", "France", "Germany"],
  },
  {
    name: "Countries",
    to: "/countries",
  },
  {
    name: "Hiring and Payroll",
    to: "/hiring-and-payroll",
  },
  {
    name: "Bank Accounts",
    to: "/bank-accounts",
  },
  {
    name: "Rewards",
    to: "/rewards",
  },
  {
    name: "Promocodes",
    to: "/promocodes",
  },
  {
    name: "User management",
    to: "/user-management",
  },
  {
    name: "Payment",
    to: "/payment",
  },
  {
    name: "Resources",
    to: "/promocodes",
  },
  {
    name: "Partners",
    to: "/partners",
  },
];
