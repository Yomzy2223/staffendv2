import { AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "./constants";
import { ISubForm } from "@/hooks/api/types";

export interface IFieldSubmitHandlerArg {
  number?: number;
  formId?: string;
  fieldId?: string;
  values: { [x: string]: any };
  onSuccess?: (data: AxiosResponse<any, any>) => void;
  setNewlyAdded?: Dispatch<SetStateAction<FieldType | undefined>>;
}

export interface IFormSubmitHandlerArg {
  formId?: string;
  values: FormType;
  onSuccess?: (data: AxiosResponse<any, any>) => void;
}

export interface FieldType extends ISubForm {
  icon?: LucideIcon;
}

export interface IDependsOn {
  field: string;
  options: string[];
  question: string;
}
