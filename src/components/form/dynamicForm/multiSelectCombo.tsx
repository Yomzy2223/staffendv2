import React, { ReactNode, useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import TagIcon from "@/assets/icons/tagIcon";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

const MultiSelectCombo = ({
  name,
  options,
  selectProp,
  setValue,
  errorMsg,
  fieldName,
  leftContent,
  defaultTags,
  disabled,
  optionsLoading,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultTags || []);

  const { getRandColor } = useGlobalFunctions();

  const findOriginalValue = (values: string[]) =>
    values.map(
      (el) =>
        options.find(
          (each) => each.toLowerCase() === el.toLowerCase()
        ) as string
    );

  useEffect(() => {
    if (defaultTags) setSelectedTags(defaultTags);
  }, [defaultTags]);

  const onSelect = (selected: string) => {
    let isPresent = !!selectedTags.find((el) => el === selected);
    let options = [...selectedTags];
    if (isPresent) {
      options = options.filter((el) => el !== selected); //deselect
    } else {
      options = selectedTags ? [...options, selected] : [...options]; //select
    }
    options = [...new Set(options)]; //Remove duplicates
    setValue && setValue(name, options, { shouldValidate: true });
    setSelectedTags(options);
    selectProp?.onSelect && selectProp?.onSelect(findOriginalValue(options));
  };

  const removeTag = (option: string) => {
    let tagsCopy = [...selectedTags];
    tagsCopy = tagsCopy.filter(
      (el) => el.toLowerCase() !== option.toLowerCase()
    );
    setSelectedTags(tagsCopy);
    setValue("options", tagsCopy);
  };

  return (
    <>
      <Popover open={openSelect} onOpenChange={setOpenSelect}>
        <PopoverTrigger asChild>
          <Button
            outline
            role="combobox"
            className={cn("w-full [&_span]:justify-between [&>span]:!p-2.5", {
              "border-primary ring-primary ring-1": openSelect,
            })}
            disabled={disabled}
            {...selectProp}
          >
            {selectedTags?.length > 0 ? (
              <div className="flex gap-1">
                {(selectedTags?.length || 0) + " " + (fieldName || name)}{" "}
                selected
              </div>
            ) : (
              selectProp?.placeholder || "Select " + (fieldName || name)
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-4 w-full p-0">
          <Command className="min-w-40 max-w-80 max-h-96 overflow-auto">
            {options.length > 5 && (
              <CommandInput
                placeholder={`Search ${fieldName || name}...`}
                className="sticky top-0"
              />
            )}
            {!optionsLoading && options.length === 0 && (
              <p className="text-sm text-foreground-5 p-2 pb-0">{`No ${
                fieldName || name
              } found`}</p>
            )}
            <CommandGroup className="h-full overflow-auto">
              {optionsLoading && (
                <div className="space-y-1">
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                </div>
              )}
              {options.map((option) => (
                <CommandItem key={option} value={option} onSelect={onSelect}>
                  <Check
                    className={cn("mr-2 h-4 w-4 opacity-0 shrink-0", {
                      "opacity-100": selectedTags.find(
                        (el) => el.toLowerCase() === option.toLowerCase()
                      ),
                    })}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
          {selectedTags?.length > 0 && (
            <div className="overflow-auto max-h-96">
              <h3 className="py-1.5 border-b border-border font-semibold sticky top-0 bg-white">
                Selected ({selectedTags?.length || 0})
              </h3>
              <ul className="flex flex-col gap-1 max-w-80">
                {findOriginalValue(selectedTags)?.map((tag) => (
                  <li
                    key={tag}
                    className="flex justify-between items-start gap-1 text-sm p-1 pl-0"
                  >
                    {tag}
                    <Button
                      size="fit"
                      color="ghost"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={14} />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {errorMsg && (
        <p className="text-sm text-destructive-foreground">{errorMsg}</p>
      )}
    </>
  );
};
export default MultiSelectCombo;

interface IProps {
  name: string;
  options: string[];
  selectProp?: Record<any, any>;
  setValue: UseFormSetValue<any>;
  errorMsg?: string;
  fieldName?: string;
  leftContent?: string | ReactNode;
  defaultTags?: string[];
  disabled?: boolean;
  optionsLoading?: boolean;
}
