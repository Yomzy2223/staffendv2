"use client";

import React, { ReactNode, useState } from "react";
import { GridPlusIcon } from "@/assets/icons";
import ServiceForm from "@/components/form/serviceForm";
import { Navigation } from "@/components/navigation";
import { Button } from "flowbite-react";
import Image from "next/image";

const layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navigation
        navRoutes={navRoutes}
        className="hidden py-5 md:flex bg-label/[0.02]"
        others={
          <Button
            color="ghost"
            className="text-primary"
            onClick={() => setOpen(true)}
          >
            <Image src={GridPlusIcon} alt="" />
            Add new service
          </Button>
        }
      />

      <div className="flex flex-col flex-1 px-5 md:px-8">{children}</div>

      <ServiceForm setOpen={setOpen} open={open} />
    </>
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
        name: "Business Registration",
        to: "/services/launch",
      },
      {
        name: "Manage",
        to: "/services/manage",
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
