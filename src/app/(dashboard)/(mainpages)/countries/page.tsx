"use client";

import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import React, { useState } from "react";

const Countries = () => {
  const [open, setOpen] = useState(false);

  // const { useGetServiceQuery } = useServiceApi();
  // const { useGetServiceProductsQuery, deleteProductMutation } = useProductApi();
  // const { data } = useGetServiceProductsQuery(serviceId.toString());
  // const product = useGetServiceQuery(serviceId.toString());
  // const productInfo = product.data?.data?.data;

  // const serviceProducts = data?.data?.data;

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
    <ItemsWrapper
      title="Countries"
      btnAction={addNewCountry}
      // items={serviceProducts}
      emptyText="You have not added any product"
      btnText="Add product"
    >
      {/* {serviceProducts?.map((product: productFullType, i: number) => (
        <ProductCard
          key={i}
          info={product}
          setOpen={setOpen}
          handleDelete={deleteProduct}
          isLoading={deleteProductMutation.isPending}
        />
      ))}
      {open && <CountryForm open={open} setOpen={setOpen} />} */}
    </ItemsWrapper>
  );
};

export default Countries;
