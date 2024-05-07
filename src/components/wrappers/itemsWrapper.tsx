import { Button } from "flowbite-react";
import React, { ReactNode } from "react";
import DoChecks from "../DoChecks";
import SearchComp from "../search";
import CardWrapper from "./cardWrapper";

const ItemsWrapper = ({
  children,
  items,
  btnAction,
  title,
  btnText,
  emptyText,
  onSearchChange,
  onSearchSubmit,
  tabNav,
}: IProps) => {
  return (
    <DoChecks
      items={items}
      emptyText={emptyText}
      btnText={btnText}
      btnAction={btnAction}
    >
      <div className="border border-border shadow-sm my-4 px-4 py-6 lg:my-6">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-6">
            <span>
              {title} ({items?.length || 0})
            </span>
            <div className="flex items-center gap-6 flex-1 justify-end">
              <SearchComp onSubmit={() => console.log("searching text...")} />
              <Button color="primary" size="lg" onClick={btnAction}>
                {btnText}
              </Button>
            </div>
          </div>
          <SearchComp
            onSubmit={onSearchSubmit}
            onChange={onSearchChange}
            wrapperClassName="flex md:hidden mt-4"
          />
        </div>
        {tabNav}

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
  onSearchChange?: (e: string) => void;
  onSearchSubmit?: (e: string) => void;
  tabNav?: any;
}
//  mx - 5;
//  lg: mx - 8;
