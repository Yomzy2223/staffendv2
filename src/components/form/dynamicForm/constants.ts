import { ReactNode } from "react";
import { ZodType } from "zod";

export interface FormInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
  size?: string;
  labelProp?: Record<string, string | number>;
  textInputProp?: Record<string, string | number>;
  textAreaProp?: Record<string, string | number>;
  selectProp?: Record<string, string | number>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: FormInput[];
  defaultValues?: Record<string, any>;
  formSchema: ZodType<any, any, any>;
  onFormSubmit: (values: any) => void;
  className?: string;
  formClassName?: string;
}
