"use client";

import CountryForm from "@/components/form/countryForm";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { useCountryApi } from "@/hooks/useCountryApi";
import React, { useState } from "react";

const Countries = () => {
  const [open, setOpen] = useState(false);

  const { getAllCountriesQuery, deleteCountryMutation } = useCountryApi();
  const { data } = getAllCountriesQuery;

  const serviceProducts = data?.data?.data;

  const addNewCountry = () => {
    setOpen(true);
    // setQuery("action", "add");
  };

  const deleteProduct = ({}: // info,
  // setOpenConfirm,
  {
    // info: productFullType;
    // setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    // deleteProductMutation.mutate(info.id, {
    //   onSuccess: () => setOpenConfirm(false),
    // });
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
        {/* {serviceProducts?.map((product: productFullType, i: number) => (
        <ProductCard
          key={i}
          info={product}
          setOpen={setOpen}
          handleDelete={deleteProduct}
          isLoading={deleteProductMutation.isPending}
        />
      ))}*/}
      </ItemsWrapper>
      {open && <CountryForm open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Countries;
