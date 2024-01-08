import CardWrapper from "@/components/wrappers/cardWrapper";
import {
  Check,
  Currency,
  Menu,
  MoreHorizontal,
  Timer,
  WholeWord,
} from "lucide-react";
import React from "react";

const ProductCard = () => {
  return (
    <div className="flex-1 max-w-[420px] min-w-[300px] p-4 rounded-lg border border-border">
      <div className="border-b border-border pb-4">
        <div className="flex justify-between gap-6">
          <div>
            <span className="text-base font-semibold mr-2.5">Basic</span>
            <span className="text-xs font-normal text-success-foreground bg-success px-2.5 py-0.5">
              Private
            </span>
          </div>
          <MoreHorizontal color="hsl(var(--foreground-5))" />
        </div>
        <p className="text-sm font-normal text-foreground-5">
          Sole proprietorship
        </p>
      </div>

      <ul className="flex flex-col gap-5 mt-4">
        <li className="flex gap-4 ">
          <WholeWord size={20} />
          <span className="font-normal text-base">Angola</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">NGN</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">40,000</span>
        </li>
        <li className="flex gap-4 ">
          <Timer size={20} />{" "}
          <span className="font-normal text-base">10 to 15 working days</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductCard;
