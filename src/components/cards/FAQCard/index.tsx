import ConfirmAction from "@/components/confirmAction";
import PopoverMenu from "@/components/features/popoverMenu";
import { TFAQ } from "@/services/faq/types";
import { Accordion } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useActions } from "./actions";

const FAQCard = ({ info, setOpenEdit, handleDelete, isLoading }: IProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { popoverInfo } = useActions({ setOpenEdit, info, setOpenConfirm });

  return (
    <div>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>{info.question}</Accordion.Title>
          <Accordion.Content>
            <p>{info.answer}</p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <PopoverMenu menuInfo={popoverInfo} />

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
