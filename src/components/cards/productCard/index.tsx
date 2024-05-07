import ConfirmAction from "@/components/confirmAction";
import PopoverMenu from "@/components/features/popoverMenu";
import { TProductGet } from "@/services/product/types";
import { Currency, Timer, WholeWord } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useActions } from "./actions";

const ProductCard = ({
  info,
  setOpenEdit,
  handleDelete,
  isLoading,
}: IProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { popoverInfo } = useActions({ setOpenEdit, info, setOpenConfirm });

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
          <PopoverMenu menuInfo={popoverInfo} />
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
  );
};

export default ProductCard;

interface IProps {
  info: TProductGet;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  handleDelete: ({
    info,
    setOpenConfirm,
  }: {
    info: TProductGet;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isLoading: boolean;
}
