"use client";

import FAQCard from "@/components/cards/FAQCard";
import FAQForm from "@/components/form/FAQForm";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useDeleteFAQMutation, useGetServiceFAQsQuery } from "@/services/faq";
import { TFAQ } from "@/services/faq/types";
import { useGetAllServicesQuery } from "@/services/service";
import { Tabs } from "flowbite-react";
import { redirect, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const FAQ = () => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFunctions();

  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data;

  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";
  if (!serviceId && services?.[0].id)
    setQuery("serviceId", `${services?.[0].id}`);

  const { data } = useGetServiceFAQsQuery(serviceId);
  const FAQs = data?.data?.data;

  const deleteFAQMutation = useDeleteFAQMutation();

  const addNewFAQ = () => {
    setOpen(true);
  };

  const deleteFAQ = ({
    info,
    setOpenConfirm,
  }: {
    info: TFAQ;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    deleteFAQMutation.mutate(info.id, {
      onSuccess: () => setOpenConfirm(false),
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Tabs
        aria-label="Services"
        style="underline"
        className="gap-6"
        onActiveTabChange={(active) =>
          setQuery("serviceId", services?.[active]?.id || "")
        }
      >
        {services?.map((service) => (
          <Tabs.Item key={service.id} active title={service.name}>
            <ItemsWrapper
              title="Define FAQs"
              btnAction={addNewFAQ}
              items={FAQs || []}
              emptyText="You have not added any FAQ"
              btnText="Add FAQ"
            >
              {FAQs?.map((faq, i: number) => (
                <FAQCard
                  key={i}
                  info={faq}
                  setOpenEdit={setOpen}
                  handleDelete={deleteFAQ}
                  isLoading={deleteFAQMutation.isPending}
                />
              ))}
            </ItemsWrapper>
          </Tabs.Item>
        ))}
      </Tabs>

      <FAQForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default FAQ;
