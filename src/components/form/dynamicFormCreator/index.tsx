import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import FormField from "./formField";
import { FieldType } from "./formField/constants";
import FieldTypePopUp from "./formField/fieldTypePopUp";

const DynamicFormCreator = ({ title, onEachSubmit, formInfo }: propType) => {
  const [selectedType, setSelectedType] = useState<FieldType>();

  const btnText =
    (formInfo.length > 0 ? "Add another " : "Create a ") +
    (title || "question");

  const handleSelect = (type?: FieldType) => {
    if (!type) return;
    setSelectedType(type);
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap gap-4">
        {formInfo.map((info, i) => (
          <FormField
            key={info.title}
            number={i + 1}
            info={info}
            title={title}
            submitHandler={onEachSubmit}
          />
        ))}
        {selectedType && (
          <FormField
            number={formInfo.length + 1}
            info={selectedType}
            title={title}
            submitHandler={onEachSubmit}
          />
        )}
      </div>

      <FieldTypePopUp handleSelect={handleSelect}>
        <Button color="ghost" size="fit" className="my-4 text-foreground-5">
          <PlusCircle size={20} />
          {btnText}
        </Button>
      </FieldTypePopUp>
    </div>
  );
};

export default DynamicFormCreator;

interface propType {
  title?: string;
  onEachSubmit: (values: any) => void;
  formInfo: {
    type: string;
    title: string;
    options?: [];
    compulsory: boolean;
  }[];
}
