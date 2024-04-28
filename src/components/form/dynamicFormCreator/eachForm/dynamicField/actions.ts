import { TDependsOn, TSubFormGet } from "@/services";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { boolean, z } from "zod";
import { useFormActions } from "../actions";

export const useFormFieldActions = ({
  number,
  fieldInfo,
  setValue,
  edit,
  setEdit,
  setType,
  fieldsEditState,
  setFieldsEditState,
  isNew,
  deleteField,
}: {
  number: number;
  fieldInfo: TSubFormGet;
  edit: boolean;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>;
  fieldsEditState: { number: number; edit: boolean }[];
  setFieldsEditState: Dispatch<
    SetStateAction<{ number: number; edit: boolean }[]>
  >;
  isNew?: boolean;
  deleteField: Function;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [compulsory, setCompulsory] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [allowOther, setAllowOther] = useState<boolean>(false);
  const [documentType, setDocumentType] = useState<string>();
  const [dependsOn, setDependsOn] = useState<TDependsOn>({
    field: "",
    options: [],
    question: "",
  });

  const mountInfo = (info: TSubFormGet) => {
    // Set question
    const question = info.question || "";
    setValue("question", question, { shouldValidate: true });

    // Set type
    const type = info.type || "";
    setType(type);
    setValue("type", type, { shouldValidate: true });

    // Set options
    const options = info.options || [];
    setOptions(options);
    setValue("options", options, { shouldValidate: true });

    // Set compulsory
    const compulsory = info.compulsory || false;
    setCompulsory(compulsory);
    setValue("compulsory", compulsory, { shouldValidate: true });

    // Set file name
    const fileName = info.fileName || "";
    setFileName(fileName);
    setValue("fileName", fileName, { shouldValidate: true });

    // Set file link
    const fileLink = info.fileLink || "";
    setFileLink(fileLink);
    setValue("fileLink", fileLink, { shouldValidate: true });

    // Set file type
    const fileType = info.fileType || "";
    setFileType(fileType);
    setValue("fileType", fileType, { shouldValidate: true });

    // Set file size
    const fileSize = info.fileSize || "";
    setFileSize(fileSize);
    setValue("fileSize", fileSize, { shouldValidate: true });

    // Set depends on
    const dependsOn = info.dependsOn || {
      field: "",
      options: [],
      question: "",
    };
    setDependsOn(dependsOn);
    setValue("dependsOn", dependsOn, { shouldValidate: true });

    // Set allow other
    const allowOther = info.allowOther || false;
    setAllowOther(allowOther);
    setValue("allowOther", allowOther, { shouldValidate: true });

    // Set document type
    const documentType = info.documentType || "";
    setDocumentType(documentType);
    setValue("documentType", documentType, { shouldValidate: true });
  };

  useEffect(() => {
    if (fieldInfo) mountInfo(fieldInfo);
  }, [fieldInfo]);

  // Update the edit state of each field in the form action
  useEffect(() => {
    const exists = fieldsEditState.find((el) => el.number === number);
    if (exists) {
      const newEditState = fieldsEditState.map((el) =>
        el.number === number ? { number, edit } : el
      );
      setFieldsEditState(newEditState);
    } else {
      setFieldsEditState([...fieldsEditState, { number, edit }]);
    }
  }, [edit]);

  const handleOptionSelect = (selected?: TSubFormGet) => {
    if (!selected) return;
    if (selected.type === fieldInfo.type) {
      mountInfo(fieldInfo);
      return;
    }
    mountInfo(selected);
  };

  const cancelChanges = () => {
    isNew ? deleteField() : mountInfo(fieldInfo);
    setEdit(false);
  };

  const cancelDependsChanges = () => {
    const depends = dependsOn || fieldInfo.dependsOn;
    setDependsOn(depends);
    setValue("dependsOn", depends);
  };

  return {
    setType,
    options,
    setOptions,
    fileName,
    fileLink,
    fileSize,
    compulsory,
    setCompulsory,
    dependsOn,
    setDependsOn,
    allowOther,
    setAllowOther,
    documentType,
    fileType,
    mountInfo,
    cancelChanges,
    cancelDependsChanges,
    handleOptionSelect,
  };
};
export type fieldReturnType = ReturnType<typeof useFormFieldActions>;

export const getDynamicFieldSchema = ({
  type,
  hasSelectedFile,
}: {
  type?: string;
  hasSelectedFile: boolean;
}) => {
  let schema: any = {
    question: z
      .string({ required_error: "Enter field / field title" })
      .min(3, { message: "Must be at least 3 characters" }),
    type: z
      .string({ required_error: "Select type" })
      .min(1, { message: "Select type" }),
    compulsory: z.boolean(),
    dependsOn: z.object({
      field: z.string().nullable(),
      options: z.string().array(),
    }),
  };

  if (type === "checkbox" || type === "objectives") {
    schema = {
      ...schema,
      options: z
        .string({ required_error: "Option cannot be empty" })
        .array()
        .nonempty({ message: "Enter at least 1 option" })
        .refine(
          (options) => {
            return !options.some((el) => el.trim() === "");
          },
          { message: "Option cannot be empty" }
        ),
      allowOther: z.boolean(),
    };
  }

  if (type === "document template" || type === "document upload") {
    schema = {
      ...schema,
      documentType: z
        .string({ required_error: "Select document type" })
        .min(3, { message: "Select document type" }),
    };
  }

  if (type === "document template") {
    hasSelectedFile
      ? (schema = {
          ...schema,
          documentTemp: z
            .instanceof(File, { message: "Kindly upload a valid file" })
            .refine((file) => file, { message: "Kindly upload a file" })
            .refine((file) => file.size <= 1024 * 1024, {
              message: "File size must be less than 1MB",
            }),
        })
      : (schema = {
          ...schema,
          fileName: z.string(),
          fileLink: z.string(),
          fileType: z.string(),
          fileSize: z.string(),
        });
  }

  return z.object(schema);
};
