import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Button, Checkbox, TextInput } from "flowbite-react";
import { FieldType } from "./constants";
import FieldTypePopUp from "./fieldTypePopUp";
import { MoreHorizontal } from "lucide-react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/utils";
import { formFieldType } from "./dynamicField";
import { formType } from ".";
import { useFormActions } from "./actions";

const Header = ({
  fieldTitle,
  number,
  setValue,
  edit,
  checked,
  selectedType,
  setSelectedType,
  formTitle,
  setTitle,
  titleError,
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
            <div className="flex gap-2 space-y-0">
              <TextInput
                value={formTitle}
                onChange={(e) => setTitle && setTitle(e.target.value)}
                placeholder="Enter title"
                helperText={<span className="text-xs mt-0">{titleError}</span>}
                color={titleError && "failure"}
                className={cn(
                  "[&_input]:h-6 [&_input]:py-0 [&_input]:w-full flex-1 disabled:[&_input]:border-0 disabled:[&_input]:bg-transparent [&_p]:mt-0",
                  { "focus:[&_input]:outline-none": titleError }
                )}
                disabled={!edit}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center my-[2px]">
            <h3 className="text-sm text-foreground-9 font-normal">
              {(fieldTitle || "Field ") + number}
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
        <span className="text-sm text-foreground-5 font-normal capitalize">
          {selectedType?.type}
        </span>
        {edit && (
          <FieldTypePopUp handleSelect={handleSelect}>
            <Button
              size="fit"
              color="primary"
              className="flex items-center rounded-full !border-[3px] border-[#CCF3FF]"
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
  fieldTitle?: string;
  number: number;
  setValue?: UseFormSetValue<formFieldType | formType>;
  edit: boolean;
  checked: boolean;
  selectedType?: FieldType;
  setSelectedType: Dispatch<SetStateAction<FieldType | undefined>>;
  formTitle?: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  titleError?: string;
  isForm?: boolean;
}

//  <span
//    className={cn("text-sm text-foreground-5 font-normal capitalize", {
//      "text-destructive-foreground": error?.message,
//    })}
//  >
//    {selectedType?.type || "Select type"}
//  </span>;
//  <FieldTypePopUp handleSelect={handleSelect}>
//    <Button
//      size="fit"
//      color="primary"
//      className={cn(
//        "flex items-center rounded-full !border-[3px] border-[#CCF3FF]",
//        {
//          "bg-destructive-foreground border-destructive": error?.message,
//        }
//      )}
//    >
//      <MoreHorizontal color="#ffffff" className="w-4 h-4" />
//    </Button>
//  </FieldTypePopUp>;
