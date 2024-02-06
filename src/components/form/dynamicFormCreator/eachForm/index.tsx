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
  info,
  number,
  fieldTitle,
  submitHandler,
  isEdit,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [checked, setChecked] = useState(info.compulsory as boolean);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();
  const [selectedType, setSelectedType] = useState<FieldType | undefined>({
    ...info,
  });

  const {
    title,
    setTitle,
    description,
    setDescription,
    setIsSubmitted,
    titleError,
    descError,
    validateFields,
  } = useFormActions();

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (validateFields()) setEdit(false);
  };

  const onFieldSubmit = async (values: formFieldType) => {
    await submitHandler(values);
    setNewlyAdded(undefined);
  };

  const btnText = info?.options
    ? (info?.options.length > 0 ? "Add another " : "Create a ") +
      (fieldTitle || "field")
    : "";

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <div className="space-y-2">
        <Header
          fieldTitle={fieldTitle}
          number={number}
          edit={edit}
          checked={checked}
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
      {info.options?.map((field, i) => (
        <DynamicField
          key={field.title}
          number={i + 1}
          info={field}
          fieldTitle={fieldTitle}
          submitHandler={submitHandler}
          isEdit={edit}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={(info.options?.length ?? 0) + 1}
          info={newlyAdded}
          fieldTitle={fieldTitle}
          submitHandler={onFieldSubmit}
          isEdit={edit}
        />
      )}
      <Footer
        checked={checked}
        edit={edit}
        setEdit={setEdit}
        setChecked={setChecked}
        onDoneClick={handleSubmit}
        setNewlyAdded={setNewlyAdded}
        btnText={btnText}
        isForm
      />
    </Card>
  );
};

export default EachForm;

interface propType {
  info: FieldType;
  number: number;
  fieldTitle?: string;
  submitHandler: (values: formFieldType) => void;
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
export type formType = z.infer<typeof formSchema>;
