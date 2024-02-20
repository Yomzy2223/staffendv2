import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { Button } from "flowbite-react";
import React from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";

const CountryForm = ({ open, setOpen }) => {
  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => setOpen(open)}
      title={title}
      size={wide ? "5xl" : "xl"}
    >
      <DynamicForm
        formInfo={section1FormInfo}
        defaultValues={defaultValues}
        formSchema={serviceInfoSchema}
        onFormSubmit={submitServiceInfo}
        className={cn("gap-4")}
      >
        <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
          <Button
            type="submit"
            color="primary"
            isProcessing={serviceLoading}
            disabled={serviceLoading}
            processingSpinner={
              <Oval color="white" strokeWidth={4} className="h-5 w-5" />
            }
          >
            {!serviceLoading && "Next"}
          </Button>
        </div>
      </DynamicForm>
    </DialogWrapper>
  );
};

export default CountryForm;
