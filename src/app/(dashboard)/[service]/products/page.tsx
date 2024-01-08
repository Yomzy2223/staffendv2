"use client";

import ProductCard from "@/components/cards/productCard";
import DoChecks from "@/components/DoChecks";
import ProductsHeader from "@/components/header/productsHeader";
import SearchComp from "@/components/search";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { Button } from "flowbite-react";
import React from "react";

const Products = () => {
  return (
    <div className="-mx-5 md:-mx-8 space-y-4 lg:space-y-6">
      <ProductsHeader title="Business Registration" />

      <CardWrapper className="border border-border shadow-sm mx-5 my-4 lg:mx-8 lg:my-6">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-6">
            <span>Products (0)</span>
            <div className="flex items-center gap-6 flex-1 justify-end">
              <SearchComp onSubmit={() => console.log("searching text...")} />
              <Button color="primary" size="lg">
                Add Product
              </Button>
            </div>
          </div>
          <SearchComp
            onSubmit={() => console.log("searching text...")}
            wrapperClassName="flex md:hidden mt-4"
          />
        </div>

        <DoChecks items={[""]} emptyText="You have not added any product">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6">
            {Array(10)
              .fill("")
              .map((product, i) => (
                <ProductCard key={i} />
              ))}
          </div>
        </DoChecks>
      </CardWrapper>
    </div>
  );
};

export default Products;
