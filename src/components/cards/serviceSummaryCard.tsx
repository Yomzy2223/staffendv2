"use client";

import { Button } from "flowbite-react";
import { ExternalLink, Link2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import CardWrapper from "../wrappers/cardWrapper";
import DialogWrapper from "../wrappers/dialogWrapper";

const ServiceSummaryCard = ({
  title,
  totalProducts,
}: {
  title: string;
  totalProducts: number;
}) => {
  const [open, setOpen] = useState(false);

  const { push } = useRouter();
  const { service } = useParams();
  console.log(service);

  return (
    <CardWrapper
      className="cursor-pointer flex flex-col justify-between gap-4 bg-serviceCardBG rounded-lg w-full min-w-[200px] max-w-[300px] h-[158px]"
      onClick={() => !open && push(service.toString() + "/products")}
    >
      <div>
        <p className="sb-text-24 font-semibold mb-2">{title}</p>
        <p className="text-sm font-normal">
          {totalProducts} products available
        </p>
      </div>

      <Button
        size="fit"
        color="ghost"
        className="w-max"
        onMouseDown={() => setOpen(true)}
      >
        <span className="text-sm font-normal mr-2">See service form</span>
        <DialogWrapper open={open} setOpen={setOpen} title="Title">
          Hello, wrap me
        </DialogWrapper>
        <ExternalLink size={16} />
      </Button>
    </CardWrapper>
  );
};

export default ServiceSummaryCard;
