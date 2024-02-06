import { Card, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "./constants";
import DynamicField, { formFieldType } from "./dynamicField";
import { useFormActions } from "./actions";
import { cn } from "@/lib/utils";

const EachForm = ({
  formInfo,
  fieldsInfo,
  number,
  fieldTitle,
  fieldSubmitHandler,
  formSubmitHandler,
  isEdit,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();
  // const [selectedType, setSelectedType] = useState<FieldType | undefined>({
  //   ...fieldsInfo,
  // });

  const {
    title,
    setTitle,
    description,
    setDescription,
    compulsory,
    setCompulsory,
    setIsSubmitted,
    titleError,
    descError,
    validateFields,
  } = useFormActions(formInfo);

  // Runs when form is submitted
  const handleFormSubmit = async () => {
    setIsSubmitted(true);
    if (validateFields()) {
      const values = {
        title,
        description,
        type: selectedType?.type || "",
        compulsory: compulsory,
      };
      await formSubmitHandler({ formId: formInfo.id || "", values });
      setEdit(false);
    }
  };

  // Runs when each field is submitted
  const handleFieldSubmit = async (values: formFieldType) => {
    await fieldSubmitHandler(values);
    setNewlyAdded(undefined);
  };

  const btnText = selectedType?.options
    ? (selectedType?.options.length > 0 ? "Add another " : "Create a ") +
      (fieldTitle || "field")
    : "";

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <div className="space-y-2">
        <Header
          fieldTitle={fieldTitle}
          number={number}
          edit={edit}
          compulsory={compulsory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          formTitle={title}
          setTitle={setTitle}
          titleError={titleError}
          isForm
        />
        {edit ? (
          <Textarea
            rows={2}
            placeholder={`Enter ${title} description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            helperText={<>{descError}</>}
            color={descError && "failure"}
            className={cn("resize-none px-2 py-1", {
              "focus:outline-none": descError,
            })}
            disabled={!edit}
          />
        ) : (
          <p className="text-sm text-foreground-5">{description}</p>
        )}
      </div>
      {fieldsInfo?.map((field, i) => (
        <DynamicField
          key={field.title}
          number={i + 1}
          fieldInfo={field}
          fieldTitle={fieldTitle}
          submitHandler={fieldSubmitHandler}
          isEdit={edit}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={(selectedType?.options?.length ?? 0) + 1}
          fieldInfo={newlyAdded}
          fieldTitle={fieldTitle}
          submitHandler={handleFieldSubmit}
          isEdit={edit}
        />
      )}
      <Footer
        compulsory={compulsory}
        edit={edit}
        setEdit={setEdit}
        setCompulsory={setCompulsory}
        onDoneClick={handleFormSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
        isForm
      />
    </Card>
  );
};

export default EachForm;

interface propType {
  fieldsInfo: FieldType[];
  formInfo: formType;
  number: number;
  fieldTitle?: string;
  fieldSubmitHandler: (values: formFieldType) => void;
  formSubmitHandler: ({
    formId,
    values,
  }: {
    formId: string;
    values: formType;
  }) => void;
  isEdit?: boolean;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Enter title" })
    .min(3, { message: "Must be at least 3 characters" }),
  description: z
    .string({ required_error: "Provide a suitable and precise description" })
    .min(3, { message: "Must be at least 3 characters" }),
  type: z
    .string({ required_error: "Select type" })
    .min(1, { message: "Select type" }),
  compulsory: z.boolean(),
});
export type formType = z.infer<typeof formSchema> & { id?: string };
