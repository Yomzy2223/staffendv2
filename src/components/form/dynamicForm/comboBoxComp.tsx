import React, { HTMLAttributes, ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";

const ComboBoxComp = ({
  name,
  options,
  selectProp,
  setValue,
  fieldName,
  leftContent,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const findOriginalValue = (value: string) =>
    options.find((el) => el.toLowerCase() === value.toLowerCase());

  return (
    <Popover open={openSelect} onOpenChange={setOpenSelect}>
      <PopoverTrigger asChild>
        <Button
          outline
          role="combobox"
          className="w-full [&_span]:justify-between"
        >
          {selectValue ? (
            <div className="flex gap-1">
              {leftContent && leftContent}
              <span>{findOriginalValue(selectValue)}</span>
            </div>
          ) : (
            selectProp?.placeholder || "Select " + fieldName
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-96 overflow-y-auto">
        <Command>
          <CommandInput placeholder={`Search ${fieldName}...`} />
          <CommandEmpty>{`No ${fieldName} found`}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                {...selectProp}
                onSelect={(currentValue) => {
                  const selected =
                    currentValue === selectValue ? "" : currentValue;
                  setSelectValue(selected);
                  setValue(name, selected);
                  setOpenSelect(false);
                  selectProp?.onSelect &&
                    selectProp?.onSelect(findOriginalValue(selected));
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectValue === option.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default ComboBoxComp;

interface IProps {
  name: string;
  options: string[];
  selectProp?: Record<any, any>;
  setValue: UseFormSetValue<any>;
  fieldName?: string;
  leftContent?: string | ReactNode;
}
