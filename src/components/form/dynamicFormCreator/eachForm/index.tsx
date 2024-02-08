import { Card } from "flowbite-react";
import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { FieldType, FormType } from "./constants";
import DynamicField from "./dynamicField";
import { useFormActions } from "./actions";

const EachForm = ({
  info,
  fieldsInfo,
  fieldTitle,
  fieldSubmitHandler,
  formSubmitHandler,
  isEdit,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();

  const formInfo = useFormActions(info);
  const {
    title,
    description,
    type,
    compulsory,
    setIsSubmitted,
    validateFields,
  } = formInfo;

  // Creates form if not created yet. Updates otherwise (if form submit button).
  const submitForm = async ({ isForm }: { isForm: boolean }) => {
    if (validateFields()) {
      const values = {
        title,
        description,
        type,
        compulsory,
      };

      if (info.id) {
        isForm && (await formSubmitHandler({ formId: info.id || "", values }));
      } else await formSubmitHandler({ values });
      return true;
    }
    return false;
  };

  // Runs when form is submitted
  const handleFormSubmit = async () => {
    setIsSubmitted(true);
    const res = await submitForm({ isForm: true });
    if (res) setEdit(false);
  };

  // Runs when each field is submitted
  const handleFieldSubmit = async (values: { [x: string]: any }) => {
    await submitForm({ isForm: false });
    await fieldSubmitHandler(values);
    setNewlyAdded(undefined);
  };

  const btnText =
    (fieldsInfo?.length > 0 || newlyAdded ? "Add another " : "Create a ") +
    (fieldTitle || "field");

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <Header edit={edit} info={formInfo} />

      {fieldsInfo?.map((field, i) => (
        <DynamicField
          key={field.question}
          number={i + 1}
          info={field}
          fieldTitle={fieldTitle}
          submitHandler={fieldSubmitHandler}
          isEdit={edit}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={(fieldsInfo?.length ?? 0) + 1}
          info={newlyAdded}
          fieldTitle={fieldTitle}
          submitHandler={handleFieldSubmit}
          isEdit={edit}
        />
      )}
      <Footer
        edit={edit}
        setEdit={setEdit}
        onDoneClick={handleFormSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
      />
    </Card>
  );
};

export default EachForm;

interface propType {
  fieldsInfo: FieldType[];
  info: FormType;
  fieldTitle?: string;
  fieldSubmitHandler: (values: { [x: string]: any }) => void;
  formSubmitHandler: ({
    formId,
    values,
  }: {
    formId?: string;
    values: FormType;
  }) => void;
  isEdit?: boolean;
}
