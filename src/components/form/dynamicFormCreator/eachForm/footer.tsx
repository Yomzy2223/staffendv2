import { cn } from "@/lib/utils";
import { Button, Checkbox } from "flowbite-react";
import { PencilLine, PlusCircle, Trash2 } from "lucide-react";
import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FieldType, FormType } from "./constants";
import { formFieldType } from "./dynamicField";
import FieldTypePopUp from "./fieldTypePopUp";

const Footer = ({
  compulsory,
  edit,
  setEdit,
  setCompulsory,
  setValue,
  getValues,
  onDoneClick,
  isForm,
  setNewlyAdded,
  btnText,
}: propType) => {
  const onCheckToggle = () => {
    setCompulsory(!compulsory);
    setValue && setValue("compulsory", !compulsory);
  };

  const handleSelect = (selected?: FieldType) => {
    if (!selected) return;
    setNewlyAdded && setNewlyAdded(selected);
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-6 flex-1 text-sm border-t border-border pt-4",
        { "justify-end": !edit }
      )}
    >
      {isForm && edit && (
        <FieldTypePopUp handleSelect={handleSelect}>
          <Button color="ghost" size="fit" className="text-foreground-5">
            <PlusCircle size={20} />
            {btnText}
          </Button>
        </FieldTypePopUp>
      )}
      {!isForm && edit && (
        <div className="flex items-center gap-2 text-foreground-9">
          <Checkbox
            id={"compulsory"}
            className="accent-primary"
            checked={getValues ? getValues().compulsory : compulsory}
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
          onClick={onDoneClick}
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
  );
};

export default Footer;

interface propType {
  compulsory: boolean;
  edit: boolean;
  setEdit: (value: boolean) => void;
  setCompulsory: (value: boolean) => void;
  setValue?: UseFormSetValue<formFieldType | FormType>;
  getValues?: UseFormGetValues<formFieldType | FormType>;
  onDoneClick?: MouseEventHandler<HTMLButtonElement>;
  isForm?: boolean;
  setNewlyAdded?: Dispatch<SetStateAction<FieldType | undefined>>;
  btnText?: string;
}
