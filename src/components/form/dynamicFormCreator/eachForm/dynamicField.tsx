import { zodResolver } from "@hookform/resolvers/zod";
import { Card, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "./constants";
import { cn } from "@/lib/utils";
import { getDynamicFormSchema, useFormFieldActions } from "./actions";
import Checkbox from "./allFieldTypes/checkbox";
import DocumentTemplate from "./allFieldTypes/documentTemplate";
import DocumentUpload from "./allFieldTypes/documentUpload";
import Dropdown from "./allFieldTypes/dropdown";
import MultipleChoice from "./allFieldTypes/multipleChoice";

const DynamicField = ({
  fieldInfo,
  number,
  fieldTitle,
  submitHandler,
  isEdit,
}: propType) => {
  const [info, setInfo] = useState<FieldType | undefined>();
  const [edit, setEdit] = useState(isEdit || false);
  const [compulsory, setCompulsory] = useState(fieldInfo.compulsory as boolean);

  const defaultValues = { ...fieldInfo };

  const formSchema = getDynamicFormSchema(info?.type);
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

  const {} = useFormFieldActions({ fieldInfo, setValue });

  // Submit handler
  function onSubmit(values: formType) {
    submitHandler && submitHandler(values);
    setEdit(false);
  }

  const errorMsg = errors["title"]?.message;

  useEffect(() => {
    if (isEdit === false) setEdit(false);
  }, [isEdit]);

  useEffect(() => {
    // if (fieldInfo) setInfo(fieldInfo);
  }, [fieldInfo]);

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px]">
      <Header
        fieldTitle={fieldTitle}
        number={number}
        setValue={setValue}
        edit={edit}
        compulsory={compulsory}
        newlyAdded={info}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn({ "space-y-4": isEdit })}
      >
        <div>
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
        </div>
        {/* Dynamic Types */}
        {fieldInfo.type === "checkbox" && fieldInfo.options && (
          <Checkbox options={fieldInfo.options} />
        )}
        {fieldInfo.type === "document template" && <DocumentTemplate />}
        {fieldInfo.type === "document upload" && <DocumentUpload />}
        {fieldInfo.type === "dropdown" && <Dropdown />}
        {fieldInfo.type === "multiple choice" && <MultipleChoice />}

        {isEdit && (
          <Footer
            compulsory={compulsory}
            edit={edit}
            setEdit={setEdit}
            setCompulsory={setCompulsory}
            setValue={setValue}
            getValues={getValues}
          />
        )}
      </form>
    </Card>
  );
};

export default DynamicField;

interface propType {
  fieldInfo: FieldType;
  number: number;
  fieldTitle?: string;
  submitHandler: (values: { [x: string]: any }) => void;
  isEdit?: boolean;
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
