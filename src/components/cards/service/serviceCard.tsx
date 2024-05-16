"use client";

import ServiceForm from "@/components/form/serviceForm";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { useGetServiceProductsQuery } from "@/services/product";
import { TService } from "@/services/service/types";
import { Button } from "flowbite-react";
import { ExternalLink } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ServiceCardSkeleton from "./serviceCardSkeleton";

const ServiceCard = ({ serviceData, isLoading }: IProps) => {
  const [open, setOpen] = useState(false);

  const { setQuery } = useGlobalFunctions();

  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const serviceProductsRes = useGetServiceProductsQuery(serviceData?.id || "");
  const serviceProducts = serviceProductsRes.data?.data?.data || [];

  const total = serviceProducts?.length;

  let totalProducts = "0 product";
  if (total > 0) totalProducts = total + " product";
  if (total > 1) totalProducts = total + " products";

  const openServiceForm = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  if (isLoading) return <ServiceCardSkeleton />;

  return (
    <div
      className={cn(
        "cursor-pointer flex flex-col justify-center gap-2 rounded-2xl w-full min-w-[276px] max-w-[300px] h-[138px] ring-1 ring-border transition-all px-4 md:px-6",
        {
          "ring-primary shadow-lg": serviceId === serviceData?.id,
        }
      )}
      onClick={() => setQuery("serviceId", serviceData?.id || "")}
      tabIndex={0}
    >
      <div>
        <p className="text-base font-semibold capitalize">
          {serviceData?.name}
        </p>
        <p className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-foreground-3 text-sm mb-2">
          {serviceData?.description}
        </p>
        <p className="inline-flex justify-between text-sm font-normal w-full text-foreground-5">
          <span>{totalProducts} available</span>
          <Button
            size="fit"
            color="ghost"
            className="w-max [&_span]:gap-1 text-primary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/services/${serviceData?.id}/products`);
            }}
          >
            <span className="text-sm font-normal mr-1">See all</span>
            <ExternalLink size={16} />
          </Button>
        </p>
      </div>

      <ServiceForm setOpen={setOpen} open={open} />
    </div>
  );
};

export default ServiceCard;

interface IProps {
  serviceData?: TService;
  isLoading?: boolean;
}
