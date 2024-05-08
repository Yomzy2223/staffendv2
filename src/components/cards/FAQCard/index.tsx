import ConfirmAction from "@/components/confirmAction";
import PopoverMenu from "@/components/features/popoverMenu";
import { TFAQ } from "@/services/faq/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useActions } from "./actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQCard = ({ info, setOpenEdit, handleDelete, isLoading }: IProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { popoverInfo } = useActions({ setOpenEdit, info, setOpenConfirm });

  return (
    <div className="max-w-[500px]">
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          className=" px-5 border border-border rounded-lg"
        >
          <div className="flex items-center justify-between gap-4">
            <AccordionTrigger
              className="text-start hover:no-underline"
              hideArrow
            >
              {info.question}
            </AccordionTrigger>
            <PopoverMenu menuInfo={popoverInfo} vertical />
          </div>
          <AccordionContent>
            <p>{info.answer}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

export default FAQCard;

interface IProps {
  info: TFAQ;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  handleDelete: ({
    info,
    setOpenConfirm,
  }: {
    info: TFAQ;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isLoading: boolean;
}
