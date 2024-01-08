"use client";

import { Button } from "flowbite-react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ProductsHeader = ({ title }: { title: string }) => {
  const { push } = useRouter();
  const { service } = useParams();

  return (
    <div className="bg-primary/30 flex justify-between items-center gap-6 px-5 py-4 lg:px-8">
      <div className="flex items-center">
        <Button color="ghost" size="fit">
          <ArrowLeft onClick={() => push("/" + service)} />
        </Button>
        <span className="sb-text-24 font-semibold ml-4 lg:ml-6">{title}</span>
      </div>
      <Button color="ghost" size="fit" className="flex items-center gap-2">
        <span className="text-sm font-normal hidden sm:block">
          Edit service
        </span>
        <span className="text-sm font-normal sm:hidden">Edit</span>
        <ExternalLink size={16} />
      </Button>
    </div>
  );
};

export default ProductsHeader;
