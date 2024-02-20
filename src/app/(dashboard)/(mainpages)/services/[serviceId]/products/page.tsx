"use client";

import ProductCard from "@/components/cards/productCard";
import ProductForm from "@/components/form/productForms";
import ProoductsHeader from "@/components/header/productsHeader";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { productFullType } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import useProductApi from "@/hooks/useProductApi";
import useServiceApi from "@/hooks/useServiceApi";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFucntions();

  const { serviceId } = useParams();
  const { useGetServiceQuery } = useServiceApi();
  const { useGetServiceProductsQuery, deleteProductMutation } = useProductApi();
  const { data } = useGetServiceProductsQuery(serviceId.toString());
  const product = useGetServiceQuery(serviceId.toString());
  const productInfo = product.data?.data?.data;

  const serviceProducts = data?.data?.data;

  const addNewProduct = () => {
    setOpen(true);
    setQuery("action", "add");
  };

  const deleteProduct = ({
    info,
    setOpenConfirm,
  }: {
    info: productFullType;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    deleteProductMutation.mutate(info.id, {
      onSuccess: () => setOpenConfirm(false),
    });
  };

  return (
    <div className="-mx-5 md:-mx-8 space-y-4 lg:space-y-6">
      <ProoductsHeader title={productInfo?.name} />
      <ItemsWrapper
        title="Products"
        btnAction={addNewProduct}
        items={serviceProducts}
        emptyText="You have not added any product"
        btnText="Add product"
      >
        {serviceProducts?.map((product: productFullType, i: number) => (
          <ProductCard
            key={i}
            info={product}
            setOpen={setOpen}
            handleDelete={deleteProduct}
            isLoading={deleteProductMutation.isPending}
          />
        ))}
        {open && <ProductForm open={open} setOpen={setOpen} />}
      </ItemsWrapper>
    </div>
  );
};

export default Products;
