"use client";

import { FileInput } from "@/components/file/fileInput";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import TextWithDetails from "@/components/texts/textWithDetails";
import { cn } from "@/lib/utils";
import { TFieldTypes } from "@/services/service/types";
import { Button } from "flowbite-react";
import { Minus, Plus, User } from "lucide-react";
import React, { useState } from "react";

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

  const conditionalInfo = clicked ? [info[0]] : info;

  const showDetails = () => {
    setClicked(true);
  };

  const hideDetails = () => {
    setClicked(false);
    setPosition(0);
  };

  const headers = clicked ? info?.length : 1;
  const options = Array(headers)
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
      <div className={cn("sm:hidden flex-col", { "sm:flex": previewMode })}>
        <div>
          <ComboBox
            name={title}
            options={options}
            handleSelect={(selected) =>
              setPosition(parseInt(selected?.split(" ").pop() || "1") - 1)
            }
            leftContent={<User />}
            defaultValue={options[0]}
          />
        </div>
        <Content
          details={info[position]}
          clicked={clicked}
          className="flex flex-col"
        />
      </div>
    </>
  );
};

export default PersonsCard;

const Content = ({
  details,
  clicked,
  className,
}: {
  details: IPersonCard[];
  clicked: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {details?.map((el) => (
        <div key={el?.field}>
          {el?.type === "document template" ||
          el?.type === "document upload" ? (
            el.fileName && el.fileLink && el.fileSize && el.fileType ? (
              <FileInput
                fileName={el.fileName}
                fileLink={el.fileLink}
                fileSize={el.fileSize}
                fileType={el.fileType}
              />
            ) : (
              <div>
                <p className="text-base font-semibold text-foreground-9">
                  {el.field}
                </p>
                <p className="text-foreground-5 text-sm italic">
                  Document not uploaded yet
                </p>
              </div>
            )
          ) : (
            <TextWithDetails
              title={el?.field}
              text={typeof el?.value === "string" ? el?.value : ""}
              list={typeof el?.value !== "string" ? el?.value : []}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export interface IPersonCard {
  field: string;
  value: string | string[];
  type?: TFieldTypes;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
}
