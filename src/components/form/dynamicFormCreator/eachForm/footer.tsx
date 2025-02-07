import EditDelete from "@/components/features/editDelete";
import { cn } from "@/lib/utils";
import { TSubFormCreate, TSubFormGet } from "@/services";
import { AxiosResponse } from "axios";
import { Button } from "flowbite-react";
import { PencilLine, PlusCircle, Trash2 } from "lucide-react";
import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import FieldTypePopUp from "./fieldTypePopUp";

const Footer = ({
  edit,
  setEdit,
  onDoneClick,
  setNewlyAdded,
  btnText,
  disabled,
  deleteLoading,
  cancelChanges,
  disableAddNew,
  deleteForm,
}: IProps) => {
  const handleSelect = (selected?: TSubFormGet) => {
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
          <Button
            color="ghost"
            size="fit"
            className="text-foreground-5"
            disabled={disableAddNew}
          >
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
            disabled={disabled}
            onClick={cancelChanges}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="ghost"
            size="fit"
            className="underline text-primary"
            onClick={() => onDoneClick({ onSuccess: () => setEdit(false) })}
            disabled={disabled}
          >
            Done
          </Button>
        </div>
      ) : (
        <EditDelete
          onEdit={() => setEdit(true)}
          deleteAction={deleteForm}
          loading={deleteLoading}
          text
        />
      )}
    </div>
  );
};

export default Footer;

interface IProps {
  edit: boolean;
  setEdit: (value: boolean) => void;
  onDoneClick: ({
    onSuccess,
  }: {
    onSuccess?: (data: AxiosResponse<any, any>) => void;
  }) => void;
  setNewlyAdded: Dispatch<SetStateAction<TSubFormGet | undefined>>;
  btnText?: string;
  disabled: boolean;
  deleteLoading: boolean;
  cancelChanges: () => void;
  disableAddNew?: boolean;
  deleteForm: () => void;
}
