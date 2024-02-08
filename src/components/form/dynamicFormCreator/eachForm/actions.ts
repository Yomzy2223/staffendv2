import { useEffect, useState } from "react";
import { FormType } from "./constants";

export const useFormActions = (formInfo?: FormType) => {
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
  };
};

export type formReturnType = ReturnType<typeof useFormActions>;
