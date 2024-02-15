import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { FieldType, FormType } from "./constants";
import DynamicField from "./dynamicField";
import { useFormActions } from "./actions";
import { serviceSubFormArgType } from "../../serviceForm/actions";

const EachForm = ({
  number,
  info,
  fieldsInfo,
  fieldTitle,
  fieldSubmitHandler,
  formSubmitHandler,
  isEdit,
  formState,
  loadingForm,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();
  const [loadingField, setLoadingField] = useState<number>();

  const { formLoading, formSuccess, fieldLoading, fieldSuccess } = formState;

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
        formSubmitHandler({ formId: info.id || "", values: formValues });
      } else formSubmitHandler({ values: formValues });
      return true;
    }
  };

  // Runs when each field is submitted
  const handleFieldSubmit = ({
    number,
    values,
    id,
  }: {
    number: number;
    values: { [x: string]: any };
    id?: string;
  }) => {
    setLoadingField(number);
    fieldSubmitHandler({
      formId: info.id || "",
      formValues,
      fieldId: id,
      values,
    });
  };

  useEffect(() => {
    if (!formLoading && formSuccess && loadingForm === number) setEdit(false);
    if (!fieldLoading && fieldSuccess && loadingField === lastField)
      setNewlyAdded(undefined);
  }, [formLoading, formSuccess, loadingForm]);

  const btnText =
    (fieldsInfo?.length > 0 || newlyAdded ? "Add another " : "Create a ") +
    (fieldTitle || "field");
  const lastField = (fieldsInfo?.length ?? 0) + 1;

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <Header edit={edit} info={formInfo} />

      {fieldsInfo?.map((field, i) => (
        <DynamicField
          key={field.question + i.toString()}
          number={i + 1}
          info={field}
          fieldTitle={fieldTitle}
          submitHandler={(values) =>
            handleFieldSubmit({ number: i + 1, values, id: field.id })
          }
          isEdit={edit}
          loading={fieldLoading && loadingField === i + 1}
          success={!fieldLoading && fieldSuccess && loadingField === i + 1}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={(fieldsInfo?.length ?? 0) + 1}
          info={newlyAdded}
          fieldTitle={fieldTitle}
          submitHandler={(values) =>
            handleFieldSubmit({ number: lastField, values })
          }
          isEdit={edit}
          loading={fieldLoading && loadingField === lastField}
          success={!fieldLoading && fieldSuccess && loadingField === lastField}
        />
      )}
      <Footer
        edit={edit}
        setEdit={setEdit}
        onDoneClick={handleFormSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
        loading={formLoading && loadingForm === number}
        cancelChanges={cancelChanges}
      />
    </Card>
  );
};

export default EachForm;

interface propType {
  number: number;
  fieldsInfo: FieldType[];
  info: FormType;
  fieldTitle?: string;
  fieldSubmitHandler: ({
    formId,
    formValues,
    fieldId,
    values,
  }: serviceSubFormArgType) => void;
  formSubmitHandler: ({
    formId,
    values,
  }: {
    formId?: string;
    values: FormType;
  }) => void;
  isEdit?: boolean;
  formState: {
    formLoading: boolean;
    formSuccess: boolean;
    fieldLoading: boolean;
    fieldSuccess: boolean;
  };
  loadingForm?: number;
}
