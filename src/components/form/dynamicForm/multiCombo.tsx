import { cn } from "@/lib/utils";
import { TextInput } from "flowbite-react";
import React, { HTMLAttributes, ReactNode } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import ComboBox from "./comboBox";

const MultiCombo = ({
  name1,
  name2,
  fieldName1,
  fieldName2,
  type1,
  type2,
  size1,
  size2,
  errMsg1,
  errMsg2,
  input1Prop,
  input2Prop,
  select1Prop,
  select2Prop,
  disabled1,
  disabled2,
  setValue,
  register,
  select1Options = [],
  select2Options = [],
  defaultValue1,
  defaultValue2,
  options1Loading,
  options2Loading,
  handleSelect1,
  handleSelect2,
}: IProps) => {
  return (
    <div className="w-full">
      <div className="flex border border-border rounded-md overflow-hidden">
        <div className="w-full">
          {type1 === "select" ? (
            <ComboBox
              name={name1}
              options={select1Options}
              setValue={setValue}
              selectProp={select1Prop}
              handleSelect={handleSelect1}
              fieldName={fieldName1}
              defaultValue={defaultValue1}
              disabled={disabled1}
              optionsLoading={options1Loading}
              isMultiCombo
            />
          ) : (
            register &&
            name1 && (
              <TextInput
                id={name1}
                type={type1}
                sizing={size1 || "md"}
                // helperText={<>{errMsg1}</>}
                color={errMsg1 && "failure"}
                disabled={disabled1}
                {...input1Prop}
                className={cn(
                  "w-full [&_input]:rounded-none [&_input]:flex-1 [&_input]:!border-0 [&_input]:!ring-0",
                  { "focus:[&_input]:outline-none": errMsg1 },
                  input1Prop?.className
                )}
                {...register(name1)}
              />
            )
          )}
        </div>

        <div className=" border-l border-border">
          {type2 === "select" ? (
            <ComboBox
              name={name2}
              options={select2Options}
              setValue={setValue}
              selectProp={select2Prop}
              handleSelect={handleSelect2}
              fieldName={fieldName2}
              defaultValue={defaultValue2}
              disabled={disabled2}
              optionsLoading={options2Loading}
              isMultiCombo
            />
          ) : (
            register &&
            name2 && (
              <TextInput
                id={name2}
                type={type2}
                sizing={size2 || "md"}
                helperText={<>{errMsg2}</>}
                color={errMsg2 && "failure"}
                disabled={disabled2}
                {...input2Prop}
                className={cn(
                  { "focus:[&_input]:outline-none": errMsg2 },
                  input2Prop?.className
                )}
                {...register(name2)}
              />
            )
          )}
        </div>
      </div>
      <p className="text-sm text-destructive-foreground mt-1">{errMsg1}</p>
      <p className="text-sm text-destructive-foreground mt-1">{errMsg2}</p>
    </div>
  );
};

export default MultiCombo;

interface IProps {
  name1?: string;
  name2?: string;
  fieldName1?: string;
  fieldName2?: string;
  type1: string;
  type2: string;
  size1?: number;
  size2?: number;
  errMsg1?: string;
  errMsg2?: string;
  input1Prop?: HTMLAttributes<HTMLInputElement>;
  input2Prop?: HTMLAttributes<HTMLInputElement>;
  select1Prop?: HTMLAttributes<HTMLButtonElement>;
  select2Prop?: HTMLAttributes<HTMLButtonElement>;
  disabled1?: boolean;
  disabled2?: boolean;
  setValue?: UseFormSetValue<{ [x: string]: any }>;
  register?: UseFormRegister<{ [x: string]: any }>;
  select1Options?: any[];
  select2Options?: any[];
  defaultValue1?: string;
  defaultValue2?: string;
  options1Loading?: boolean;
  options2Loading?: boolean;
  handleSelect1?: (selected?: string) => void;
  handleSelect2?: (selected?: string) => void;
}
