"use client";

import ConfirmAction from "@/components/confirmAction";
import ProductsSection from "@/components/features/services/productsSection";
import ServicesSection from "@/components/features/services/servicesSection";
import ServiceTableSection from "@/components/features/services/serviceTableSection";
import ServiceForm from "@/components/form/serviceForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/services/service";
import { Button, Tabs, TabsRef } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import slugify from "slugify";

const Service = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const tabsRef = useRef<TabsRef>(null);

  const { setQuery } = useGlobalFunctions();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";
  const activeTab = searchParams.get("activeTab") || "0";

  const deleteService = useDeleteServiceMutation();
  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data?.sort(
    (a, b) => a.priority - b.priority
  );

  useEffect(() => {
    tabsRef.current?.setActiveTab(parseInt(activeTab));
  }, [activeTab]);

  useEffect(() => {
    if (!serviceId && services?.[0])
      setQuery("serviceId", `${slugify(services[0].id)}`);
  }, [serviceId, services]);

  const activeServices = services?.find((el) => el.id === serviceId);

  const handleDeleteService = () => {
    deleteService.mutate(serviceId, {
      onSuccess: () => {
        setOpenConfirm(false);
      },
    });
  };

  return (
    <div className="space-y-8">
      <ServicesSection
        services={services}
        isLoading={servicesRes.isLoading}
        errMsg={servicesRes.error?.message}
      />
      <div className="px-4 lg:px-6">
        {servicesRes.isLoading && (
          <div className="flex justify-between gap-6 mb-6">
            <div>
              <Skeleton className="h-8 w-64 mb-1" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        )}
        {activeServices?.name && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="sb-text-24 font-semibold first-letter:uppercase">
                {activeServices?.name}
              </h3>
              <p className="sb-text-16 text-foreground-3 first-letter:uppercase max-w-[500px]">
                {activeServices?.description}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Button
                color="transparent"
                size="fit"
                onClick={() => setOpenConfirm(true)}
                className="[&>span]:text-destructive-foreground"
              >
                Delete
              </Button>
              <Button
                outline
                size="lg"
                onClick={() => {
                  serviceId && setOpen(true);
                  serviceId && setQuery("action", "edit");
                }}
                className="[&>span]:text-primary"
              >
                Edit service
              </Button>
            </div>
          </div>
        )}
        {openConfirm && (
          <ConfirmAction
            open={openConfirm}
            setOpen={setOpenConfirm}
            confirmAction={handleDeleteService}
            title={`Delete ${activeServices?.name || ""}`}
            description="Are you sure you want to delete this service?"
            isLoading={deleteService.isPending}
            dismissible={!deleteService.isPending}
            isDelete
          />
        )}
        <Tabs
          ref={tabsRef}
          aria-label="tabs"
          style="underline"
          onActiveTabChange={(active) => setQuery("activeTab", active)}
          className="gap-6 max-w-max"
        >
          <Tabs.Item active title="Users requests" />
          <Tabs.Item active title="Available Products" />
        </Tabs>
      </div>
      {activeTab === "0" && <ServiceTableSection basePath="services" />}
      {activeTab === "1" && <ProductsSection />}
      <ServiceForm setOpen={setOpen} open={open} />
    </div>
  );
};

export default Service;
