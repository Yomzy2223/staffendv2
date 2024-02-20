import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import EachForm from "./eachForm";
import { FieldType, FormType } from "./eachForm/constants";
import FieldTypePopUp from "./eachForm/fieldTypePopUp";

const DynamicFormCreator = ({
  fieldTitle,
  onEachSubmit,
  onEachDelete,
  onFormSubmit,
  onFormDelete,
  formInfo,
  formState,
  wide,
}: propType) => {
  const [newlyAdded, setNewlyAdded] = useState<FormType>();
  const [loadingForm, setLoadingForm] = useState<number>();

  const { formLoading, formSuccess } = formState;

  const btnText = formInfo?.length > 0 ? "Add another form" : "Create a form";

  const handleSelect = (selected?: FormType | any) => {
    if (!selected) return;
    setNewlyAdded(selected);
  };

  const handleFieldSubmit = (values: { [x: string]: any }) => {
    onEachSubmit(values);
  };

  useEffect(() => {
    if (!formLoading && formSuccess && loadingForm === lastForm)
      setNewlyAdded(undefined);
  }, [formLoading, formSuccess]);

  const lastForm = (formInfo?.length ?? 0) + 1;

  const breakpointColumnsObj = {
    default: wide ? 2 : 1,
    800: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {formInfo?.map((info, i) => (
          <EachForm
            key={info.title + i}
            number={i + 1}
            fieldsInfo={info?.subForm || info?.serviceSubForm}
            fieldTitle={fieldTitle}
            fieldSubmitHandler={onEachSubmit}
            formSubmitHandler={({ formId, values }) => {
              setLoadingForm(i + 1);
              onFormSubmit({ formId, values });
            }}
            fieldDeleteHandler={onEachDelete}
            formDeleteHandler={() => onFormDelete(info.id)}
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
            fieldSubmitHandler={handleFieldSubmit}
            formSubmitHandler={({ formId, values }) => {
              setLoadingForm((formInfo?.length ?? 0) + 1);
              onFormSubmit({ formId, values });
            }}
            fieldDeleteHandler={onEachDelete}
            formDeleteHandler={() => setNewlyAdded(undefined)}
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

      <FieldTypePopUp
        handleSelect={handleSelect}
        isForm
        disabled={formState.formLoading || newlyAdded ? true : false}
      >
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
  onEachDelete: (id: string) => void;
  onFormSubmit: (values: any) => void;
  onFormDelete: (id: string) => void;
  formInfo: {
    id: string;
    type: string;
    title: string;
    description: string;
    compulsory: boolean;
    subForm: FieldType[];
    serviceSubForm: FieldType[];
  }[];
  formState: {
    formLoading: boolean;
    formSuccess: boolean;
    fieldLoading: boolean;
    fieldSuccess: boolean;
    fieldDeleteLoading: boolean;
    formDeleteLoading: boolean;
  };
  wide?: boolean;
}
