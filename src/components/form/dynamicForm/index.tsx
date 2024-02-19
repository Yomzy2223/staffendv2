"use client";

import {
  Checkbox,
  FileInput,
  Label,
  Radio,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "./constants";
import { cn } from "@/lib/utils";
import InputWithTags from "@/components/inputs/inputWithTags";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues = {},
  formSchema,
  onFormSubmit,
  className,
  formClassName,
}: DynamicFormProps) => {
  type FormType = z.infer<typeof formSchema>;

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Submit handler
  function onSubmit(values: FormType) {
    onFormSubmit && onFormSubmit(values);
  }

  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex flex-col gap-8 justify-between flex-1",
        formClassName
      )}
    >
      <div className={cn("flex flex-col justify-start gap-8", className)}>
        {formInfo.map((el, i: number) => {
          const isTextInput =
            el.type === "text" ||
            el.type === "password" ||
            el.type === "email" ||
            el.type === "number";
          const errorMsg = errors[el.name]?.message;

          return (
            <div key={i}>
              {el.label && (
                <div className="mb-2 block">
                  <Label htmlFor={el.name} value={el.label} {...el.labelProp} />
                </div>
              )}

              {isTextInput && (
                <TextInput
                  id={el.name}
                  type={el.type}
                  sizing={el.size || "md"}
                  helperText={<>{errorMsg}</>}
                  color={errors[el.name] && "failure"}
                  className={errorMsg ? "focus:[&_input]:outline-none" : ""}
                  {...el.textInputProp}
                  {...register(el.name)}
                />
              )}

              {el.type === "textarea" && (
                <Textarea
                  id={el.name}
                  rows={7}
                  helperText={<>{errorMsg}</>}
                  color={errors[el.name] && "failure"}
                  className={cn("p-2.5 resize-none", {
                    "focus:outline-none": errorMsg,
                  })}
                  {...el.textAreaProp}
                  {...register(el.name)}
                />
              )}

              {el.type === "select" && el.selectOptions && (
                <Select
                  id={el.name}
                  helperText={<>{errorMsg}</>}
                  color={errors[el.name] && "failure"}
                  {...el.selectProp}
                  {...register(el.name)}
                >
                  {el.selectOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Select>
              )}

              {el.type === "tagInput" && (
                <InputWithTags
                  errors={el.errors}
                  submitErr={errorMsg}
                  maxTag={el.maxTag}
                  minTagChars={el.minTagChars || 0}
                  handleKeyDown={(tags) => setValue(el.name, tags)}
                />
              )}

              {el.type === "checkbox" && (
                <Checkbox id={el.name} defaultChecked {...register(el.name)} />
              )}

              {el.type === "radio" && (
                <Radio id={el.name} {...register(el.name)} />
              )}

              {el.type === "file" && (
                <FileInput
                  id={el.name}
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  {...register(el.name)}
                />
              )}
            </div>
          );
        })}
      </div>

      {children}
    </form>
  );
};

export default DynamicForm;

//  {
//    el.type === "toggle" && (
//      <ToggleSwitch
//        checked={getValues()[el.name]}
//        label="Toggle me (checked)"
//        // {...register(el.name)}
//        onChange={() => setValue(el.name, !getValues()[el.name])}
//      />
//    );
//  }
