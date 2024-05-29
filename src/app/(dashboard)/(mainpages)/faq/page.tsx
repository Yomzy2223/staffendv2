"use client";

import FAQCard from "@/components/cards/FAQCard";
import DoChecks from "@/components/DoChecks";
import FAQForm from "@/components/form/FAQForm";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { useDeleteFAQMutation, useGetServiceFAQsQuery } from "@/services/faq";
import { TFAQ } from "@/services/faq/types";
import { useGetServiceProductsQuery } from "@/services/product";
import { useGetAllServicesQuery } from "@/services/service";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import FAQNavbar from "./navbar";

const FAQ = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data;

  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || services?.[0]?.id || "";

  const productsRes = useGetServiceProductsQuery(serviceId);
  const products = productsRes.data?.data?.data;

  const serviceFAQ = useGetServiceFAQsQuery(serviceId);

  const normalize = (value: string) => value.toLowerCase().trim();

  const FAQs = serviceFAQ.data?.data?.data;
  let filteredFAQ = FAQs;
  if (productId) filteredFAQ = filteredFAQ?.filter((el) => el.productId === productId);
  if (searchValue) {
    filteredFAQ = filteredFAQ?.filter(
      (el) =>
        normalize(el.question).includes(normalize(searchValue)) ||
        normalize(el.answer).includes(normalize(searchValue)) ||
        normalize(el.requestState).includes(normalize(searchValue))
    );
  }

  const deleteFAQMutation = useDeleteFAQMutation();

  const deleteFAQ = ({ info }: { info: TFAQ }) => {
    deleteFAQMutation.mutate(info.id);
  };

  const handleEmptyAction = () => {
    if ((products?.length ?? 0) > 0) {
      setOpen(true);
      return;
    }
    router.push(`/services/${serviceId}/products`);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ItemsWrapper
        title="Define FAQs"
        btnAction={() => router.push(`/services`)}
        items={services || []}
        emptyText="You have not added any service"
        btnText="Add Service"
        itemActionText="Create FAQ"
        itemAction={() => setOpen(true)}
        onSearchChange={(value) => setSearchValue(value)}
        navbar={
          <FAQNavbar
            serviceId={serviceId}
            productId={productId}
            setProductId={setProductId}
            productsRes={productsRes}
            servicesRes={servicesRes}
          />
        }
      >
        <DoChecks
          items={FAQs || products || []}
          emptyText={
            (products?.length ?? 0) > 0
              ? "You have not created any FAQ"
              : "You have not created any product for this service, hence cannot add FAQ"
          }
          btnText={(products?.length ?? 0) > 0 ? "Add FAQ" : "Add Product"}
          btnAction={handleEmptyAction}
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6"
        >
          {filteredFAQ?.map((faq, i: number) => (
            <FAQCard
              key={i}
              info={faq}
              setOpenEdit={setOpen}
              handleDelete={deleteFAQ}
              isLoading={deleteFAQMutation.isPending}
            />
          ))}
        </DoChecks>
      </ItemsWrapper>

      <FAQForm open={open} setOpen={setOpen} serviceId={serviceId} />
    </div>
  );
};

export default FAQ;
