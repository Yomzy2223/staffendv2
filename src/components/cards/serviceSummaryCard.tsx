"use client";

import { IService } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import useServiceApi from "@/hooks/useServiceApi";
import { Button } from "flowbite-react";
import { ExternalLink } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ServiceForm from "../form/serviceForm";
import CardWrapper from "../wrappers/cardWrapper";
import ServiceCardSkeleton from "./serviceCardSkeleton";

const ServiceSummaryCard = ({ totalProducts }: { totalProducts: number }) => {
  const [open, setOpen] = useState(false);

  const { setQuery } = useGlobalFunctions();
  const { push } = useRouter();
  const { serviceId } = useParams();

  const { useGetServiceQuery } = useServiceApi();
  const { data, isLoading } = useGetServiceQuery(serviceId as string);
  const serviceData: IService = data?.data?.data;

  const openServiceForm = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  if (isLoading) return <ServiceCardSkeleton />;

  return (
    <CardWrapper
      className="cursor-pointer flex flex-col justify-between gap-4 bg-serviceCardBG rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]"
      onClick={() => !open && push(serviceId.toString() + "/products")}
    >
      <div>
        <p className="sb-text-24 font-semibold mb-2 capitalize">
          {serviceData?.name}
        </p>
        <p className="text-sm font-normal">
          {totalProducts} products available
        </p>
      </div>

      <Button
        size="fit"
        color="ghost"
        className="w-max [&_span]:gap-1"
        onMouseDown={openServiceForm}
      >
        <span className="text-sm font-normal mr-1">Edit Service</span>
        <ExternalLink size={16} />
      </Button>

      <ServiceForm setOpen={setOpen} open={open} />
    </CardWrapper>
  );
};

export default ServiceSummaryCard;
