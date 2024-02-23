"use client";

import CountryCard from "@/components/cards/countryCard";
import CountryForm from "@/components/form/countryForm";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { ICountryFull } from "@/hooks/api/types";
import { useCountryApi } from "@/hooks/useCountryApi";
import React, { useState } from "react";

const Countries = () => {
  const [open, setOpen] = useState(false);

  const { getAllCountriesQuery } = useCountryApi();
  const { data } = getAllCountriesQuery;

  const serviceProducts = data?.data?.data;

  const addNewCountry = () => {
    setOpen(true);
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
          <CountryCard key={i} info={country} setOpen={setOpen} />
        ))}
      </ItemsWrapper>
      {open && <CountryForm open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Countries;
