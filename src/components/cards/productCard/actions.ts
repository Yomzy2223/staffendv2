import { IPopoverMenu } from "@/components/features/popoverMenu";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TProductGet } from "@/services/product/types";
import { Dispatch, SetStateAction } from "react";

export const useActions = ({
  info,
  setOpenEdit,
  setOpenConfirm,
}: {
  info: TProductGet;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setQuery } = useGlobalFunctions();

  const handleEdit = () => {
    setOpenEdit(true);
    setQuery("productId", info.id);
  };

  const popoverInfo: IPopoverMenu[] = [
    {
      text: "Edit",
      action: handleEdit,
      className: "w-full md:[&_span]:justify-start",
      showSeparator: true,
    },
    {
      text: "Delete",
      action: () => setOpenConfirm(true),
      className:
        "md:[&_span]:justify-start w-full text-destructive-foreground hover:!text-destructive-foreground hover:!bg-destructive",
    },
  ];

  return { popoverInfo };
};
