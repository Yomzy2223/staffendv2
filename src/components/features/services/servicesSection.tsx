import { GridPlusIcon } from "@/assets/icons";
import ServiceCard from "@/components/cards/service/serviceCard";
import ServiceCardSkeleton from "@/components/cards/service/serviceCardSkeleton";
import DoChecks from "@/components/DoChecks";
import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TService } from "@/services/service/types";
import { Button } from "flowbite-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ServicesSection = ({
  services,
  isLoading,
}: {
  services?: TService[];
  isLoading?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const { setQuery, isDesktop } = useGlobalFunctions();

  const openServiceForm = () => {
    setQuery("action", "add");
    setOpen(true);
  };

  return (
    <div className="flex flex-col border border-border">
      <div className="flex justify-between items-center gap-6 w-full px-4 lg:px-6 py-10 border-b border-border">
        <div>
          <h2 className="sb-text-24 font-semibold">
            Services ({services?.length || 0} available)
          </h2>
          <p className="text-sm text-foreground-4">
            See all available services below
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Button
            size="fit"
            color="ghost"
            className="text-primary"
            onClick={openServiceForm}
          >
            <Image src={GridPlusIcon} alt="" />
            {isDesktop ? "Add new service" : "New"}
          </Button>
        </div>
      </div>
      <ServiceForm
        setOpen={setOpen}
        open={open}
        priority={(services?.length ?? 0) + 1}
      />

      <DoChecks
        items={services || []}
        isLoading={isLoading}
        className="flex max-w-[100vw] overflow-x-auto gap-6 md:gap-8 p-4 md:px-6 pt-1"
        Skeleton={
          <div className="flex max-w-[100vw] overflow-x-auto gap-6 md:gap-8 p-6 pt-1">
            {["1", "2", "3", "4", "5"].map((el) => (
              <ServiceCardSkeleton key={el} />
            ))}
          </div>
        }
      >
        {services?.map((service) => (
          <ServiceCard
            key={service.name}
            serviceData={service}
            isLoading={isLoading}
          />
        ))}
      </DoChecks>
    </div>
  );
};

export default ServicesSection;
