import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { FieldType, IDependsOn } from "../types";

export const useFormFieldActions = ({
  fieldInfo,
  setValue,
  setEdit,
  setType,
}: {
  fieldInfo: FieldType;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [compulsory, setCompulsory] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileType, setFileType] = useState("");
  const [dependsOn, setDependsOn] = useState<IDependsOn>({
    field: "",
    options: [],
  });

  const mountInfo = (info: FieldType) => {
    if (info.question) {
      setValue("question", info.question);
    }
    if (info.type) {
      setType(info.type);
      setValue("type", info.type);
    }
    if (info.options) {
      setOptions(info.options);
      setValue("options", info.options);
    }
    if (info.compulsory) {
      setCompulsory(info.compulsory);
      setValue("compulsory", info.compulsory);
    }
    if (info.fileName) {
      setFileName(info.fileName);
      setValue("fileName", info.fileName);
    }
    if (info.fileLink) {
      setFileLink(info.fileLink);
      setValue("fileLink", info.fileLink);
    }
    if (info.fileType) {
      setFileType(info.fileType);
      setValue("fileType", info.fileType);
    }

    // Set depends on
    const dependsOn = info.dependsOn || {
      field: "",
      options: [],
    };
    setDependsOn(dependsOn);
    setValue("dependsOn", dependsOn);
  };

  useEffect(() => {
    if (fieldInfo) mountInfo(fieldInfo);
  }, [fieldInfo]);

  const handleOptionSelect = (selected?: FieldType) => {
    if (!selected) return;
    if (selected.type === fieldInfo.type) {
      mountInfo(fieldInfo);
      return;
    }
    mountInfo(selected);
  };

  const cancelChanges = () => {
    mountInfo(fieldInfo);
    setEdit(false);
  };

  return {
    setType,
    options,
    setOptions,
    fileName,
    fileLink,
    compulsory,
    setCompulsory,
    dependsOn,
    setDependsOn,
    fileType,
    mountInfo,
    cancelChanges,
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
      field: z.string(),
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
        });
  }

  return z.object(schema);
};
