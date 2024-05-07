"use client";

import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const ProoductsHeader = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  const { setQuery } = useGlobalFunctions();
  const { push } = useRouter();
  const { serviceId } = useParams();

  const openServiceForm = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <div className="bg-primary/30 flex justify-between items-center gap-6 shadow-md px-5 py-4 -mx-5 md:-mx-8 lg:px-8">
      <div className="flex items-center">
        <Button color="ghost" size="fit">
          <ArrowLeft onClick={() => push("/services/" + serviceId)} />
        </Button>
        <span className="sb-text-24 font-semibold ml-4 lg:ml-6 capitalize">
          {title}
        </span>
      </div>
      <Button
        color="ghost"
        size="fit"
        className="flex items-center gap-2"
        onClick={openServiceForm}
      >
        <span className="text-sm font-normal hidden sm:block">
          Edit service
        </span>
        <span className="text-sm font-normal sm:hidden">Edit</span>
        <ExternalLink size={16} />
      </Button>

      {open && <ServiceForm setOpen={setOpen} open={open} />}
    </div>
  );
};

export default ProoductsHeader;
