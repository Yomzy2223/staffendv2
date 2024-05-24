"use client";

import ComboBox from "@/components/form/dynamicForm/comboBox";
import { cn } from "@/lib/utils";
import { TFieldTypes } from "@/services/service/types";
import { Button } from "flowbite-react";
import { Minus, Plus, User } from "lucide-react";
import React, { useState } from "react";
import Content from "./content";

const PersonsCard = ({
  title,
  info,
  previewMode,
}: {
  title: string;
  info: IPersonCard[][];
  previewMode?: boolean;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState("");

  const conditionalInfo = clicked ? [info[0]] : info;

  const showDetails = () => {
    setClicked(true);
  };

  const hideDetails = () => {
    setClicked(false);
    setPosition(0);
  };

  const headers = clicked ? info?.length : 1;
  const options = Array(info?.length)
    .fill("")
    ?.map((el, i) => title + " " + (i + 1));

  return (
    <>
      {/* Desktop */}
      <div
        className={cn("hidden flex-wrap gap-4 border-none md:flex", {
          "border border-border m-4": !clicked,
          "hidden md:hidden": previewMode,
        })}
      >
        {conditionalInfo?.map((el, ind) => {
          const details = !clicked ? [info[ind][0]] : info[position];

          return (
            <div
              key={ind}
              className={cn("transition-all border border-border rounded", {
                "w-[235px]": !clicked,
                "w-[600px] overflow-auto border-none": !!clicked,
              })}
            >
              {/* </Navbar> */}
              <div
                className={cn(
                  "sticky left-0 flex justify-between gap-6 p-4 pb-0 bg-[#F9FAFB]",
                  {
                    "bg-background pb-4": clicked,
                  }
                )}
              >
                <div className="flex gap-4">
                  {Array(headers)
                    .fill("")
                    ?.map((el, i) => (
                      <Button
                        key={i}
                        color="ghost"
                        size="fit"
                        className={cn("text-foreground-5 px-2.5 py-0.5", {
                          "bg-success text-success-foreground": position === i,
                        })}
                        onClick={() => setPosition(i)}
                      >
                        {title.toLowerCase() + " " + ((clicked ? i : ind) + 1)}
                      </Button>
                    ))}
                </div>

                <Button className="cursor-pointer" size="fit" color="ghost">
                  {!clicked ? (
                    <Plus size={16} onClick={showDetails} />
                  ) : (
                    <Minus size={16} onClick={hideDetails} />
                  )}
                </Button>
              </div>
              <div className="min-w-max bg-[#F9FAFB] p-4">
                <div className="flex gap-4">
                  {!!clicked && <User />}
                  <Content
                    details={details}
                    clicked={clicked}
                    className={cn({
                      flex: !clicked,
                    })}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div
        className={cn("sm:hidden flex flex-col gap-4", {
          "sm:flex": previewMode,
        })}
      >
        <div className="flex justify-between items-center gap-4 pt-4 px-2.5">
          <p className="inline-flex items-center gap-1 text-success-foreground bg-success rounded-lg text-xs px-2.5 py-0.5">
            <User
              size={14}
              color="hsl(var(--success-foreground))"
              fill="hsl(var(--success-foreground))"
            />
            {selected || options[0]}
          </p>
          <ComboBox
            name={title}
            options={options}
            handleSelect={(selected) => {
              setSelected(selected || "");
              setPosition(parseInt(selected?.split(" ").pop() || "1") - 1);
            }}
            defaultValue={options[0]}
            hideValue
          />
        </div>
        <Content
          details={info[position]}
          clicked={clicked}
          className="flex flex-col bg-muted p-4 pt-0"
        />
      </div>
    </>
  );
};

export default PersonsCard;

export interface IPersonCard {
  field: string;
  value: string | string[];
  type?: TFieldTypes;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
}
