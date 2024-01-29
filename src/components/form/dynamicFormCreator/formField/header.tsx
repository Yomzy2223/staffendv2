import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "flowbite-react";
import { FieldType } from "./constants";
import FieldTypePopUp from "./fieldTypePopUp";
import { MoreHorizontal } from "lucide-react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/utils";
import { formFieldType } from ".";

const QuestionHeader = ({
  title,
  number,
  setValue,
  error,
  edit,
  checked,
  selectedType,
  setSelectedType,
}: propType) => {
  const handleSelect = (selected?: FieldType) => {
    if (!selected) return;
    setSelectedType(selected);
    setValue("type", selected.type, { shouldValidate: true });
  };

  return (
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center my-[2px]">
        <h3 className="text-sm text-foreground-9 font-normal">
          {(title || "Field ") + number}
        </h3>
        {checked && !edit && (
          <span className="ml-2 text-[10px] bg-primary/20 text-foreground-5 rounded-lg px-1">
            Compulsory
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <span
          className={cn("text-sm text-foreground-5 font-normal", {
            "text-destructive-foreground": error?.message,
          })}
        >
          {selectedType?.type || "Select type"}
        </span>
        {edit && (
          <FieldTypePopUp handleSelect={handleSelect}>
            <Button
              size="fit"
              color="primary"
              className={cn(
                "flex items-center rounded-full !border-[3px] border-[#CCF3FF]",
                {
                  "bg-destructive-foreground border-destructive":
                    error?.message,
                }
              )}
            >
              <MoreHorizontal color="#ffffff" className="w-4 h-4" />
            </Button>
          </FieldTypePopUp>
        )}
      </div>
    </div>
  );
};

export default QuestionHeader;

interface propType {
  title?: string;
  number: number;
  setValue: UseFormSetValue<formFieldType>;
  error?: FieldError;
  edit: boolean;
  checked: boolean;
  selectedType?: FieldType;
  setSelectedType: Dispatch<SetStateAction<FieldType | undefined>>;
}
