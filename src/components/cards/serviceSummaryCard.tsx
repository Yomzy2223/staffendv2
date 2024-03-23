"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { ExternalLink } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ServiceForm from "../form/serviceForm";
import CardWrapper from "../wrappers/cardWrapper";

const ServiceSummaryCard = ({
  title,
  totalProducts,
}: {
  title: string;
  totalProducts: number;
}) => {
  const [open, setOpen] = useState(false);

  const { setQuery } = useGlobalFunctions();
  const { push } = useRouter();
  const { serviceId } = useParams();

  const openServiceForm = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <CardWrapper
      className="cursor-pointer flex flex-col justify-between gap-4 bg-serviceCardBG rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]"
      onClick={() => !open && push(serviceId.toString() + "/products")}
    >
      <div>
        <p className="sb-text-24 font-semibold mb-2">{title}</p>
        <p className="text-sm font-normal">
          {totalProducts} products available
        </p>
      </div>

      <Button
        size="fit"
        color="ghost"
        className="w-max"
        onMouseDown={openServiceForm}
      >
        <span className="text-sm font-normal mr-2">See service form</span>
        <ExternalLink size={16} />
      </Button>

      <ServiceForm setOpen={setOpen} open={open} />
    </CardWrapper>
  );
};

export default ServiceSummaryCard;
