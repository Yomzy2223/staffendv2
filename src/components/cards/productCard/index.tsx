import ConfirmAction from "@/components/confirmAction";
import { MenubarSeparator } from "@/components/ui/menubar";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { IProductFull } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { Currency, MoreHorizontal, Timer, WholeWord } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

const ProductCard = ({
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
    setQuery("productId", info.id);
  };

  return (
    <div className="flex-1 max-w-[420px] min-w-[300px] p-4 rounded-lg border border-border">
      <div className="border-b border-border pb-4">
        <div className="flex justify-between gap-6">
          <div>
            <span className="text-base font-semibold mr-2.5">{info?.name}</span>
            <span className="text-xs font-normal text-success-foreground bg-success px-2.5 py-0.5">
              {info?.feature?.[0]}
            </span>
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
            <Button
              size="fit"
              color="transparent"
              className="flex items-center"
            >
              <MoreHorizontal color="hsl(var(--foreground-5))" />
            </Button>
          </PopOverWrapper>

          {openConfirm && (
            <ConfirmAction
              open={openConfirm}
              setOpen={setOpenConfirm}
              confirmAction={() => handleDelete({ info, setOpenConfirm })}
              title="Delete Product"
              description="Are you sure you want to delete this product?"
              isLoading={isLoading}
              isDelete
            />
          )}
        </div>
        <p className="text-sm font-normal text-foreground-5">
          {info?.description}
        </p>
      </div>

      <ul className="flex flex-col gap-5 mt-4">
        <li className="flex gap-4 ">
          <WholeWord size={20} />
          <span className="font-normal text-base">{info?.country}</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">{info?.currency}</span>
        </li>
        <li className="flex gap-4 ">
          <Currency size={20} />{" "}
          <span className="font-normal text-base">{info?.amount}</span>
        </li>
        <li className="flex gap-4 ">
          <Timer size={20} />{" "}
          <span className="font-normal text-base">{info?.timeline}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductCard;

interface IProps {
  info: IProductFull;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  handleDelete: ({
    info,
    setOpenConfirm,
  }: {
    info: IProductFull;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isLoading: boolean;
}
