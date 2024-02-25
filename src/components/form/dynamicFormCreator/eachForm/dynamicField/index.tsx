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
  deleteLoading,
  success,
  deleteField,
}: propType) => {
  const [edit, setEdit] = useState(isEdit || false);
  const [type, setType] = useState(info?.type);

  const defaultValues = { ...info };

  const formSchema = getDynamicFieldSchema(type);
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

  const fieldInfo = useFormFieldActions({
    fieldInfo: info,
    setValue,
    setEdit,
    setType,
  });

  // Submit handler
  function onSubmit(values: formType) {
    submitHandler(values);
  }

  const errorMsg = errors["question"]?.message;

  useEffect(() => {
    if (isEdit === false) setEdit(false);
    if (success) setEdit(false);
  }, [isEdit, success]);

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px]">
      <Header
        fieldTitle={fieldTitle}
        number={number}
        edit={edit}
        info={fieldInfo}
        loading={loading}
        type={type}
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
        {(type === "checkbox" || type === "objectives") &&
          fieldInfo.options && (
            <Checkbox
              info={fieldInfo}
              setValue={setValue}
              edit={edit}
              error={errors["options"]}
              type={type}
            />
          )}
        {type === "document template" && <DocumentTemplate />}
        {type === "document upload" && <DocumentUpload />}
        {type === "dropdown" && <Dropdown />}
        {type === "multiple choice" && <MultipleChoice />}

        {isEdit && (
          <Footer
            edit={edit}
            setEdit={setEdit}
            getValues={getValues}
            setValue={setValue}
            info={fieldInfo}
            loading={loading}
            deleteField={deleteField}
            deleteLoading={deleteLoading}
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
  deleteLoading: boolean;
  success: boolean;
  deleteField: () => void;
}
