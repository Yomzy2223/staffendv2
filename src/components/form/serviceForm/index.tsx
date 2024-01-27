import React, { useState } from "react";
import DynamicForm from "../dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useSearchParams } from "next/navigation";
import DynamicFormCreator from "../dynamicFormCreator";
import { FieldType } from "@/components/form/dynamicFormCreator/formField/constants";

const ServiceForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [section, setSection] = useState(1);
  const { get } = useSearchParams();

  const isEdit = get("action") === "edit";
  const title1 = isEdit ? "Update Service" : "Add Service";
  const title2 = isEdit ? "Update Service Form" : "Add Service Form";
  const title = section === 1 ? title1 : title2;

  const formInfo = section === 1 ? section1FormInfo : section2FormInfo;

  const handleCreateService = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  const handleFormSubmit = (value: FieldType) => {
    console.log(value);
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title={title}>
      {section === 1 && (
        <DynamicForm
          formInfo={section1FormInfo}
          defaultValues={defaultValues}
          formSchema={serviceSchema}
          onFormSubmit={handleCreateService}
          className={cn("space-y-4")}
        >
          <div className="flex items-center justify-end">
            <Button type="submit" color="primary">
              Next
            </Button>
          </div>
        </DynamicForm>
      )}

      {section === 2 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={form2Info}
            onEachSubmit={handleFormSubmit}
          />
          <div className="flex items-center justify-end gap-4">
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

const section2FormInfo = [
  {
    name: "address",
    label: "Enter service country",
    type: "textarea",
    labelProp: {
      className: "font-normal",
    },
    textAreaProp: {
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

const serviceSchema = z.object({
  name: z.string().min(3, "Service name should be at least 3 characters"),
  description: z.string().min(20, "Kindly provide more information"),
});

const defaultValues = {
  name: "uiisjdkfl;",
  description: "a;ofikldj;fsbjadkfndlmd;fsdfjkfk;d",
};

const form2Info = [
  {
    type: "paragraph",
    title: "Describe the service please",
    compulsory: true,
  },
  {
    type: "paragraph",
    title: "Describe the service ",
    compulsory: false,
  },
  {
    type: "paragraph",
    title: "Describe service please",
    compulsory: true,
  },
  {
    type: "paragraph",
    title: "Describe the please",
    compulsory: false,
  },
];
