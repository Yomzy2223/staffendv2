import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import EachForm from "./eachForm";
import { FieldType, FormType } from "./eachForm/constants";
import FieldTypePopUp from "./eachForm/fieldTypePopUp";
import { IFieldSubmitHandlerArg } from "./eachForm/types";

const DynamicFormCreator = ({
  fieldTitle,
  onEachSubmit,
  onEachDelete,
  onFormSubmit,
  onFormDelete,
  formInfo,
  formState,
  wide,
}: IProps) => {
  const [newlyAdded, setNewlyAdded] = useState<FormType>();
  const [loadingForm, setLoadingForm] = useState<number>();

  const btnText = formInfo?.length > 0 ? "Add another form" : "Create a form";

  const handleSelect = (selected?: FormType | any) => {
    if (!selected) return;
    setNewlyAdded(selected);
  };

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
            fieldsInfo={info?.subForm || info?.productSubForm}
            fieldTitle={fieldTitle}
            fieldSubmitHandler={onEachSubmit}
            formSubmitHandler={({ formId, values, setEdit }) => {
              setLoadingForm(i + 1);
              onFormSubmit({ formId, values, setEdit });
            }}
            fieldDeleteHandler={onEachDelete}
            formDeleteHandler={() => {
              setLoadingForm(i + 1);
              onFormDelete(info.id);
            }}
            info={info}
            formState={formState}
            loadingForm={loadingForm}
          />
        ))}
        {newlyAdded && (
          <EachForm
            number={lastForm}
            fieldsInfo={[]}
            fieldTitle={fieldTitle}
            fieldSubmitHandler={onEachSubmit}
            formSubmitHandler={({ formId, values, setEdit }) => {
              setLoadingForm(lastForm);
              onFormSubmit({ formId, values, setEdit, setNewlyAdded });
            }}
            fieldDeleteHandler={onEachDelete}
            formDeleteHandler={() => setNewlyAdded(undefined)}
            info={{ ...newlyAdded }}
            formState={formState}
            loadingForm={loadingForm}
            isEdit
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

interface IProps {
  fieldTitle?: string;
  onEachSubmit: (arg: IFieldSubmitHandlerArg) => void;
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
    productSubForm: FieldType[];
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
