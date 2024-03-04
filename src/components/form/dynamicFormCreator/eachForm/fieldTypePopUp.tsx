import React, { ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { fieldOptions, formOptions, FormType } from "./constants";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { FieldType } from "./types";

const FieldTypePopUp = ({
  children,
  handleSelect,
  isForm,
  disabled,
}: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <PopOverWrapper
      open={open}
      setOpen={setOpen}
      disabled={disabled}
      content={
        <QuestionList
          setOpen={setOpen}
          handleSelect={handleSelect}
          isForm={isForm}
        />
      }
    >
      {children}
    </PopOverWrapper>
  );
};

export default FieldTypePopUp;

function QuestionList({
  setOpen,
  handleSelect,
  isForm,
}: {
  setOpen: (open: boolean) => void;
  handleSelect: (type?: FieldType) => void;
  isForm?: boolean;
}) {
  const options = isForm ? formOptions : fieldOptions;

  return (
    <Command>
      {!isForm && <CommandInput placeholder="Filter status..." />}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((item: FieldType) => (
              <CommandItem
                key={item.type}
                value={item.type}
                onSelect={(value) => {
                  handleSelect(
                    [...options].find(
                      (each: FieldType) =>
                        each.type.toLowerCase() === value.toLowerCase()
                    )
                  );
                  setOpen(false);
                }}
                className="text-foreground-7 capitalize"
              >
                {item.icon && <item.icon size={14} className="mr-1" />}
                {item.type}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

interface IProps {
  children: ReactNode;
  isForm?: boolean;
  handleSelect: (selected?: FieldType | FormType) => void;
  disabled?: boolean;
}
