import EditDelete from "@/components/features/editDelete";
import { cn } from "@/lib/utils";
import { TSubFormGet } from "@/services";
import { Button, Checkbox } from "flowbite-react";
import { PencilLine, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { fieldReturnType } from "./actions";

const Footer = ({
  edit,
  setEdit,
  getValues,
  setValue,
  info,
  loading,
  deleteLoading,
  deleteField,
}: IProps) => {
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
            color="primary"
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="ghost"
            size="fit"
            className="underline text-primary"
            disabled={loading}
          >
            Save
          </Button>
        </div>
      ) : (
        <EditDelete
          onEdit={() => setEdit(true)}
          deleteAction={() => deleteField(info)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Footer;

interface IProps {
  edit: boolean;
  setEdit: (value: boolean) => void;
  getValues: UseFormGetValues<{ [x: string]: any }>;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setNewlyAdded?: Dispatch<SetStateAction<TSubFormGet | undefined>>;
  info: fieldReturnType;
  loading: boolean;
  deleteLoading?: boolean;
  deleteField: (info: fieldReturnType) => void;
}
