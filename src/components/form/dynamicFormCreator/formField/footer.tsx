import { cn } from "@/lib/utils";
import { Button, Checkbox } from "flowbite-react";
import { PencilLine, Trash2 } from "lucide-react";
import React, { ReactNode } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { formFieldType } from ".";

const Footer = ({
  checked,
  edit,
  setEdit,
  setChecked,
  setValue,
  getValues,
  children,
}: propType) => {
  const onCheckToggle = () => {
    setChecked(!checked);
    setValue("compulsory", !checked);
  };

  return (
    <div
      className={cn("flex items-center gap-4 pt-4 border-t border-border", {
        "flex-row-reverse justify-between": !edit,
      })}
    >
      <div
        className={cn(
          "flex justify-between items-center gap-6 flex-1 text-sm",
          { "justify-end": !edit }
        )}
      >
        {edit && (
          <div className="flex items-center gap-2 text-foreground-9">
            <Checkbox
              id={"compulsory"}
              className="accent-primary"
              checked={getValues().compulsory}
              onChange={onCheckToggle}
            />
            <label htmlFor="compulsory">Compulsory</label>
          </div>
        )}
        {edit ? (
          <Button
            type="submit"
            color="ghost"
            size="fit"
            className="underline text-primary"
          >
            Done
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button type="button" color="ghost" size="fit">
              <PencilLine
                size={16}
                color="hsl(var(--primary))"
                onClick={() => setEdit(true)}
              />
            </Button>
            <Button type="button" color="ghost" size="fit">
              <Trash2 size={16} color="hsl(var(--destructive-foreground))" />
            </Button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Footer;

interface propType {
  checked: boolean;
  edit: boolean;
  setEdit: (value: boolean) => void;
  setChecked: (value: boolean) => void;
  setValue: UseFormSetValue<formFieldType>;
  getValues: UseFormGetValues<formFieldType>;
  children?: ReactNode;
}
