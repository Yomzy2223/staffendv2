import { zodResolver } from "@hookform/resolvers/zod";
import { Card, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "../constants";
import { cn } from "@/lib/utils";
import Checkbox from "./allFieldTypes/checkbox";
import DocumentTemplate from "./allFieldTypes/documentTemplate";
import DocumentUpload from "./allFieldTypes/documentUpload";
import Dropdown from "./allFieldTypes/dropdown";
import MultipleChoice from "./allFieldTypes/multipleChoice";
import { getDynamicFieldSchema, useFormFieldActions } from "./actions";

const DynamicField = ({
  info,
  number,
  fieldTitle,
  submitHandler,
  isEdit,
  loading,
  success,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);

  const defaultValues = { ...info };

  const formSchema = getDynamicFieldSchema(info?.type);
  type formType = z.infer<typeof formSchema>;

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const fieldInfo = useFormFieldActions({ fieldInfo: info, setValue, setEdit });

  // Submit handler
  function onSubmit(values: formType) {
    submitHandler(values);
    // setEdit(false);
  }

  const errorMsg = errors["question"]?.message;

  useEffect(() => {
    if (isEdit === false) setEdit(false);
    // if (success) setEdit(false);
  }, [isEdit, success]);

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px]">
      <Header
        fieldTitle={fieldTitle}
        number={number}
        edit={edit}
        info={fieldInfo}
        loading={loading}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn({ "space-y-4": isEdit })}
      >
        <div>
          <TextInput
            id="question"
            type="text"
            sizing="md"
            placeholder="Enter field title (field name, question, etc.)"
            helperText={<>{errorMsg}</>}
            color={errors["title"] && "failure"}
            className={errorMsg ? "focus:[&_input]:outline-none" : ""}
            disabled={!edit}
            {...register("question")}
          />
        </div>
        {/* Dynamic Types */}
        {fieldInfo.type === "checkbox" && fieldInfo.options && (
          <Checkbox
            info={fieldInfo}
            setValue={setValue}
            edit={edit}
            error={errors["options"]}
          />
        )}
        {fieldInfo.type === "document template" && <DocumentTemplate />}
        {fieldInfo.type === "document upload" && <DocumentUpload />}
        {fieldInfo.type === "dropdown" && <Dropdown />}
        {fieldInfo.type === "multiple choice" && <MultipleChoice />}

        {isEdit && (
          <Footer
            edit={edit}
            setEdit={setEdit}
            getValues={getValues}
            setValue={setValue}
            info={fieldInfo}
            loading={loading}
          />
        )}
      </form>
    </Card>
  );
};

export default DynamicField;

interface propType {
  info: FieldType;
  number: number;
  fieldTitle?: string;
  submitHandler: (values: { [x: string]: any }) => void;
  isEdit?: boolean;
  loading: boolean;
  success: boolean;
}

// const formSchema = z.object({
//   title: z
//     .string({ required_error: "Enter field title" })
//     .min(3, { message: "Must be at least 3 characters" }),
//   type: z
//     .string({ required_error: "Select type" })
//     .min(1, { message: "Select type" }),
//   compulsory: z.boolean(),
// });

// const formSchema = getDynamicFormSchema()

// export type formFieldType = z.infer<typeof formSchema>;
