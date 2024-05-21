"use client";

import PartnerReqCard from "@/components/cards/partnerReqCard";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { ICountryFull } from "@/hooks/api/types";
import { useCountryApi } from "@/hooks/useCountryApi";
import usePartnerApi from "@/hooks/usePartnerApi";
import React, { Dispatch, SetStateAction, useState } from "react";

const Partners = () => {
  const [open, setOpen] = useState(false);

  const { deletePartnerFormMutation } = usePartnerApi();

  const { getAllCountriesQuery } = useCountryApi();
  const countries = getAllCountriesQuery;
  const countriesData = countries.data?.data?.data;

  const createRequirement = () => {
    setOpen(true);
  };

  const deleteForm = ({
    info,
    setOpenConfirm,
  }: {
    info: ICountryFull;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    deletePartnerFormMutation.mutate(info.id, {
      onSuccess: () => setOpenConfirm(false),
    });
  };

  return (
    <div className="-mx-5 md:-mx-8 space-y-4 lg:space-y-6">
      <div className="bg-primary/30 flex justify-between items-center gap-6 shadow-md px-5 py-4 lg:px-8">
        <h2 className="sb-text-24 font-semibold capitalize">Partner</h2>
      </div>

      <ItemsWrapper
        title="Products"
        btnAction={createRequirement}
        items={countriesData}
        emptyText="You have not added any product"
        btnText="Add product"
      >
        {countriesData?.map((country: ICountryFull, i: number) => (
          <PartnerReqCard
            key={i}
            info={country}
            setOpenEdit={setOpen}
            handleDelete={deleteForm}
            isLoading={deletePartnerFormMutation.isPending}
          />
        ))}
      </ItemsWrapper>
    </div>
  );
};

export default Partners;
