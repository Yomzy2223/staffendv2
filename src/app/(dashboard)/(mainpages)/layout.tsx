"use client";

import React, { ReactNode, useState } from "react";
import { GridPlusIcon } from "@/assets/icons";
import ServiceForm from "@/components/form/serviceForm";
import { Navigation } from "@/components/navigation";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useActions } from "./actions";

const layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const { navRoutes } = useActions();

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
