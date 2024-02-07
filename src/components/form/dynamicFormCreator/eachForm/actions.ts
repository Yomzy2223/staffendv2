import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FieldType, FormType } from "./constants";

export const useFormActions = (formInfo: FormType) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [compulsory, setCompulsory] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateFields = () => {
    if (title.length === 0) setTitleError("Enter title");
    else if (title.length < 3 && title.length > 0)
      setTitleError("Title must be at least 3 characters");
    else if (title.length > 2) setTitleError("");
    if (description.length === 0) setDescError("Enter description");
    else if (description.length < 15 && description.length > 0)
      setDescError("Description must be at least 15 characters");
    else if (description.length > 14) setDescError("");
    if (title.length > 2 && description.length > 14) return true;
  };

  useEffect(() => {
    if (isSubmitted) {
      validateFields();
    }
  }, [isSubmitted, title, description]);

  useEffect(() => {
    if (formInfo) {
      setTitle(formInfo.title);
      setDescription(formInfo.description);
      setCompulsory(formInfo.compulsory);
    }
  }, [formInfo]);

  return {
    title,
    setTitle,
    description,
    type,
    setType,
    compulsory,
    setCompulsory,
    setDescription,
    isSubmitted,
    setIsSubmitted,
    titleError,
    descError,
    validateFields,
  };
};

export const useFormFieldActions = ({
  fieldInfo,
  setValue,
}: {
  fieldInfo: FieldType;
  setValue: UseFormSetValue<{
    type: string;
    title: string;
    compulsory: boolean;
  }>;
}) => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState<string[]>();
  const [compulsory, setCompulsory] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    if (fieldInfo.title) setQuestion(fieldInfo.title);
    if (fieldInfo.type) setType(fieldInfo.type);
    if (fieldInfo.options) setOptions(fieldInfo.options);
    if (fieldInfo.compulsory) setCompulsory(fieldInfo.compulsory);
    if (fieldInfo.fileName) setFileName(fieldInfo.fileName);
    if (fieldInfo.fileDescription)
      setFileDescription(fieldInfo.fileDescription);
    if (fieldInfo.fileLink) setFileLink(fieldInfo.fileLink);
    if (fieldInfo.fileType) setFileType(fieldInfo.fileType);
  }, [fieldInfo]);

  return {
    question,
    type,
    options,
    fileName,
    fileDescription,
    fileLink,
    compulsory,
    fileType,
  };
};
