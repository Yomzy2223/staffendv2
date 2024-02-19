import React, { ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldType, fieldOptions, formOptions, FormType } from "./constants";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface propType {
  children: ReactNode;
  isForm?: boolean;
  handleSelect: (selected?: FieldType | FormType) => void;
  disabled?: boolean;
}

const FieldTypePopUp = ({
  children,
  handleSelect,
  isForm,
  disabled,
}: propType) => {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useGlobalFucntions();

  return (
    <div>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            {children}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <QuestionList
              setOpen={setOpen}
              handleSelect={handleSelect}
              isForm={isForm}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild disabled={disabled}>
            {children}
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <QuestionList
                setOpen={setOpen}
                handleSelect={handleSelect}
                isForm={isForm}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
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
