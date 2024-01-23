import { ReactNode } from "react";
import { ZodType } from "zod";

export interface FormInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
  textInputProp?: Record<string, any>;
  selectProp?: Record<string, any>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: FormInput[];
  defaultValues?: Record<string, any>;
  formSchema: ZodType<any, any, any>;
  onFormSubmit: (values: any) => void;
}
