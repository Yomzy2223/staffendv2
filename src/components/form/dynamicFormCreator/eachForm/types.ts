import { TSubFormCreate, TSubFormGet } from "@/services";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "./constants";

export interface IFieldSubmitHandlerArg {
  number?: number;
  formId?: string;
  fieldId?: string;
  values: { [x: string]: any };
  onSuccess?: (data: AxiosResponse<any, any>) => void;
  setNewlyAdded?: Dispatch<SetStateAction<TSubFormGet | undefined>>;
}

export interface IFormSubmitHandlerArg {
  formId?: string;
  values: FormType;
  onSuccess?: (data: AxiosResponse<any, any>) => void;
}

// export interface FieldType extends TSubFormGet {
//   icon?: LucideIcon;
// }
