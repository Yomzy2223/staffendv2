import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import EachForm from "./eachForm";
import { FieldType } from "./eachForm/constants";
import { formFieldType } from "./eachForm/dynamicField";
import FieldTypePopUp from "./eachForm/fieldTypePopUp";

const DynamicFormCreator = ({
  fieldTitle,
  onEachSubmit,
  formInfo,
  wide,
}: propType) => {
  const [newlyAdded, setNewlyAdded] = useState<FieldType>();

  const btnText =
    (formInfo.length > 0 ? "Add another " : "Create a ") +
    (fieldTitle || "field");

  const handleSelect = (type?: FieldType) => {
    if (!type) return;
    setNewlyAdded(type);
  };

  const handleSubmit = async (values: formFieldType) => {
    await onEachSubmit(values);
    setNewlyAdded(undefined);
  };

  const breakpointColumnsObj = {
    default: wide ? 2 : 1,
    700: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {formInfo.map((info, i) => (
          <EachForm
            key={info.title}
            number={i + 1}
            info={info}
            fieldTitle={fieldTitle}
            submitHandler={onEachSubmit}
          />
        ))}
        {newlyAdded && (
          <EachForm
            number={formInfo.length + 1}
            info={newlyAdded}
            fieldTitle={fieldTitle}
            submitHandler={handleSubmit}
            isEdit
          />
        )}
      </Masonry>

      <FieldTypePopUp handleSelect={handleSelect} isForm>
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
  fieldTitle?: string;
  onEachSubmit: (values: any) => void;
  formInfo: {
    type: string;
    title: string;
    options?: FieldType[];
    compulsory: boolean;
  }[];
  wide?: boolean;
}
