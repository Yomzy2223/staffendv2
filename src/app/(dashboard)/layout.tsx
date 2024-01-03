import { Navigation } from "@/components/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation
        navRoutes={navRoutes}
        className="hidden py-5 md:flex bg-label/[0.02]"
      />
      <div className="flex-1 px-5 md:px-8">{children}</div>
    </div>
  );
};

export default Layout;

// Dashboard navigation routes
const navRoutes = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Services",
    to: "/services",
    type: "select",
    options: [
      {
        name: "Manage",
        to: "/manage",
      },
      {
        name: "Launch",
        to: "/launch",
      },
      {
        name: "Tax",
        to: "/tax",
      },
      {
        name: "Compliance",
        to: "/compliance",
      },
    ],
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
