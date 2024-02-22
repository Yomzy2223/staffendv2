import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Card } from "flowbite-react";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { countries, getEmojiFlag, TCountryCode } from "countries-list";
import { Currency, MoreHorizontal, Phone, WholeWord } from "lucide-react";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { ICountry, ICountryFull } from "@/hooks/api/types";
import ConfirmAction from "@/components/confirmAction";

const CountryCard = ({ info, setOpen, handleDelete, isLoading }: IProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { setQuery } = useGlobalFucntions();

  const countryName = countries[info?.iso as TCountryCode].name;

  const handleEdit = () => {
    setOpen(true);
    setQuery("countryId", info?.id);
  };
  return (
    <CardWrapper className="border border-border max-w-[432px]">
      <div className="flex justify-between gap-6 border-b border-border pb-4 mb-4">
        <div className="flex items-center gap-2">
          {getEmojiFlag(info?.iso as TCountryCode)}
          <p>{countryName}</p>
        </div>
        <Menubar className="p-0 h-max border-none">
          <MenubarMenu>
            <MenubarTrigger asChild className="p-0 cursor-pointer">
              <MoreHorizontal color="hsl(var(--foreground-5))" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleEdit}>Edit</MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="text-destructive-foreground hover:!text-destructive-foreground hover:!bg-destructive"
                onClick={() => setOpenConfirm(true)}
              >
                Delete
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {openConfirm && (
          <ConfirmAction
            open={openConfirm}
            setOpen={setOpenConfirm}
            confirmAction={() => handleDelete({ info, setOpenConfirm })}
            title="Delete Country"
            description="Are you sure you want to delete this country?"
            isLoading={isLoading}
            isDelete
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="sb-text-16 flex items-center gap-2">
          <Phone size={16} />
          {info.code}
        </div>
        <div className="sb-text-16 flex items-center gap-2">
          <WholeWord size={16} />
          {info.currency}
        </div>
        <div className="sb-text-16 flex items-center gap-2">
          <Currency size={16} /> {info.currency}
        </div>
      </div>
    </CardWrapper>
  );
};

export default CountryCard;

interface IProps {
  info: ICountryFull;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: ({
    info,
    setOpenConfirm,
  }: {
    info: ICountryFull;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isLoading: boolean;
}
