import { AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "./constants";

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

export interface FieldType {
  id?: string;
  type: string;
  question?: string;
  icon?: LucideIcon;
  compulsory?: boolean;
  options?: string[];
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  dependsOn?: IDependsOn;
  allowOther?: boolean;
  documentType?: string;
}

export interface IDependsOn {
  field: string;
  options: string[];
  question: string;
}
