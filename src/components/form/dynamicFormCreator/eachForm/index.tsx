import { Card } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { FormType } from "./constants";
import DynamicField from "./dynamicField";
import { useFormActions } from "./actions";
import { IFieldSubmitHandlerArg, IFormSubmitHandlerArg } from "./types";
import { AxiosResponse } from "axios";
import { TSubFormCreate, TSubFormGet } from "@/services";

const EachForm = ({
  number,
  info,
  fieldsInfo,
  fieldTitle,
  fieldSubmitHandler,
  fieldDeleteHandler,
  formSubmitHandler,
  formDeleteHandler,
  isNew,
  isEdit,
  formState,
  loadingForm,
  setNewlyAddedForm,
  disallowPerson,
}: IProps) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [newlyAdded, setNewlyAdded] = useState<TSubFormGet | undefined>();
  const [loadingField, setLoadingField] = useState<number>();

  const { formLoading, fieldLoading, fieldDeleteLoading, formDeleteLoading } =
    formState;

  const formInfo = useFormActions({
    formInfo: info,
    formLoading,
    setEdit,
    isNew,
    formDeleteHandler,
  });
  const {
    title,
    description,
    type,
    compulsory,
    setIsSubmitted,
    validateFields,
    cancelChanges,
    fieldsEditState,
    setFieldsEditState,
  } = formInfo;

  const formValues = {
    title,
    description,
    type,
    compulsory,
  };

  // Runs when form is submitted
  const handleFormSubmit = ({
    onSuccess,
  }: {
    onSuccess?: (data: AxiosResponse<any, any>) => void;
  }) => {
    setIsSubmitted(true);
    if (validateFields()) {
      //Only runs block when all fields are validated
      if (info.id) {
        formSubmitHandler({
          formId: info.id || "",
          values: formValues,
          onSuccess: (data) => onSuccess && onSuccess(data),
        });
      } else
        formSubmitHandler({
          values: formValues,
          onSuccess: (data) => {
            setNewlyAddedForm && setNewlyAddedForm(undefined);
            onSuccess && onSuccess(data);
          },
        });
      return true;
    }
  };

  // Runs when each field is submitted
  const handleFieldSubmit = (arg: IFieldSubmitHandlerArg) => {
    setLoadingField(arg.number);
    const formId = info.id;

    // Triggered after a field is successfully created
    const onFieldSuccess = (data: AxiosResponse<any, any>) => {
      arg.setNewlyAdded && arg.setNewlyAdded(undefined);
      arg.onSuccess && arg.onSuccess(data);
    };

    // Triggered after a form is successfully created
    const onFormSuccess = (data: AxiosResponse<any, any>) => {
      const formId = data.data.data.id;
      fieldSubmitHandler({
        ...arg,
        formId,
        onSuccess: onFieldSuccess,
      });
    };

    if (!formId) {
      handleFormSubmit({ onSuccess: onFormSuccess }); // Create form, then create field with the formId
      return;
    }
    fieldSubmitHandler({
      ...arg,
      formId: info.id || "",
      onSuccess: onFieldSuccess,
    });
  };

  const btnText =
    (fieldsInfo?.length > 0 || newlyAdded ? "Add another " : "Create a ") +
    (fieldTitle || "field");

  const lastField = (fieldsInfo?.length ?? 0) + 1;

  const disableButtons = fieldsEditState.some((el) => el.edit === true);

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <Header
        edit={edit}
        info={formInfo}
        loading={formLoading && loadingForm === number}
        disallowPerson={disallowPerson}
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
              onSuccess: () => arg.setEdit(false),
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
          fieldsEditState={fieldsEditState}
          setFieldsEditState={setFieldsEditState}
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
              setNewlyAdded,
              onSuccess: () => arg.setEdit(false),
            })
          }
          isEdit={edit}
          loading={fieldLoading && loadingField === lastField}
          deleteField={() => {
            setFieldsEditState(
              [...fieldsEditState].filter((el) => el.number !== lastField)
            );
            setNewlyAdded(undefined);
          }}
          fieldsEditState={fieldsEditState}
          setFieldsEditState={setFieldsEditState}
          isNew
        />
      )}

      <Footer
        edit={edit}
        setEdit={setEdit}
        onDoneClick={handleFormSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
        disabled={disableButtons || (formLoading && loadingForm === number)}
        deleteLoading={formDeleteLoading && loadingForm === number}
        cancelChanges={cancelChanges}
        disableAddNew={!!newlyAdded}
        deleteForm={formDeleteHandler}
      />
    </Card>
  );
};

export default EachForm;

interface IProps {
  number: number;
  fieldsInfo: TSubFormGet[];
  info: FormType;
  fieldTitle?: string;
  fieldSubmitHandler: ({
    formId,
    fieldId,
    values,
  }: IFieldSubmitHandlerArg) => void;
  formSubmitHandler: ({ formId, values }: IFormSubmitHandlerArg) => void;
  fieldDeleteHandler: (id: string) => void;
  formDeleteHandler: () => void;
  isEdit?: boolean;
  isNew?: boolean;
  formState: {
    formLoading: boolean;
    formSuccess: boolean;
    fieldLoading: boolean;
    fieldSuccess: boolean;
    fieldDeleteLoading: boolean;
    formDeleteLoading: boolean;
  };
  loadingForm?: number;
  setNewlyAddedForm?: Dispatch<SetStateAction<FormType | undefined>>;
  disallowPerson?: boolean;
}
