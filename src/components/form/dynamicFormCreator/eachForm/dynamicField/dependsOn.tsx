import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button, Checkbox, Radio } from "flowbite-react";
import React, { useState } from "react";
import { IDependsOn } from "../types";
import { fieldReturnType } from "./actions";

const DependsOn = ({ handleSelect, fields, info }: IProps) => {
  const { dependsOn, setDependsOn } = info;

  const onSelect = (field: string, value?: string) => {
    let isPresent = !!dependsOn.options.find((el) => el === value);
    let options = [...dependsOn.options];
    if (isPresent) {
      options = options.filter((el) => el !== value); //deselect
    } else {
      options = value
        ? dependsOn.field === field
          ? [...options, value]
          : [value]
        : []; //select
    }
    options = [...new Set(options)]; //Remove duplicates
    setDependsOn({ field, options });
  };

  //   Select and deselect all
  const selectAll = (el: IDependsOn) => {
    const { field, options } = el;
    if (options) {
      const allSelected = options.length === dependsOn.options.length;
      setDependsOn({ field, options: allSelected ? [] : options });
    }
  };

  return (
    <div className="flex flex-col p-3 pb-0">
      <Command className="flex flex-col gap-1.5">
        {fields.map((each) => (
          <div
            key={each.field}
            className={cn("text-foreground-5 text-sm p-2 rounded-lg", {
              " bg-foreground-1": dependsOn.field === each.field,
            })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio
                  name="name"
                  id={each.field}
                  className="w-3 h-3"
                  onClick={() => onSelect(each.field)}
                />
                <label htmlFor={each.field}>{each.field}</label>
              </div>
              {each.options &&
                each.options.length > 1 &&
                dependsOn.field === each.field && (
                  <Button
                    size="fit"
                    color="transparent"
                    className="text-primary text-xs"
                    onClick={() => selectAll(each)}
                  >
                    {each.options.length === dependsOn.options.length
                      ? "Deselect all"
                      : "Select all"}
                  </Button>
                )}
            </div>

            {each.options && dependsOn.field === each.field && (
              <>
                {each.options?.length > 10 && (
                  <CommandInput placeholder="Search options..." />
                )}
                <CommandGroup className="ml-2 max-h-[190px] overflow-auto">
                  {each.options?.map((el) => (
                    <CommandItem
                      key={el}
                      value={el}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={el}
                        checked={
                          !!dependsOn.options.find((option) => option === el)
                        }
                        onChange={() => onSelect(each.field, el)}
                        color="primary"
                        className="w-4 h-4"
                      />
                      <label htmlFor={el}>{el}</label>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </div>
        ))}
      </Command>

      <div className="sticky bottom-0 bg-white py-3">
        <Button
          disabled={!dependsOn.field}
          color="primary"
          onClick={() => handleSelect(dependsOn)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DependsOn;

interface IProps {
  handleSelect: (selected: IDependsOn) => void;
  fields: IDependsOn[];
  info: fieldReturnType;
}
