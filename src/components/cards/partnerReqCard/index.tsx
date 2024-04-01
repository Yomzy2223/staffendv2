import ConfirmAction from "@/components/confirmAction";
import { MenubarSeparator } from "@/components/ui/menubar";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { ICountryFull } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { countries, getEmojiFlag, TCountryCode } from "countries-list";
import { Button } from "flowbite-react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

const PartnerReqCard = ({
  info,
  setOpenEdit,
  handleDelete,
  isLoading,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { setQuery } = useGlobalFunctions();

  const handleEdit = () => {
    setOpenEdit(true);
    setQuery("country", info.name);
  };

  const originalCountry = Object.keys(countries)
    .map((el: string) => countries[el as TCountryCode].name)
    .find((el) => el.toLowerCase() === info.name);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          {getEmojiFlag(info.iso as TCountryCode)}
          <h3>{originalCountry}</h3>
        </div>

        <PopOverWrapper
          open={open}
          setOpen={setOpen}
          onClose={() => setOpen(false)}
          className="p-1"
          content={
            <div>
              <Button
                color="transparent"
                className="w-full md:[&_span]:justify-start"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <MenubarSeparator className="max-w-full m-0" />
              <Button
                color="transparent"
                className="md:[&_span]:justify-start w-full text-destructive-foreground hover:!text-destructive-foreground hover:!bg-destructive"
                onClick={() => setOpenConfirm(true)}
              >
                Delete
              </Button>
            </div>
          }
        >
          <Button size="fit" color="transparent" className="flex items-center">
            <MoreHorizontal color="hsl(var(--foreground-5))" />
          </Button>
        </PopOverWrapper>

        {openConfirm && (
          <ConfirmAction
            open={openConfirm}
            setOpen={setOpenConfirm}
            confirmAction={() => handleDelete({ info, setOpenConfirm })}
            title="Delete Requirement Form(s)"
            description="Are you sure you want to delete this country's requirement form(s)?"
            isLoading={isLoading}
            isDelete
          />
        )}
      </div>

      <div></div>
    </div>
  );
};

export default PartnerReqCard;

interface IProps {
  info: ICountryFull;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  handleDelete: ({
    info,
    setOpenConfirm,
  }: {
    info: ICountryFull;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isLoading: boolean;
}
