import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import DynamicFormCreator from "../dynamicFormCreator";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { Oval } from "react-loading-icons";
import { useServiceFormActions, useServiceInfoActions } from "./actions";

const ServiceForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [section, setSection] = useState(1);
  const { isDesktop } = useGlobalFucntions();

  const {
    isEdit,
    serviceInfo,
    submitServiceInfo,
    serviceLoading,
    serviceSuccess,
  } = useServiceInfoActions();

  const {
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
  } = useServiceFormActions();

  const title1 = isEdit ? "Update Service" : "Create Service";
  const title2 = isEdit ? "Update Service Form" : "Add Service Form";
  const title = section === 1 ? title1 : title2;

  const serviceData = serviceInfo?.data?.data?.data;
  const serviceFormData = serviceFormInfo?.data?.data?.data;

  useEffect(() => {
    if (serviceSuccess) setSection(section + 1);
  }, [serviceSuccess]);

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  console.log(serviceFormData);
  const wide = form2Info.length > 1 && section === 2 && isDesktop;

  const defaultValues = {
    name: serviceData?.name || "",
    description: serviceData?.description || "",
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title={title}
      size={wide ? "5xl" : "xl"}
    >
      {section === 1 && (
        <DynamicForm
          formInfo={section1FormInfo}
          defaultValues={defaultValues}
          formSchema={serviceInfoSchema}
          onFormSubmit={submitServiceInfo}
          className={cn("space-y-4")}
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
      )}

      {section === 2 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={form2Info}
            onEachSubmit={submitServiceFormField}
            onFormSubmit={submitServiceForm}
            formState={serviceFormState}
            wide
          />
          <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
            <Button color="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      )}
    </DialogWrapper>
  );
};

export default ServiceForm;

const section1FormInfo = [
  {
    name: "name",
    label: "Enter service name",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter service name",
    },
  },
  {
    name: "description",
    label: "Enter service description",
    type: "textarea",
    labelProp: {
      className: "font-normal",
    },
    textAreaProp: {
      placeholder: "Enter a brief description of this service",
    },
  },
];
const serviceInfoSchema = z.object({
  name: z.string().min(3, "Service name should be at least 3 characters"),
  description: z
    .string({ required_error: "Provide service description" })
    .min(20, "Kindly provide more information"),
});

export type serviceInfoType = z.infer<typeof serviceInfoSchema>;

const form2Info = [
  {
    id: "984w0urw9riw",
    type: "person",
    title: "Describe the pleases",
    description: "some description to do here",
    compulsory: false,
    subform: [
      {
        type: "paragraph",
        question: "Describe the please",
        compulsory: false,
      },
      {
        question: "Enter your name",
        type: "short answer",
        options: [""],
        compulsory: false,
        fileName: "Some docs",
        fileDescription: "I have no idea",
        fileLink: "some random link",
        fileType: "pdf",
      },
    ],
  },
  {
    type: "person",
    title: "Describe thed pleases",
    description: "some description to do here",
    compulsory: false,
    subform: [
      {
        type: "paragraph",
        question: "Describe theds please",
        compulsory: true,
      },
      {
        type: "paragraph",
        question: "Describe the servicesd ",
        compulsory: true,
      },
      {
        type: "checkbox",
        question: "Describe the servicedsd ",
        compulsory: true,
        options: ["option1", "option2"],
      },
      {
        type: "paragraph",
        question: "Describe the serzvicesd ",
        compulsory: true,
      },
    ],
  },
];
