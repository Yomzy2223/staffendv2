"use client";

import ProductCard from "@/components/cards/productCard";
import ProductForm from "@/components/form/productForms";
import ProoductsHeader from "@/components/header/productsHeader";
import ItemsWrapper from "@/components/wrappers/itemsWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useDeleteProductMutation,
  useGetServiceProductsQuery,
} from "@/services/product";
import { TProductGet } from "@/services/product/types";
import { useGetServiceQuery } from "@/services/service";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);

  const { serviceId } = useParams();
  const { data } = useGetServiceProductsQuery(serviceId.toString());
  const product = useGetServiceQuery(serviceId.toString());
  const productInfo = product.data?.data?.data;

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
    <div className="space-y-4 lg:space-y-6">
      <ProoductsHeader title={productInfo?.name || ""} />
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

export default Products;
