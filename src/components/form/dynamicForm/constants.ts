import { ReactNode } from "react";
import { ZodType } from "zod";

export interface FormInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
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
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: FormInput[];
  defaultValues?: Record<string, any>;
  formSchema: ZodType<any, any, any>;
  onFormSubmit: (values: any) => void;
  className?: string;
  formClassName?: string;
  disableAll?: boolean;
}
