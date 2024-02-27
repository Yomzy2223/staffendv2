import { zodResolver } from "@hookform/resolvers/zod";
import { Card, TextInput } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "../constants";
import { cn } from "@/lib/utils";
import Options from "./allFieldTypes/options";
import DocumentTemplate from "./allFieldTypes/documentTemplate";
import { getDynamicFieldSchema, useFormFieldActions } from "./actions";
import { uploadFileToCloudinary } from "@/hooks/globalFunctions";

const DynamicField = ({
  info,
  number,
  fieldTitle,
  submitHandler,
  isEdit,
  loading,
  deleteLoading,
  deleteField,
  isNew,
}: IProps) => {
  const [edit, setEdit] = useState(isNew || false);
  const [type, setType] = useState(info?.type);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);

  const defaultValues = { ...info };

  const formSchema = getDynamicFieldSchema({
    type,
    hasSelectedFile,
  });
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
  async function onSubmit(values: formType) {
    const file = values?.documentTemp;
    if (file) {
      const response = await uploadFileToCloudinary({
        file,
        getProgress: (progress) => {
          setUploadProgress(progress);
        },
      });
      const data = response?.data;
      if (data) {
        const newValues = {
          ...values,
          fileName: data.original_filename,
          fileLink: data.secure_url,
          fileType: data.secure_url.split(".").pop(),
        };
        submitHandler({ values: newValues, setEdit });
      }
      return;
    }
    if (values?.fileName && values?.fileLink && values?.fileType) {
      const newValues = {
        ...values,
        fileName: values.fileName,
        fileLink: values.fileLink,
        fileType: values.fileType,
      };
      submitHandler({ values: newValues, setEdit });
      return;
    }

    submitHandler({ values, setEdit });
  }

  const errorMsg = errors["question"]?.message;

  // useEffect(() => {
  //   if (isEdit === false) setEdit(false);
  // }, [isEdit]);

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
        {(type === "checkbox" ||
          type === "objectives" ||
          type === "dropdown" ||
          type === "multiple choice") &&
          fieldInfo.options && (
            <Options
              info={fieldInfo}
              setValue={setValue}
              edit={edit}
              error={errors["options"]}
              type={type}
            />
          )}
        {type === "document template" && (
          <DocumentTemplate
            info={fieldInfo}
            setValue={setValue}
            error={errors["documentTemp"]}
            edit={edit}
            uploadProgress={uploadProgress}
            loading={loading}
            setHasSelectedFile={setHasSelectedFile}
          />
        )}

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

interface IProps {
  info: FieldType;
  number: number;
  fieldTitle?: string;
  submitHandler: ({
    values,
    setEdit,
  }: {
    values: { [x: string]: any };
    setEdit: Dispatch<SetStateAction<boolean>>;
  }) => void;
  isEdit?: boolean;
  loading: boolean;
  deleteLoading?: boolean;
  deleteField: () => void;
  isNew?: boolean;
}
