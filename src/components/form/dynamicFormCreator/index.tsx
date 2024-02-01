import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import FormField, { formFieldType } from "./formField";
import { FieldType } from "./formField/constants";
import FieldTypePopUp from "./formField/fieldTypePopUp";

const DynamicFormCreator = ({ title, onEachSubmit, formInfo, wide }: propType) => {
  const [newlyAdded, setNewlyAdded] = useState<FieldType>();

  const btnText = (formInfo.length > 0 ? "Add another " : "Create a ") + (title || "field");

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
      {/* <div className={cn("flex flex-col flex-wrap gap-4", className)}> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {formInfo.map((info, i) => (
          <FormField
            key={info.title}
            number={i + 1}
            info={info}
            title={title}
            submitHandler={onEachSubmit}
          />
        ))}
        {newlyAdded && (
          <FormField
            number={formInfo.length + 1}
            info={newlyAdded}
            title={title}
            submitHandler={handleSubmit}
            isEdit
          />
        )}
      </Masonry>
      {/* </div> */}

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
    options?: FieldType[];
    compulsory: boolean;
  }[];
  wide?: boolean;
}
