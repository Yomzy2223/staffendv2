import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import DynamicFormCreator from "../dynamicFormCreator";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Oval } from "react-loading-icons";
import { useServiceFormActions, useServiceInfoActions } from "./actions";
import { section1FormInfo, serviceInfoSchema } from "./constants";

const ServiceForm = ({ open, setOpen }: IProps) => {
  const [section, setSection] = useState(1);
  const { isDesktop, deleteQueryString } = useGlobalFunctions();

  const { isEdit, serviceInfo, submitServiceInfo, serviceLoading } =
    useServiceInfoActions({ section, setSection });

  const {
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
    handleFieldDelete,
    handleFormDelete,
    submitMultipleFields,
  } = useServiceFormActions();

  const serviceData = serviceInfo?.data?.data?.data;
  const serviceFormData = serviceFormInfo?.data?.data?.data;

  const title1 = isEdit ? "Update Service" : "Create Service";
  const title2 =
    serviceFormData?.length > 0 ? "Update Service Form" : "Add Service Form";
  const title = section === 1 ? title1 : title2;

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  const resetDialog = () => {
    setOpen(false);
    setSection(1);
    deleteQueryString("action");
  };

  const wide = serviceFormData?.length > 1 && section !== 1;

  const defaultValues = {
    name: isEdit ? serviceData?.name : "",
    description: isEdit ? serviceData?.description : "",
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={title}
      size={wide ? "5xl" : ""}
    >
      {section === 1 && (
        <DynamicForm
          formInfo={section1FormInfo}
          defaultValues={defaultValues}
          formSchema={serviceInfoSchema}
          onFormSubmit={submitServiceInfo}
          className={cn("gap-4")}
          disableAll={serviceInfo.isLoading}
        >
          <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
            <Button
              type="submit"
              color="primary"
              isProcessing={serviceLoading}
              disabled={serviceLoading || serviceInfo.isLoading}
              processingSpinner={
                <Oval color="white" strokeWidth={4} className="h-5 w-5" />
              }
            >
              {!serviceLoading && "Next"}
            </Button>
          </div>
        </DynamicForm>
      )}

      {section === 2 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={serviceFormData}
            submitMultipleFields={submitMultipleFields}
            onEachSubmit={submitServiceFormField}
            onEachDelete={handleFieldDelete}
            onFormSubmit={submitServiceForm}
            onFormDelete={handleFormDelete}
            formState={serviceFormState}
            wide={wide}
          />
          <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
            <Button color="primary" onClick={resetDialog}>
              Done
            </Button>
          </div>
        </div>
      )}
    </DialogWrapper>
  );
};

export default ServiceForm;

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
