import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
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
  defaultValue,
  disabled,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(defaultValue);

  const findOriginalValue = (value: string) =>
    options.find((el) => el.toLowerCase() === value.toLowerCase());

  useEffect(() => {
    if (defaultValue) setSelectValue(defaultValue);
  }, [defaultValue]);

  return (
    <Popover open={openSelect} onOpenChange={setOpenSelect}>
      <PopoverTrigger asChild>
        <Button
          outline
          role="combobox"
          className="w-full [&_span]:justify-between"
          disabled={disabled}
          {...selectProp}
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
        <Command className="min-w-40">
          {options.length > 5 && (
            <CommandInput placeholder={`Search ${fieldName}...`} />
          )}
          <CommandEmpty>{`No ${fieldName} found`}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
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
  defaultValue?: string;
  disabled?: boolean;
}
