import React, { useState } from "react";
import { Button } from "flowbite-react";
import FieldTypePopUp from "../fieldTypePopUp";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { fieldReturnType } from "./actions";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import DependsOn from "./dependsOn";
import { UseFormSetValue } from "react-hook-form";
import { TDependsOn } from "@/services";

const Header = ({
  fieldTitle,
  number,
  edit,
  info,
  loading,
  type,
  fields,
  setValue,
  disallowPerson,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const { compulsory, handleOptionSelect, setDependsOn, cancelDependsChanges } =
    info;

  const handleDependsOn = (selected: TDependsOn) => {
    setValue("dependsOn", selected, { shouldValidate: true });
    setDependsOn(selected);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center my-[2px]">
        <h3 className="text-sm text-foreground-9 font-normal">
          {(fieldTitle || "Field ") + number}
        </h3>

        {compulsory && !edit && (
          <span className="ml-2 text-[10px] bg-primary-8 text-primary rounded-md px-2.5 py-0.5">
            Compulsory
          </span>
        )}

        {fields && fields?.length > 0 && edit && (
          <PopOverWrapper
            open={open}
            setOpen={setOpen}
            disabled={loading}
            onClose={cancelDependsChanges}
            content={
              <DependsOn
                onApply={handleDependsOn}
                fields={fields}
                info={info}
              />
            }
          >
            <Button
              size="fit"
              color="transparent"
              className="flex items-center"
            >
              <span className="ml-2 text-xs text-primary rounded-md pl-2.5 py-0.5">
                Depends on
              </span>
              <ChevronDown color="hsl(var(--primary))" size={16} />
            </Button>
          </PopOverWrapper>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-sm text-foreground-5 font-normal capitalize">
          {type}
        </span>
        {edit && (
          <FieldTypePopUp
            handleSelect={handleOptionSelect}
            isForm={false}
            disabled={loading}
            disallowPerson={disallowPerson}
          >
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

interface IProps {
  fieldTitle?: string;
  number: number;
  edit: boolean;
  info: fieldReturnType;
  loading: boolean;
  type: string;
  fields?: TDependsOn[];
  setValue: UseFormSetValue<{ [x: string]: any }>;
  disallowPerson?: boolean;
}
