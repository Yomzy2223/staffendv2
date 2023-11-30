"use client";

import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface propsType {
  queryNav: { name: string; value: string }[];
  defaultActive?: number;
  variant?: number;
}

const QueryNav = ({ queryNav, defaultActive = 0, variant }: propsType) => {
  const { setQuery } = useGlobalFucntions();

  const searchParams = useSearchParams();

  return (
    <div className="flex gap-3 capitalize">
      {queryNav.map((el, i) => {
        let isActive =
          i === defaultActive
            ? !searchParams.get(el.name) ||
              el.value === searchParams.get(el.name)
            : el.value === searchParams.get(el.name);

        return (
          <Button
            color="ghost"
            key={el.value}
            onClick={() => setQuery(el.name, el.value)}
            className={cn("capitalize", {
              "bg-primary text-primary-foreground": isActive,
              "bg-label/[0.02]": !isActive,
              "bg-background text-primary border-b-2 border-b-primary":
                isActive && variant === 2,
            })}
          >
            {el.value}
          </Button>
        );
      })}
    </div>
  );
};

export default QueryNav;
