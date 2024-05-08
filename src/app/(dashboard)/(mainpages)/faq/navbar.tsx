import ComboBox from "@/components/form/dynamicForm/comboBox";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { TRoot } from "@/services";
import { useGetServiceProductsQuery } from "@/services/product";
import { TProductGet } from "@/services/product/types";
import { useGetAllServicesQuery } from "@/services/service";
import { TService, TServiceGet } from "@/services/service/types";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Tabs } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

const FAQNavbar = ({
  serviceId,
  productId,
  setProductId,
  servicesRes,
  productsRes,
}: {
  serviceId: string;
  productId: string;
  setProductId: Dispatch<SetStateAction<string>>;
  servicesRes: UseQueryResult<AxiosResponse<TRoot<TService[]>, any>, Error>;
  productsRes: UseQueryResult<AxiosResponse<TRoot<TProductGet[]>, any>, Error>;
}) => {
  const { setQuery } = useGlobalFunctions();

  const services = servicesRes.data?.data?.data;
  const servicesNames = services?.map((el) => el.name) || [];

  const products = productsRes.data?.data?.data;
  const productsNames = products?.map((el) => el.name) || [];

  const handleProductSelect = (selected?: string) => {
    if (!selected) {
      setProductId("");
      return;
    }
    const productId =
      products?.find((el) => el.name.toLowerCase() === selected.toLowerCase())
        ?.id || "";
    setProductId(productId);
  };

  const handleServiceSelect = (selected?: string) => {
    if (!selected) return;
    const serviceId =
      services?.find((el) => el.name.toLowerCase() === selected.toLowerCase())
        ?.id || "";
    setQuery("serviceId", serviceId);
  };

  return (
    <div className="flex items-center gap-6 md:justify-between pt-2">
      <Tabs
        aria-label="Services"
        style="underline"
        className="hidden gap-6 flex-nowrap overflow-auto whitespace-nowrap md:flex !border-none"
        onActiveTabChange={(active) => {
          setQuery("serviceId", services?.[active]?.id || "");
        }}
      >
        {services?.map((service) => (
          <Tabs.Item key={service.id} title={service.name}></Tabs.Item>
        ))}
      </Tabs>
      <div className="flex gap-6 pt-2 md:justify-between">
        <ComboBox
          name="services"
          options={servicesNames}
          handleSelect={handleServiceSelect}
          defaultValue={services?.find((el) => el.id === serviceId)?.name}
          optionsLoading={servicesRes.isLoading}
          optionsErrorMsg={servicesRes.error?.message}
          className={cn("max-w-max md:hidden", {
            hidden: services?.length === 0,
          })}
        />
        <ComboBox
          name="products"
          options={productsNames}
          handleSelect={handleProductSelect}
          defaultValue={products?.find((el) => el.id === productId)?.name}
          optionsLoading={productsRes.isLoading}
          optionsErrorMsg={productsRes.error?.message}
          className={cn("max-w-max", {
            hidden: products?.length === 0,
          })}
        />
      </div>
    </div>
  );
};

export default FAQNavbar;
