import { zodResolver } from "@hookform/resolvers/zod";
import { Card, TextInput } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { cn } from "@/lib/utils";
import Options from "./allFieldTypes/options";
import DocumentTemplate from "./allFieldTypes/documentTemplate";
import { getDynamicFieldSchema, useFormFieldActions } from "./actions";
import { uploadFileToCloudinary } from "@/hooks/globalFunctions";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import { useSession } from "next-auth/react";
import { TSubFormCreate, TSubFormGet } from "@/services";

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
  fieldsInfo,
  fieldsEditState,
  setFieldsEditState,
}: IProps) => {
  const [edit, setEdit] = useState(isNew || false);
  const [type, setType] = useState(info?.type);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);

  const session = useSession();

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
    number,
    fieldInfo: info,
    setValue,
    edit,
    setEdit,
    setType,
    fieldsEditState,
    setFieldsEditState,
    isNew,
    deleteField,
  });

  // Submit handler
  async function onSubmit(values: formType) {
    const file = values?.documentTemp;
    // if a file was uploaded, upload file to cloudinary amd save link to our db
    if (file) {
      const response = await uploadFileToCloudinary({
        file,
        getProgress: (progress) => {
          setUploadProgress(progress);
        },
        folderName: session.data?.user?.fullName + "-" + session.data?.user?.id,
      });
      const data = response?.data;
      if (data) {
        const newValues = {
          ...values,
          fileName: data.original_filename,
          fileLink: data.secure_url,
          fileType: data.secure_url.split(".").pop(),
          fileSize: (data.bytes / 1000).toString(),
        };
        submitHandler({ values: newValues, setEdit });
      }
      return;
    }

    submitHandler({ values, setEdit });
  }

  const errorMsg = errors["question"]?.message;
  const isLoading = loading || (uploadProgress > 0 && uploadProgress < 100);

  const isDoc = type === "document template" || type === "document upload";
  const showOptions =
    type === "checkbox" ||
    type === "objectives" ||
    type === "dropdown" ||
    type === "multiple choice";

  return (
    <Card className="shadow-none [&>div]:p-4 max-w-[500px]">
      <Header
        fieldTitle={fieldTitle}
        number={number}
        edit={edit}
        info={fieldInfo}
        loading={loading}
        type={type}
        fields={fieldsInfo
          ?.map((el, i) => ({
            field: "field " + (i + 1),
            options: el.options || [],
            question: el.question || "",
          }))
          ?.filter((field, i) => i + 1 !== number)}
        setValue={setValue}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn({ "space-y-4": isEdit })}
      >
        <div className="flex">
          <TextInput
            id="question"
            type="text"
            sizing="md"
            placeholder="Enter field title (field name, question, etc.)"
            helperText={<>{errorMsg}</>}
            color={errorMsg && "failure"}
            className={cn("flex-1", {
              "focus:[&_input]:outline-none": errorMsg,
              "[&>input]:!ring-0 !outline-none !ring-0": isDoc,
            })}
            disabled={!edit || isLoading}
            {...register("question")}
          />
          {isDoc && (
            <ComboBox
              name="documentType"
              fieldName="document type"
              options={["NIN", "Proof of address"]}
              setValue={setValue}
              errorMsg={errors["documentType"]?.message as string}
              defaultValue={fieldInfo.documentType}
              disabled={!edit || isLoading}
              optionsLoading={false}
              selectProp={{
                className:
                  "flex-0 w-1/3 [&_div]:whitespace-nowrap text-ellipsis",
              }}
            />
          )}
        </div>

        {/* Dynamic Types */}
        {showOptions && fieldInfo.options && (
          <Options
            info={fieldInfo}
            setValue={setValue}
            edit={edit}
            error={errors["options"]}
            type={type}
          />
        )}
        <div>
          {type === "document template" && (
            <DocumentTemplate
              info={fieldInfo}
              setValue={setValue}
              error={errors["documentTemp"]}
              edit={edit}
              uploadProgress={uploadProgress}
              loading={isLoading}
              setHasSelectedFile={setHasSelectedFile}
            />
          )}
        </div>

        {isEdit && (
          <Footer
            edit={edit}
            setEdit={setEdit}
            getValues={getValues}
            setValue={setValue}
            info={fieldInfo}
            loading={isLoading}
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
  info: TSubFormGet;
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
  fieldsInfo?: TSubFormCreate[];
  fieldsEditState: { number: number; edit: boolean }[];
  setFieldsEditState: Dispatch<
    SetStateAction<{ number: number; edit: boolean }[]>
  >;
}
