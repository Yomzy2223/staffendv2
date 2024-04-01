import { ISubForm } from "@/hooks/api/types";
import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import EachForm from "./eachForm";
import { FormType } from "./eachForm/constants";
import FieldTypePopUp from "./eachForm/fieldTypePopUp";
import {
  FieldType,
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "./eachForm/types";
import { v4 as uuidv4 } from "uuid";

const DynamicFormCreator = ({
  fieldTitle,
  submitMultipleFields,
  onEachSubmit,
  onEachDelete,
  onFormSubmit,
  onFormDelete,
  formInfo,
  formState,
  wide,
  disallowPerson,
}: IProps) => {
  const [newlyAdded, setNewlyAdded] = useState<FormType>();
  const [loadingForm, setLoadingForm] = useState<number>();

  const handleSelect = (selected?: FormType | any) => {
    if (!selected) return;
    if (selected.type === "person") {
      const { title, description, compulsory, type, subForm } = selected;
      if (!subForm) return;
      onFormSubmit({
        values: {
          title: title + " - " + uuidv4(),
          description,
          compulsory,
          type,
        },
        onSuccess: (data) => {
          if (!submitMultipleFields) return;
          const formId = data.data.data.id;
          submitMultipleFields({
            formId,
            values: subForm,
          });
        },
      });
      return;
    }
    setNewlyAdded(selected);
  };

  const btnText = formInfo?.length > 0 ? "Add another form" : "Create a form";
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
            formSubmitHandler={(arg) => {
              setLoadingForm(i + 1);
              onFormSubmit(arg);
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
            formSubmitHandler={(arg) => {
              setLoadingForm(lastForm);
              onFormSubmit(arg);
            }}
            fieldDeleteHandler={onEachDelete}
            formDeleteHandler={() => setNewlyAdded(undefined)}
            info={{ ...newlyAdded }}
            formState={formState}
            loadingForm={loadingForm}
            setNewlyAddedForm={setNewlyAdded}
            isEdit
          />
        )}
      </Masonry>

      {disallowPerson ? (
        <Button
          color="ghost"
          size="fit"
          className="my-4 text-foreground-5"
          onClick={() => handleSelect("form")}
        >
          <PlusCircle size={20} />
          {btnText}
        </Button>
      ) : (
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
      )}
    </div>
  );
};

export default DynamicFormCreator;

interface IProps {
  fieldTitle?: string;
  submitMultipleFields?: ({
    formId,
    values,
  }: {
    formId: string;
    values: FieldType[];
  }) => void;
  onEachSubmit: (arg: IFieldSubmitHandlerArg) => void;
  onEachDelete: (id: string) => void;
  onFormSubmit: (values: IFormSubmitHandlerArg) => void;
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
  disallowPerson?: boolean;
}
