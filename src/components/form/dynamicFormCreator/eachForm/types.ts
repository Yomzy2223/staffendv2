import { IServiceForm } from "@/hooks/api/types";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "./constants";

export interface IFieldSubmitHandlerArg {
  number?: number;
  formId?: string;
  formValues: IServiceForm;
  fieldId?: string;
  values: { [x: string]: any };
  setEdit: Dispatch<SetStateAction<boolean>>;
  setNewlyAdded?: Dispatch<SetStateAction<FieldType | undefined>>;
  setNewlyAddedForm?: Dispatch<SetStateAction<FormType | undefined>>;
}

export interface IFormSubmitHandlerArg {
  formId?: string;
  values: FormType;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setNewlyAdded?: Dispatch<SetStateAction<FieldType | undefined>>;
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
}

export interface IDependsOn {
  field: string;
  options: string[];
}
