"use client";

import QueryNav3 from "@/components/navigation/queryNav3";
import TextWithDetails from "@/components/texts/textWithDetails";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { Button, Card, Navbar, NavbarCollapse } from "flowbite-react";
import { Minus, Plus, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const PersonsCard = ({
  title,
  info,
}: {
  title: string;
  info: { field: string; value: string; type?: string }[][];
}) => {
  const { setQuery } = useGlobalFunctions();

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
      className={cn("flex flex-wrap gap-4 ", {
        "border border-border p-4": collapseAll,
        "border-none": !collapseAll,
      })}
    >
      {info?.map(
        (ind, i) =>
          ((clicked && position === i) || collapseAll) && (
            <div
              key={i}
              className={cn(
                "shadow-none transition-all border border-border rounded-md",
                {
                  "w-[235px]": collapseAll,
                  "w-[800px] overflow-auto": !collapseAll,
                }
              )}
            >
              <motion.div className="min-w-max">
                <Navbar
                  className={cn(
                    "flex justify-between gap-6 p-4 bg-background left-0 sticky max-w-full",
                    {
                      "pb-0": collapseAll,
                    }
                  )}
                >
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

                <div
                  className={cn("flex gap-4 p-4 ", {
                    "bg-[#F9FAFB]": !collapseAll,
                  })}
                >
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
              </motion.div>
            </div>
          )
      )}
    </div>
  );
};

export default PersonsCard;
