import { ReactNode } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ZodType } from "zod";

export interface IDynamicFormField {
  id?: string;
  name: string;
  label?: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "multiSelect"
    | "tagInput"
    | "checkbox"
    | "radio"
    | "file";
  size?: string;
  labelProp?: Record<string, string | number>;
  textInputProp?: Record<any, any>;
  textAreaProp?: Record<string, string | number>;
  selectProp?: Record<any, any>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
  leftContent?: string | ReactNode;
  errors?: {
    empty: string;
    length?: string;
    exists: string;
    minTagChars: string;
  };
  maxTag?: number;
  minTagChars?: number;
  fieldName?: string;
  optionsLoading?: boolean;
  optionsErrorMsg?: string;
  handleSelect?: (selected?: string) => void;
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: IDynamicFormField[];
  defaultValues?: Record<string, any>;
  formSchema: ZodType<any, any, any>;
  onFormSubmit: (values: any) => void;
  className?: string;
  formClassName?: string;
  disableAll?: boolean;
  renderOtherFields?: ({
    setValue,
  }: {
    setValue: UseFormSetValue<any>;
  }) => ReactNode;
}
