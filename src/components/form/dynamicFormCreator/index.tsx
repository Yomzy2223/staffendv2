import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import EachForm from "./eachForm";
import { FieldType, FormType } from "./eachForm/constants";
import FieldTypePopUp from "./eachForm/fieldTypePopUp";

const DynamicFormCreator = ({
  fieldTitle,
  onEachSubmit,
  onFormSubmit,
  formInfo,
  formState,
  wide,
}: propType) => {
  const [newlyAdded, setNewlyAdded] = useState<FormType>();
  const [loadingForm, setLoadingForm] = useState<number>();

  const btnText = formInfo?.length > 0 ? "Add another form" : "Create a form";

  const handleSelect = (selected?: FormType | any) => {
    if (!selected) return;
    setNewlyAdded(selected);
  };

  const handleSubmit = async (values: { [x: string]: any }) => {
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
            key={info.title + i}
            number={i + 1}
            fieldsInfo={info?.subForm}
            fieldTitle={fieldTitle}
            fieldSubmitHandler={onEachSubmit}
            formSubmitHandler={({ formId, values }) => {
              setLoadingForm(i + 1);
              onFormSubmit({ formId, values });
            }}
            info={info}
            formState={formState}
            loadingForm={loadingForm}
          />
        ))}
        {newlyAdded && (
          <EachForm
            number={(formInfo?.length ?? 0) + 1}
            fieldsInfo={[]}
            fieldTitle={fieldTitle}
            fieldSubmitHandler={handleSubmit}
            formSubmitHandler={({ formId, values }) => {
              setLoadingForm((formInfo?.length ?? 0) + 1);
              onFormSubmit({ formId, values });
            }}
            isEdit
            info={{
              type: newlyAdded.type,
              title: newlyAdded?.title,
              description: newlyAdded?.description,
              compulsory: newlyAdded?.compulsory,
            }}
            formState={formState}
            loadingForm={loadingForm}
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
  onFormSubmit: (values: any) => void;
  formInfo: {
    id?: string;
    type: string;
    title: string;
    description: string;
    compulsory: boolean;
    subForm: FieldType[];
  }[];
  formState: {
    formLoading: boolean;
    formSuccess: boolean;
    fieldLoading: boolean;
    fieldSuccess: boolean;
  };
  wide?: boolean;
}
