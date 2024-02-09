import { useEffect, useState } from "react";
import { FormType } from "./constants";

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
      setType(formInfo.type);
      setDescription(formInfo.description);
      setCompulsory(formInfo.compulsory);
    }
  }, [formInfo]);

  const mountInfo = (info: FormType) => {
    if (!info) return;
    if (info.type) setType(info.type);
    if (info.title) setTitle(info.title);
    if (info.description) setDescription(info.description);
    if (info.compulsory) setCompulsory(info.compulsory);
  };

  const handleOptionSelect = (selected?: FormType | any) => {
    if (!selected) return;
    if (selected.type === formInfo?.type) {
      mountInfo(formInfo);
      return;
    }
    console.log("Change type", selected);
    mountInfo(selected);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    type,
    setType,
    compulsory,
    setCompulsory,
    isSubmitted,
    setIsSubmitted,
    titleError,
    setTitleError,
    descError,
    validateFields,
    handleOptionSelect,
  };
};

export type formReturnType = ReturnType<typeof useFormActions>;
