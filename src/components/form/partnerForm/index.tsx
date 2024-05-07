import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import DynamicFormCreator from "../dynamicFormCreator";
import { useParterFormActions } from "./actions";

const PartnerForm = ({ open, setOpen }: IProps) => {
  const { deleteQueryStrings } = useGlobalFunctions();

  const {
    partnerFormInfo,
    submitPartnerForm,
    submitPartnerFormField,
    partnerFormState,
    handleFieldDelete,
    handleFormDelete,
  } = useParterFormActions();

  const partnerFormData = partnerFormInfo?.data?.data?.data;

  const title =
    partnerFormData?.length > 0
      ? "Update Requirement Form"
      : "Create Requirement Form";

  const resetDialog = () => {
    setOpen(false);
    deleteQueryStrings(["action", "country"]);
  };

  const wide = partnerFormData?.length > 1;

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={title}
      size={wide ? "5xl" : ""}
    >
      <div className="flex flex-col justify-between gap-6 flex-1">
        <DynamicFormCreator
          formInfo={partnerFormData}
          onEachSubmit={submitPartnerFormField}
          onEachDelete={handleFieldDelete}
          onFormSubmit={submitPartnerForm}
          onFormDelete={handleFormDelete}
          formState={partnerFormState}
          wide={wide}
          disallowPerson
        />
        <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
          <Button color="primary" onClick={resetDialog}>
            Done
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default PartnerForm;

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
