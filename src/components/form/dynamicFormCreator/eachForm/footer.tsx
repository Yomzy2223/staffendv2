import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { PencilLine, PlusCircle, Trash2 } from "lucide-react";
import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FieldType } from "./constants";
import FieldTypePopUp from "./fieldTypePopUp";

const Footer = ({
  edit,
  setEdit,
  onDoneClick,
  setNewlyAdded,
  btnText,
  loading,
}: propType) => {
  const handleSelect = (selected?: FieldType) => {
    if (!selected) return;
    setNewlyAdded(selected);
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-6 flex-1 text-sm border-t border-border pt-4",
        { "justify-end": !edit }
      )}
    >
      {edit && (
        <FieldTypePopUp handleSelect={handleSelect}>
          <Button color="ghost" size="fit" className="text-foreground-5">
            <PlusCircle size={20} />
            {btnText}
          </Button>
        </FieldTypePopUp>
      )}

      {edit ? (
        <div className="flex gap-4">
          <Button
            type="button"
            color="ghost"
            size="fit"
            className="text-primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="ghost"
            size="fit"
            className="underline text-primary"
            onClick={onDoneClick}
            disabled={loading}
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
  onDoneClick?: MouseEventHandler<HTMLButtonElement>;
  setNewlyAdded: Dispatch<SetStateAction<FieldType | undefined>>;
  btnText?: string;
  loading: boolean;
}
