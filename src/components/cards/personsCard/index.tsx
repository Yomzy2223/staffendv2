"use client";

import QueryNav3 from "@/components/navigation/queryNav3";
import TextWithDetails from "@/components/texts/textWithDetails";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { Button, Card, Navbar, NavbarCollapse } from "flowbite-react";
import { Minus, Plus, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PersonsCard = ({
  title,
  info,
}: {
  title: string;
  info: { field: string; value: string; type?: string }[][];
}) => {
  const { setQuery } = useGlobalFucntions();

  const searchParams = useSearchParams();
  const clicked = searchParams.get(title.toLowerCase());
  const collapseAll = clicked === "all" || !clicked;
  const position = collapseAll ? 0 : parseInt(clicked?.slice(-1) || "1") - 1;

  const queryNav = info?.map((el, i) => ({
    name: title.toLowerCase(),
    value: title.toLowerCase() + " " + (i + 1),
  }));

  const details = collapseAll ? [info[position][0]] : info[position];

  const showDetails = (i: number) => {
    setQuery(title.toLowerCase(), title.toLowerCase() + " " + (i + 1));
  };

  const hideDetails = () => {
    setQuery(title.toLowerCase(), "all");
  };

  return (
    <div
      className={cn("flex flex-wrap gap-4 border-none", {
        "border border-border p-4": collapseAll,
      })}
    >
      {info?.map(
        (ind, i) =>
          ((clicked && position === i) || collapseAll) && (
            <Card
              key={i}
              className={cn("shadow-none transition-all", {
                "w-[235px]": collapseAll,
                "w-[600px] overflow-auto": !collapseAll,
              })}
            >
              <div className="min-w-max">
                <Navbar className="flex justify-between gap-6 !p-0">
                  <NavbarCollapse>
                    <QueryNav3
                      queryNav={collapseAll ? [queryNav[i]] : queryNav}
                      defaultActive={0}
                    />
                  </NavbarCollapse>
                  <Button className="cursor-pointer" size="fit" color="ghost">
                    {collapseAll ? (
                      <Plus size={16} onClick={() => showDetails(i)} />
                    ) : (
                      <Minus size={16} onClick={hideDetails} />
                    )}
                  </Button>
                </Navbar>

                <div className="flex gap-4">
                  {!collapseAll && <User />}
                  <div
                    className={cn("grid grid-cols-3 gap-4", {
                      flex: collapseAll,
                    })}
                  >
                    {details?.map((el) => (
                      <div key={el?.field}>
                        {el?.type === "doc" ? (
                          <TextWithDetails title={el?.field} text={el?.value} />
                        ) : (
                          <TextWithDetails title={el?.field} text={el?.value} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
      )}
    </div>
  );
};

export default PersonsCard;
