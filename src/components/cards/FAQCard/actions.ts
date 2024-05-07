import { IPopoverMenu } from "@/components/features/popoverMenu";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TFAQ } from "@/services/faq/types";
import { TProductGet } from "@/services/product/types";
import { Dispatch, SetStateAction } from "react";

export const useActions = ({
  info,
  setOpenEdit,
  setOpenConfirm,
}: {
  info: TFAQ;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setQuery, setQueriesWithPath } = useGlobalFunctions();

  const handleEdit = () => {
    setOpenEdit(true);
    setQueriesWithPath({
      queries: [
        { name: "faqId", value: info.id },
        { name: "serviceId", value: info.serviceId },
        { name: "productId", value: info.productId },
      ],
    });
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
