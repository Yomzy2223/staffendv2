import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { Button } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";
import { useActions } from "./action";
import { formSchema } from "./constants";

const FAQForm = ({ open, setOpen, isUpdate }: IProps) => {
  const { submitFAQ, FAQRes, isPending, formInfo, defaultValues, resetDialog } =
    useActions({
      setOpen,
    });

  const searchParams = useSearchParams();
  const FAQId = searchParams.get("faqId") || "";

  return (
    <DialogWrapper
      open={open}
      title={FAQId ? "Update FAQ" : "Add FAQ"}
      size="3xl"
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={formSchema}
        onFormSubmit={submitFAQ}
        className="gap-4"
        disableAll={FAQRes.isLoading}
      >
        <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
          <Button
            type="submit"
            color="primary"
            isProcessing={isPending}
            disabled={isPending || FAQRes.isLoading}
            processingSpinner={
              <Oval color="white" strokeWidth={4} className="h-5 w-5" />
            }
          >
            {!isPending && (FAQId ? "Update" : "Create")}
          </Button>
        </div>
      </DynamicForm>
    </DialogWrapper>
  );
};

export default FAQForm;

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isUpdate?: boolean;
}
