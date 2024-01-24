import React, { useState } from "react";
import DynamicForm from "../dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useSearchParams } from "next/navigation";

const ServiceForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [section, setSection] = useState(1);
  const { get } = useSearchParams();
  const { isDesktop } = useGlobalFucntions();

  const isEdit = get("action") === "edit";
  const title1 = isEdit ? "Update Service" : "Add Service";
  const title2 = isEdit ? "Update Service Questions" : "Add Service Questions";
  const title = section === 1 ? title1 : title2;

  const formInfo = section === 1 ? section1FormInfo : section2FormInfo;

  const handleCreateService = () => {
    console.log("Service created");
  };

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title={title}>
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={serviceSchema}
        onFormSubmit={handleCreateService}
        className={cn("space-y-4")}
      >
        <div className="flex items-center justify-end gap-4">
          {section === 2 && (
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
          )}
          {section !== 2 && (
            <Button color="primary" onClick={() => setSection(section + 1)}>
              Next
            </Button>
          )}
          {section === 2 && (
            <Button type="submit" color="primary">
              Create service
            </Button>
          )}
        </div>
      </DynamicForm>
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
  address: z.string().min(20, "Kindly provide more information"),
});

const defaultValues = {
  name: "",
  description: "",
};
