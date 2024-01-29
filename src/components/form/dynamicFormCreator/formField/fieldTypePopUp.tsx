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
import { FieldType, fieldTypes } from "./constants";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface propType {
  children: ReactNode;
  handleSelect: (type?: FieldType) => void;
}

const FieldTypePopUp = ({ children, handleSelect }: propType) => {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useGlobalFucntions();

  return (
    <div>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{children}</PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <QuestionList setOpen={setOpen} handleSelect={handleSelect} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <QuestionList setOpen={setOpen} handleSelect={handleSelect} />
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
}: {
  setOpen: (open: boolean) => void;
  handleSelect: (type?: FieldType) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {fieldTypes
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((item: FieldType) => (
              <CommandItem
                key={item.type}
                value={item.type}
                onSelect={(value) => {
                  handleSelect(
                    fieldTypes.find(
                      (type: FieldType) => type.type.toLowerCase() === value
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
