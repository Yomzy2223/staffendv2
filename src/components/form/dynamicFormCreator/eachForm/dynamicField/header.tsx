import React from "react";
import { Button } from "flowbite-react";
import { FieldType } from "../constants";
import FieldTypePopUp from "../fieldTypePopUp";
import { MoreHorizontal } from "lucide-react";
import { fieldReturnType } from "./actions";

const Header = ({ fieldTitle, number, edit, info }: propType) => {
  const { compulsory, type, mountInfo } = info;

  const handleSelect = (selected?: FieldType) => {
    if (!selected) return;
    if (selected.type === info.type) {
      mountInfo(info);
      return;
    }
    mountInfo(selected);
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
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-sm text-foreground-5 font-normal capitalize">
          {type}
        </span>
        {edit && (
          <FieldTypePopUp handleSelect={handleSelect} isForm={false}>
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
  edit: boolean;
  info: fieldReturnType;
}
