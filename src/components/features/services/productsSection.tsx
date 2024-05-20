"use client";

import ProductCard from "@/components/cards/productCard";
import ProductForm from "@/components/form/productForms";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import {
  useDeleteProductMutation,
  useGetServiceProductsQuery,
} from "@/services/product";
import { TProductGet } from "@/services/product/types";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const ProductsSection = () => {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";

  const { data } = useGetServiceProductsQuery(serviceId);
  const serviceProducts = data?.data?.data;

  const deleteProductMutation = useDeleteProductMutation();

  const addNewProduct = () => {
    setOpen(true);
  };

  const deleteProduct = ({
    info,
    setOpenConfirm,
  }: {
    info: TProductGet;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => {
    deleteProductMutation.mutate(info.id, {
      onSuccess: () => setOpenConfirm(false),
    });
  };

  return (
    <div>
      <ItemsWrapper
        title="Products"
        btnAction={addNewProduct}
        items={serviceProducts || []}
        emptyText="You have not added any product"
        btnText="Add product"
      >
        {serviceProducts?.map((product, i: number) => (
          <ProductCard
            key={i}
            info={product}
            setOpenEdit={setOpen}
            handleDelete={deleteProduct}
            isLoading={deleteProductMutation.isPending}
          />
        ))}
      </ItemsWrapper>
      {open && <ProductForm open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ProductsSection;
