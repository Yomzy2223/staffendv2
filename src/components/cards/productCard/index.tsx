import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { productType } from "@/hooks/api/productApi";
import { Currency, MoreHorizontal, Timer, WholeWord } from "lucide-react";
import React from "react";

const ProductCard = ({ info }: propsType) => {
  return (
    <div className="flex-1 max-w-[420px] min-w-[300px] p-4 rounded-lg border border-border">
      <div className="border-b border-border pb-4">
        <div className="flex justify-between gap-6">
          <div>
            <span className="text-base font-semibold mr-2.5">{info?.name}</span>
            <span className="text-xs font-normal text-success-foreground bg-success px-2.5 py-0.5">
              {info?.feature?.[0]}
            </span>
          </div>
          <Menubar className="p-0 h-max border-none">
            <MenubarMenu>
              <MenubarTrigger asChild className="p-0 cursor-pointer">
                <MoreHorizontal color="hsl(var(--foreground-5))" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Edit</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="text-destructive-foreground hover:!text-destructive-foreground hover:!bg-destructive">
                  Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <p className="text-sm font-normal text-foreground-5">
          {info?.description}
        </p>
      </div>

      <ul className="flex flex-col gap-5 mt-4">
        <li className="flex gap-4 ">
          <WholeWord size={20} />
          <span className="font-normal text-base">{info?.country}</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">{info?.currency}</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">{info?.amount}</span>
        </li>
        <li className="flex gap-4 ">
          <Timer size={20} />{" "}
          <span className="font-normal text-base">{info?.timeline}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductCard;

interface propsType {
  info: productType;
}
