import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionHeader from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "./constants";
import DynamicField from "./dynamicField";
import { PlusCircle } from "lucide-react";

const FormField = ({ info, number, title, submitHandler, isNew }: propType) => {
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

  if (info.type === "Person")
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
        {info.options?.map((field, i) => (
          <DynamicField
            key={field.title}
            number={i + 1}
            info={field}
            submitHandler={submitHandler}
            isNew={isNew}
            title={title}
          />
        ))}
        <Footer
          checked={checked}
          edit={edit}
          setEdit={setEdit}
          setChecked={setChecked}
          setValue={setValue}
          getValues={getValues}
        >
          <Button color="ghost" size="fit" className="text-foreground-5">
            <PlusCircle size={20} /> Add new {title || "field"}
          </Button>
        </Footer>
      </Card>
    );

  return (
    <DynamicField
      key={info.title}
      number={number}
      info={info}
      submitHandler={submitHandler}
      title={title}
    />
  );
};

export default FormField;

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
