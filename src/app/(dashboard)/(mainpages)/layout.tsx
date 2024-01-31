import React, { ReactNode } from "react";
import { Navigation } from "@/components/navigation";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation navRoutes={navRoutes} className="hidden py-5 md:flex bg-label/[0.02]" />
      {children}
    </div>
  );
};

export default layout;

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
        to: "/services/manage",
      },
      {
        name: "Launch",
        to: "/services/launch",
      },
      {
        name: "Tax",
        to: "/services/tax",
      },
      {
        name: "Compliance",
        to: "/services/compliance",
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
