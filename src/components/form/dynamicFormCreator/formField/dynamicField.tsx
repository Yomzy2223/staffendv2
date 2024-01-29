import { zodResolver } from "@hookform/resolvers/zod";
import { Card, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionHeader from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType, fieldTypes } from "./constants";

const DynamicField = ({
  info,
  number,
  title,
  submitHandler,
  isNew,
}: propType) => {
  const [selectedType, setSelectedType] = useState<FieldType | undefined>({
    ...info,
  });
  const [edit, setEdit] = useState(isNew || false);
  const [checked, setChecked] = useState(info.compulsory as boolean);

  const defaultValues = { ...info };

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<formFieldType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Submit handler
  function onSubmit(values: formFieldType) {
    submitHandler && submitHandler(values);
    setEdit(false);
  }

  const errorMsg = errors["title"]?.message;

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px]">
      <QuestionHeader
        title={title}
        number={number}
        setValue={setValue}
        error={errors.type}
        edit={edit}
        checked={checked}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          id="title"
          type="text"
          sizing="md"
          placeholder="Enter field title"
          helperText={<>{errorMsg}</>}
          color={errors["title"] && "failure"}
          className={errorMsg ? "focus:[&_input]:outline-none" : ""}
          disabled={!edit}
          {...register("title")}
        />
        {/* Dynamic Types */}

        <Footer
          checked={checked}
          edit={edit}
          setEdit={setEdit}
          setChecked={setChecked}
          setValue={setValue}
          getValues={getValues}
        />
      </form>
    </Card>
  );
};

export default DynamicField;

interface propType {
  info: FieldType;
  number: number;
  title?: string;
  submitHandler: (values: formFieldType) => void;
  isNew?: boolean;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Enter field / field title" })
    .min(3, { message: "Must be at least 3 characters" }),
  type: z
    .string({ required_error: "Select type" })
    .min(1, { message: "Select type" }),
  compulsory: z.boolean(),
});
export type formFieldType = z.infer<typeof formSchema>;
