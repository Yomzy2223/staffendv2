"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { TDependsOn } from "@/services";
import { Button, Checkbox, Radio } from "flowbite-react";
import React, { useState } from "react";
import { fieldReturnType } from "./actions";

const DependsOn = ({ onApply, fields, info }: IProps) => {
  const [selected, setSelected] = useState<TDependsOn>(info.dependsOn);

  const onSelect = (field: string, question: string, value?: string) => {
    let isPresent = !!selected.options.find((el) => el === value);
    let options = [...selected.options];
    if (isPresent) {
      options = options.filter((el) => el !== value); //deselect
    } else {
      options = value
        ? selected.field === field
          ? [...options, value]
          : [value]
        : []; //select
    }
    options = [...new Set(options)]; //Remove duplicates
    setSelected({ field, options, question });
  };

  //   Select and deselect all
  const selectAll = (el: TDependsOn) => {
    const { field, question, options } = el;
    if (options) {
      const allSelected = options.length === selected.options.length;
      setSelected({ field, question, options: allSelected ? [] : options });
    }
  };

  return (
    <div className="flex flex-col p-3 pb-0">
      <Command className="flex flex-col gap-1.5 overflow-hidden">
        {fields.map((each) => (
          <div
            key={each.field}
            className={cn("text-foreground-5 text-sm p-2 rounded-lg", {
              " bg-foreground-1": selected.field === each.field,
            })}
          >
            <div className="flex items-start gap-2 max-w-full">
              <Radio
                name="name"
                id={each.field}
                className="w-3 h-3 shrink-0 mt-1"
                checked={each.field === selected.field}
                onChange={() => onSelect(each.field, each.question)}
              />
              <div className="flex flex-col max-w-[calc(100%-20px)]">
                <div className="flex items-center gap-2 justify-between">
                  <label htmlFor={each.field}>{each.field}</label>
                  {each.options &&
                    each.options.length > 1 &&
                    selected.field === each.field && (
                      <Button
                        size="fit"
                        color="transparent"
                        className="text-primary text-xs"
                        onClick={() => selectAll(each)}
                      >
                        {each.options.length === selected.options.length
                          ? "Deselect all"
                          : "Select all"}
                      </Button>
                    )}
                </div>
                <p className="text-xs text-nowrap overflow-hidden text-ellipsis ">
                  {each.question}
                </p>
              </div>
            </div>

            {each.options && selected.field === each.field && (
              <>
                {each.options?.length > 10 && (
                  <CommandInput placeholder="Search options..." />
                )}
                <CommandGroup className="ml-2 max-h-[190px] overflow-auto ">
                  {each.options?.map((el) => (
                    <CommandItem
                      key={el}
                      value={el}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={el}
                        checked={
                          !!selected.options.find((option) => option === el)
                        }
                        onChange={() => onSelect(each.field, each.question, el)}
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
          disabled={!selected.field}
          color="primary"
          onClick={() => onApply(selected)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DependsOn;

interface IProps {
  onApply: (selected: TDependsOn) => void;
  fields: TDependsOn[];
  info: fieldReturnType;
}
