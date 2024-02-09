import { cn } from "@/lib/utils";
import { Button, Checkbox } from "flowbite-react";
import { PencilLine, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FieldType } from "../constants";
import { fieldReturnType } from "./actions";

const Footer = ({ edit, setEdit, getValues, setValue, info }: propType) => {
  const { compulsory, setCompulsory, cancelChanges } = info;

  const onCheckToggle = () => {
    setCompulsory(!compulsory);
    setValue("compulsory", !compulsory);
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-6 flex-1 text-sm border-t border-border pt-4",
        { "justify-end": !edit }
      )}
    >
      {edit && (
        <div className="flex items-center gap-2 text-foreground-9">
          <Checkbox
            id="compulsory"
            className="accent-primary"
            checked={getValues("compulsory")}
            onChange={onCheckToggle}
          />
          <label htmlFor="compulsory">Compulsory</label>
        </div>
      )}
      {edit ? (
        <div className="flex gap-4">
          <Button
            type="button"
            color="ghost"
            size="fit"
            className="text-primary"
            onClick={cancelChanges}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="ghost"
            size="fit"
            className="underline text-primary"
          >
            Done
          </Button>
        </div>
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
  );
};

export default Footer;

interface propType {
  edit: boolean;
  setEdit: (value: boolean) => void;
  getValues: UseFormGetValues<{ [x: string]: any }>;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setNewlyAdded?: Dispatch<SetStateAction<FieldType | undefined>>;
  info: fieldReturnType;
}
