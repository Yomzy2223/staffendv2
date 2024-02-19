import { Button, TextInput } from "flowbite-react";
import React, {
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import TagIcon from "@/assets/icons/tagIcon";
import { getRandColor } from "./actions";
import { X } from "lucide-react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const InputWithTags = ({
  size,
  textInputProp,
  minTagChars,
  maxTag,
  errors,
  submitErr,
  handleKeyDown,
  defaultTags,
}: propsType) => {
  const [tags, setTags] = useState<string[]>(defaultTags || []);
  const [errorMsg, setErrorMsg] = useState("");
  const [value, setValue] = useState("");

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (validateTags(value)) {
        setTags([...tags, value]);
        setValue("");
        handleKeyDown([...tags, value]);
      }
    }
  };

  const validateTags = (value: string) => {
    if (maxTag && tags.length >= maxTag) {
      setErrorMsg(errors?.length || `Tags cannot be more than ${maxTag}`);
      return;
    }
    if (normalize(value) === "") {
      setErrorMsg(errors?.empty || "Enter tag");
      return;
    }
    if (value.length < minTagChars) {
      setErrorMsg(
        errors?.minTagChars ||
          `Tags cannot be less than ${minTagChars} characters`
      );
      return;
    }
    if (tags.some((tag) => normalize(tag) === normalize(value))) {
      setErrorMsg(errors?.exists || "Tag already exists");
      return;
    }
    setErrorMsg("");
    return true;
  };

  const normalize = (text: string) => text.trim().toLowerCase();

  const removeTag = (tag: string) => {
    const newTags = [...tags].filter((el) => el !== tag);
    handleKeyDown(newTags);
    setTags(newTags);
  };

  useEffect(() => {
    if (submitErr) setErrorMsg(submitErr.toString());
  }, [submitErr]);

  return (
    <div>
      <TextInput
        type="text"
        sizing={size || "md"}
        helperText={<>{errorMsg}</>}
        color={errorMsg && "failure"}
        className={errorMsg ? "focus:[&_input]:outline-none" : ""}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => {
          errorMsg && validateTags(e.target.value);
          setValue(e.target.value);
        }}
        {...textInputProp}
      />
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag: string, i) => {
          const color = getRandColor(i);

          return (
            <div
              key={tag}
              className={`${color.bg} flex items-center gap-1 text-xs font-normal pl-2.5 pr-1.5 py-0.5 rounded-md`}
            >
              <TagIcon fill={color.text} />
              {tag}
              <Button size="fit" color="ghost" onClick={() => removeTag(tag)}>
                <X size={12} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputWithTags;

interface propsType {
  size?: string;
  textInputProp?: HTMLAttributes<HTMLInputElement>;
  maxTag?: number;
  minTagChars: number;
  handleKeyDown: (tags: string[]) => void;
  errors?: {
    empty?: string;
    length?: string;
    exists?: string;
    minTagChars?: string;
  };
  submitErr?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  defaultTags?: string[];
}
