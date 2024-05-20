import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { Search } from "lucide-react";
import React, { ReactNode } from "react";
import DoChecks from "../DoChecks";
import SearchComp from "../search";
import ItemsWrapperSkt from "./skeleton/itemsWrapperSkt";

const ItemsWrapper = ({
  children,
  items,
  btnAction,
  title,
  btnText,
  emptyText,
  errorText,
  isLoading,
  LoadingSkt,
  onSearchChange,
  onSearchSubmit,
  navbar,
  itemActionText,
  itemAction,
  btnOutline,
}: IProps) => {
  const { isDesktop } = useGlobalFunctions();

  return (
    <DoChecks
      items={items}
      emptyText={emptyText}
      errorText={errorText}
      btnText={btnText}
      btnAction={btnAction}
      isLoading={isLoading}
      Skeleton={<ItemsWrapperSkt LoadingSkt={LoadingSkt} />}
    >
      <div className="border border-border rounded shadow-sm my-4 px-4 lg:px-6 py-6 lg:my-6">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-6">
            <span className="sb-text-20 font-semibold">
              {title} ({items?.length || 0})
            </span>
            <div className="flex items-center gap-6 flex-1 justify-end">
              {isDesktop ? (
                <SearchComp
                  onSubmit={() => console.log("searching text...")}
                  onChange={onSearchChange}
                />
              ) : (
                <Search color="#727474" />
              )}
              <Button
                outline={btnOutline ? true : false}
                color={btnOutline ? "outline" : "primary"}
                size="lg"
                onClick={itemAction || btnAction}
                className={btnOutline ? "[&>span]:text-primary" : ""}
              >
                {itemActionText || btnText}
              </Button>
            </div>
          </div>
        </div>
        {navbar}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6">
          {children}
        </div>
      </div>
    </DoChecks>
  );
};

export default ItemsWrapper;

interface IProps {
  children: ReactNode;
  items: any[];
  btnAction: () => void;
  title: string;
  btnText: string;
  emptyText: string;
  errorText?: string;
  isLoading?: boolean;
  LoadingSkt?: ReactNode;
  onSearchChange?: (e: string) => void;
  onSearchSubmit?: (e: string) => void;
  navbar?: any;
  itemActionText?: string;
  itemAction?: () => void;
  btnOutline?: boolean;
}
//  mx - 5;
//  lg: mx - 8;
