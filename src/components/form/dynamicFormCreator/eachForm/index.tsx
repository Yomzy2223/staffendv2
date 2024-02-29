import { Card } from "flowbite-react";
import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { FormType } from "./constants";
import DynamicField from "./dynamicField";
import { useFormActions } from "./actions";
import {
  FieldType,
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "./types";

const EachForm = ({
  number,
  info,
  fieldsInfo,
  fieldTitle,
  fieldSubmitHandler,
  fieldDeleteHandler,
  formSubmitHandler,
  formDeleteHandler,
  isEdit,
  formState,
  loadingForm,
}: IProps) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();
  const [loadingField, setLoadingField] = useState<number>();

  const { formLoading, fieldLoading, fieldDeleteLoading, formDeleteLoading } =
    formState;

  const formInfo = useFormActions({ formInfo: info, formLoading, setEdit });
  const {
    title,
    description,
    type,
    compulsory,
    setIsSubmitted,
    validateFields,
    cancelChanges,
  } = formInfo;

  const formValues = {
    title,
    description,
    type,
    compulsory,
  };

  // Runs when form is submitted
  const handleFormSubmit = () => {
    setIsSubmitted(true);
    if (validateFields()) {
      if (info.id) {
        formSubmitHandler({
          formId: info.id || "",
          values: formValues,
          setEdit,
        });
      } else formSubmitHandler({ values: formValues, setEdit });
      return true;
    }
  };

  // Runs when each field is submitted
  const handleFieldSubmit = (arg: IFieldSubmitHandlerArg) => {
    setLoadingField(arg.number);
    fieldSubmitHandler({
      ...arg,
      formId: info.id || "",
    });
  };

  const btnText =
    (fieldsInfo?.length > 0 || newlyAdded ? "Add another " : "Create a ") +
    (fieldTitle || "field");

  const lastField = (fieldsInfo?.length ?? 0) + 1;

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <Header
        edit={edit}
        info={formInfo}
        loading={formLoading && loadingForm === number}
      />
      {fieldsInfo?.map((field, i) => (
        <DynamicField
          key={field.question + i.toString()}
          number={i + 1}
          info={field}
          fieldTitle={fieldTitle}
          submitHandler={(arg) =>
            handleFieldSubmit({
              ...arg,
              number: i + 1,
              fieldId: field.id,
              formValues,
            })
          }
          isEdit={edit}
          loading={fieldLoading && loadingField === i + 1}
          deleteLoading={fieldDeleteLoading && loadingField === i + 1}
          deleteField={() => {
            setLoadingField(i + 1);
            field.id && fieldDeleteHandler(field.id);
          }}
          fieldsInfo={fieldsInfo}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={lastField}
          info={newlyAdded}
          fieldTitle={fieldTitle}
          submitHandler={(arg) =>
            handleFieldSubmit({
              ...arg,
              number: lastField,
              formValues,
              setNewlyAdded,
            })
          }
          isEdit={edit}
          loading={fieldLoading && loadingField === lastField}
          deleteField={() => setNewlyAdded(undefined)}
          isNew
        />
      )}

      <Footer
        edit={edit}
        setEdit={setEdit}
        onDoneClick={handleFormSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
        loading={formLoading && loadingForm === number}
        deleteLoading={formDeleteLoading && loadingForm === number}
        cancelChanges={cancelChanges}
        disableAddNew={newlyAdded ? true : false}
        deleteForm={formDeleteHandler}
      />
    </Card>
  );
};

export default EachForm;

interface IProps {
  number: number;
  fieldsInfo: FieldType[];
  info: FormType;
  fieldTitle?: string;
  fieldSubmitHandler: ({
    formId,
    formValues,
    fieldId,
    values,
    setEdit,
  }: IFieldSubmitHandlerArg) => void;
  formSubmitHandler: ({
    formId,
    values,
    setEdit,
  }: IFormSubmitHandlerArg) => void;
  fieldDeleteHandler: (id: string) => void;
  formDeleteHandler: () => void;
  isEdit?: boolean;
  formState: {
    formLoading: boolean;
    formSuccess: boolean;
    fieldLoading: boolean;
    fieldSuccess: boolean;
    fieldDeleteLoading: boolean;
    formDeleteLoading: boolean;
  };
  loadingForm?: number;
}
