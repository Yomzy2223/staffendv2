import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, TextInput } from "flowbite-react";
import { FieldType } from "./constants";
import FieldTypePopUp from "./fieldTypePopUp";
import { MoreHorizontal } from "lucide-react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/utils";
import { formFieldType } from "./dynamicField";
import { formType } from ".";

const Header = ({
  title,
  number,
  setValue,
  error,
  edit,
  checked,
  selectedType,
  setSelectedType,
  isForm,
}: propType) => {
  const handleSelect = (selected?: FieldType) => {
    if (!selected) return;
    setSelectedType(selected);
    setValue && setValue("type", selected.type, { shouldValidate: true });
  };

  return (
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center my-[2px]">
        {isForm ? (
          <div className="flex items-center gap-2 flex-1">
            <Checkbox className="accent-primary" />
            <TextInput
              placeholder="Enter title"
              // color={errors["title"] && "failure"}
              className="[&_input]:h-6 [&_input]:py-0 [&_input]:w-full flex-1 disabled:[&_input]:border-0 disabled:[&_input]:bg-transparent"
              disabled={!edit}
            />
          </div>
        ) : (
          <div className="flex items-center my-[2px]">
            <h3 className="text-sm text-foreground-9 font-normal">
              {(title || "Field ") + number}
            </h3>
          </div>
        )}
        {checked && !edit && (
          <span className="ml-2 text-[10px] bg-primary-8 text-primary rounded-md px-2.5 py-0.5">
            Compulsory
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <span
          className={cn("text-sm text-foreground-5 font-normal capitalize", {
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

export default Header;

interface propType {
  title?: string;
  number: number;
  setValue?: UseFormSetValue<formFieldType | formType>;
  error?: FieldError;
  edit: boolean;
  checked: boolean;
  selectedType?: FieldType;
  setSelectedType: Dispatch<SetStateAction<FieldType | undefined>>;
  isForm?: boolean;
}
