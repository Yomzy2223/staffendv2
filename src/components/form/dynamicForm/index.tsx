"use client";

import {
  Checkbox,
  FileInput,
  Label,
  Radio,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "./constants";
import { cn } from "@/lib/utils";
import InputWithTags from "@/components/inputs/inputWithTags";
import ComboBox from "./comboBox";
import MultiSelectCombo from "./multiSelectCombo";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues = {},
  formSchema,
  onFormSubmit,
  className,
  formClassName,
  disableAll,
  renderOtherFields,
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

  useEffect(() => {
    if (defaultValues) {
      formInfo.map((el) => setValue(el.name, defaultValues[el.name]));
    }
  }, [defaultValues]);

  // Submit handler
  function onSubmit(values: FormType) {
    onFormSubmit && onFormSubmit(values);
  }

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
                  <Label
                    htmlFor={el.name}
                    value={el.label}
                    {...el.labelProp}
                    className={cn("font-normal", el.labelProp?.className)}
                  />
                </div>
              )}

              {isTextInput && (
                <TextInput
                  id={el.name}
                  type={el.type}
                  sizing={el.size || "md"}
                  helperText={<>{errorMsg}</>}
                  color={errors[el.name] && "failure"}
                  disabled={disableAll}
                  {...el.textInputProp}
                  className={cn(
                    { "focus:[&_input]:outline-none": errorMsg },
                    el.textInputProp?.className
                  )}
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
                  disabled={disableAll}
                  {...el.textAreaProp}
                  {...register(el.name)}
                />
              )}

              {el.type === "select" && el.selectOptions && (
                <ComboBox
                  name={el.name}
                  options={el.selectOptions}
                  setValue={setValue}
                  selectProp={el.selectProp}
                  fieldName={el.fieldName}
                  leftContent={el.leftContent}
                  defaultValue={defaultValues[el.name]}
                  disabled={disableAll}
                  optionsLoading={el.optionsLoading}
                />
              )}

              {el.type === "multiSelect" && el.selectOptions && (
                <MultiSelectCombo
                  name={el.name}
                  options={el.selectOptions}
                  setValue={setValue}
                  selectProp={el.selectProp}
                  fieldName={el.fieldName}
                  leftContent={el.leftContent}
                  defaultTags={defaultValues[el.name]}
                  disabled={disableAll}
                  optionsLoading={el.optionsLoading}
                />
              )}

              {el.type === "tagInput" && (
                <InputWithTags
                  errors={el.errors}
                  submitErr={errorMsg}
                  maxTag={el.maxTag}
                  minTagChars={el.minTagChars || 0}
                  handleKeyDown={(tags) => setValue(el.name, tags)}
                  defaultTags={defaultValues[el.name]}
                  disabled={disableAll}
                />
              )}

              {el.type === "checkbox" && (
                <Checkbox
                  id={el.name}
                  defaultChecked
                  disabled={disableAll}
                  {...register(el.name)}
                />
              )}

              {el.type === "radio" && (
                <Radio
                  id={el.name}
                  disabled={disableAll}
                  {...register(el.name)}
                />
              )}

              {el.type === "file" && (
                <FileInput
                  id={el.name}
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  disabled={disableAll}
                  {...register(el.name)}
                />
              )}
            </div>
          );
        })}
        {renderOtherFields && renderOtherFields({ setValue })}
      </div>

      {children}
    </form>
  );
};

export default DynamicForm;
