import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "./constants";
import { TSubFormCreate } from "@/services/service/types";

export interface IFieldSubmitHandlerArg {
  number?: number;
  formId?: string;
  fieldId?: string;
  values: { [x: string]: any };
  onSuccess?: (data: AxiosResponse<any, any>) => void;
  setNewlyAdded?: Dispatch<SetStateAction<TSubFormCreate | undefined>>;
}

export interface IFormSubmitHandlerArg {
  formId?: string;
  values: FormType;
  onSuccess?: (data: AxiosResponse<any, any>) => void;
}

// export interface FieldType extends TSubFormGet {
//   icon?: LucideIcon;
// }

export interface IDependsOn {
  field: string;
  options: string[];
  question: string;
}
