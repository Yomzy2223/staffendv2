"use client";

import ProductCard from "@/components/cards/productCard";
import DoChecks from "@/components/DoChecks";
import ProductForm from "@/components/form/productForms";
import ProductsHeader from "@/components/header/productsHeader";
import SearchComp from "@/components/search";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { productFullType } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import useProductApi from "@/hooks/useProductApi";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFucntions();

  const { serviceId } = useParams();
  const { useGetServiceProductsQuery, deleteProductMutation } = useProductApi();
  const { data } = useGetServiceProductsQuery(serviceId.toString());

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
      <ProductsHeader title="Business Registration" />

      <DoChecks
        items={serviceProducts}
        emptyText="You have not added any product"
        btnText="Add new product"
        btnAction={addNewProduct}
      >
        <CardWrapper className="border border-border shadow-sm mx-5 my-4 lg:mx-8 lg:my-6">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-6">
              <span>Products ({serviceProducts?.length || 0})</span>
              <div className="flex items-center gap-6 flex-1 justify-end">
                <SearchComp onSubmit={() => console.log("searching text...")} />
                <Button color="primary" size="lg" onClick={addNewProduct}>
                  Add Product
                </Button>
              </div>
            </div>
            <SearchComp
              onSubmit={() => console.log("searching text...")}
              wrapperClassName="flex md:hidden mt-4"
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6">
            {serviceProducts?.map((product: productFullType, i: number) => (
              <ProductCard
                key={i}
                info={product}
                setOpen={setOpen}
                handleDelete={deleteProduct}
                isLoading={deleteProductMutation.isPending}
              />
            ))}
          </div>
        </CardWrapper>
      </DoChecks>

      <ProductForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default Products;
