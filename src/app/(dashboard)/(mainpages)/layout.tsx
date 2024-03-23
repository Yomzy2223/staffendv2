"use client";

import React, { ReactNode, useState } from "react";
import { GridPlusIcon } from "@/assets/icons";
import ServiceForm from "@/components/form/serviceForm";
import { Navigation } from "@/components/navigation";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useActions } from "./actions";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

const layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { navRoutes } = useActions();
  const { setQuery } = useGlobalFunctions();

  const openServiceForm = () => {
    // push("/services");
    setQuery("action", "add");
    setOpen(true);
  };

  return (
    <>
      <Navigation
        navRoutes={navRoutes}
        className="hidden py-5 md:flex bg-label/[0.02]"
        others={
          <Button
            color="ghost"
            className="text-primary"
            onClick={openServiceForm}
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
