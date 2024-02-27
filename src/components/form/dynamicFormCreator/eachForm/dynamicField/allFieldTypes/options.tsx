import { Button, Checkbox, Radio, TextInput } from "flowbite-react";
import { X } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { fieldReturnType } from "../actions";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

const Options = ({ info, setValue, edit, error, type }: IProps) => {
  const { options, setOptions } = info;

  const id = uuidv4();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    let optionCopy = [...options];
    optionCopy[i] = e.target.value;
    setOptions(optionCopy);
    setValue("options", optionCopy);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    option: string,
    i: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (options.length === i + 1 && !options.some((el) => el.trim() === "")) {
        setOptions([...options, ""]);
        setValue("options", [...options, ""]);
      }
      focusElement("option" + id + (i + 1));
    } else if (e.key === "Backspace" && e.currentTarget.value.length === 0) {
      removeOption(option);
      focusElement("option" + id + (i - 1));
    }
  };

  const removeOption = (option: string) => {
    let optionCopy = [...options];
    if (optionCopy.length === 1) {
      setOptions([""]);
      setValue("options", [""]);
    } else {
      optionCopy = optionCopy.filter((el) => el !== option);
      if (optionCopy.length === 0) optionCopy = [""];
      setOptions(optionCopy);
      setValue("options", optionCopy);
    }
  };

  const focusElement = (id: string) => {
    const element = document.getElementById(id);
    element?.focus();
  };

  return (
    <div>
      <div
        className={cn("space-y-3 mt-4 max-h-52 pb-1 overflow-hidden", {
          "overflow-y-auto": edit,
        })}
      >
        {options.map((option, i) => (
          <div key={i} className="flex items-center gap-2">
            {type === "checkbox" && <Checkbox disabled className="w-5 h-5" />}
            {type === "multiple choice" && (
              <Radio disabled className="w-5 h-5" />
            )}
            <div className="flex justify-between gap-4 w-full">
              <TextInput
                id={"option" + id + i}
                type="text"
                value={option}
                placeholder={"Enter option " + (i + 1)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, option, i)}
                className="h-5 [&_input]:p-0 [&_input]:border-0 [&_input]:outline-none [&_input]:bg-transparent [&_input]:rounded-none focus:[&_input]:border-b [&_input]:!border-border w-full"
                disabled={!edit}
              />
              {edit && (
                <Button type="button" color="ghost" size="fit">
                  <X
                    size={20}
                    color="hsl(var(--foreground-5))"
                    onClick={() => removeOption(option)}
                  />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {error?.message && (
        <div className="text-destructive-foreground text-xs py-2">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default Options;

interface IProps {
  info: fieldReturnType;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  edit: boolean;
  error: any;
  type: string;
}
