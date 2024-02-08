import React from "react";
import { Button, Checkbox, Textarea, TextInput } from "flowbite-react";
import FieldTypePopUp from "./fieldTypePopUp";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { formReturnType } from "./actions";

const Header = ({ edit, info }: propType) => {
  const {
    type,
    setType,
    title,
    setTitle,
    compulsory,
    setCompulsory,
    description,
    setDescription,
    titleError,
    descError,
  } = info;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center gap-2 flex-1">
          <Checkbox
            className="accent-primary"
            checked={compulsory}
            onChange={(e) => setCompulsory(e.target.checked)}
            disabled={!edit}
          />
          <div className="flex gap-2 space-y-0">
            {edit || !title ? (
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                helperText={<span className="text-xs mt-0">{titleError}</span>}
                color={titleError && "failure"}
                className={cn(
                  "[&_input]:h-6 [&_input]:py-0 [&_input]:w-full flex-1 disabled:[&_input]:border-0 disabled:[&_input]:bg-transparent [&_p]:mt-0",
                  { "focus:[&_input]:outline-none": titleError }
                )}
                disabled={!edit}
              />
            ) : (
              <p className="text-sm font-normal text-foreground-9">{title}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-sm text-foreground-5 font-normal capitalize">
            {type}
          </span>
          {edit && (
            <FieldTypePopUp
              handleSelect={(selected) => setType(selected?.type || "")}
              isForm
            >
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

      {edit ? (
        <Textarea
          rows={2}
          placeholder={`Enter ${title} description`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText={<>{descError}</>}
          color={descError && "failure"}
          className={cn("resize-none px-2 py-1", {
            "focus:outline-none": descError,
          })}
          disabled={!edit}
        />
      ) : (
        <p className="text-sm text-foreground-5">{description}</p>
      )}
    </div>
  );
};

export default Header;

interface propType {
  edit: boolean;
  info: formReturnType;
}
