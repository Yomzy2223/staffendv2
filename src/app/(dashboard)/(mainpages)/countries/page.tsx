"use client";

import CountryCard from "@/components/cards/countryCard";
import CountryForm from "@/components/form/countryForm";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { ICountry, ICountryFull } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { useCountryApi } from "@/hooks/useCountryApi";
import React, { Dispatch, SetStateAction, useState } from "react";

const Countries = () => {
  const [open, setOpen] = useState(false);

  const { getAllCountriesQuery, deleteCountryMutation } = useCountryApi();
  const { data } = getAllCountriesQuery;

  const serviceProducts = data?.data?.data;

  const addNewCountry = () => {
    setOpen(true);
  };

  const deleteProduct = ({
    info,
    setOpenConfirm,
  }: {
    info: ICountryFull;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    deleteCountryMutation.mutate(info.id, {
      onSuccess: () => setOpenConfirm(false),
    });
  };

  return (
    <div>
      <ItemsWrapper
        title="Countries"
        btnAction={addNewCountry}
        items={serviceProducts}
        emptyText="You have not added any country"
        btnText="Add country"
      >
        {serviceProducts?.map((country: ICountryFull, i: number) => (
          <CountryCard
            key={i}
            info={country}
            setOpen={setOpen}
            handleDelete={deleteProduct}
            isLoading={deleteCountryMutation.isPending}
          />
        ))}
      </ItemsWrapper>
      {open && <CountryForm open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Countries;
