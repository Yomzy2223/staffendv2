import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "./constants";
import DynamicField, { formFieldType } from "./dynamicField";
import { PlusCircle } from "lucide-react";
import FieldTypePopUp from "./fieldTypePopUp";

const EachForm = ({ info, number, title, submitHandler, isEdit }: propType) => {
  const [selectedType, setSelectedType] = useState<FieldType | undefined>({
    ...info,
  });
  const [edit, setEdit] = useState(isEdit || false);
  const [checked, setChecked] = useState(info.compulsory as boolean);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();

  const onFormSubmit = async (values: formFieldType) => {
    await submitHandler(values);
    setNewlyAdded(undefined);
  };
  const btnText = info?.options
    ? (info?.options.length > 0 ? "Add another " : "Create a ") +
      (title || "field")
    : "";

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
      <Header
        title={title}
        number={number}
        edit={edit}
        checked={checked}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isForm
      />
      {/* <TextInput
          id="title"
          type="text"
          sizing="md"
          placeholder="Enter field title"
          helperText={<>{errorMsg}</>}
          color={errors["title"] && "failure"}
          className={errorMsg ? "focus:[&_input]:outline-none" : ""}
          disabled={!edit}
          {...register("title")}
        /> */}
      {info.options?.map((field, i) => (
        <DynamicField
          key={field.title}
          number={i + 1}
          info={field}
          title={title}
          submitHandler={submitHandler}
          isEdit={edit}
        />
      ))}
      {newlyAdded && (
        <DynamicField
          number={(info.options?.length ?? 0) + 1}
          info={newlyAdded}
          title={title}
          submitHandler={onFormSubmit}
          isEdit={edit}
        />
      )}
      <Footer
        checked={checked}
        edit={edit}
        setEdit={setEdit}
        setChecked={setChecked}
        onDoneClick={() => setEdit(false)}
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
  title?: string;
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
