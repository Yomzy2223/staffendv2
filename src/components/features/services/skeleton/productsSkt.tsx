import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsSkt = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6">
      {Array(7)
        .fill("")
        .map((el, i) => (
          <Skeleton key={i} className="h-52" />
        ))}
    </div>
  );
};

export default ProductsSkt;
