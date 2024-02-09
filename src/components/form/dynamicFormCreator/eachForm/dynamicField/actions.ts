import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FieldType } from "../constants";
import { z } from "zod";

export const useFormFieldActions = ({
  fieldInfo,
  setValue,
  setEdit,
}: {
  fieldInfo: FieldType;
  setValue: UseFormSetValue<{ [x: string]: any }>;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [type, setType] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [compulsory, setCompulsory] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileType, setFileType] = useState("");

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
    if (info.fileDescription) {
      setFileDescription(info.fileDescription);
      setValue("fileDescription", info.fileDescription);
    }
    if (info.fileLink) {
      setFileLink(info.fileLink);
      setValue("fileLink", info.fileLink);
    }
    if (info.fileType) {
      setFileType(info.fileType);
      setValue("fileType", info.fileType);
    }
  };

  useEffect(() => {
    mountInfo(fieldInfo);
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
    type,
    setType,
    options,
    setOptions,
    fileName,
    fileDescription,
    fileLink,
    compulsory,
    setCompulsory,
    fileType,
    mountInfo,
    cancelChanges,
    handleOptionSelect,
  };
};
export type fieldReturnType = ReturnType<typeof useFormFieldActions>;

export const getDynamicFieldSchema = (type?: string) => {
  let schema: any = {
    question: z
      .string({ required_error: "Enter field / field title" })
      .min(3, { message: "Must be at least 3 characters" }),
    type: z
      .string({ required_error: "Select type" })
      .min(1, { message: "Select type" }),
    compulsory: z.boolean(),
  };

  if (type === "checkbox") {
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

  return z.object(schema);
};
