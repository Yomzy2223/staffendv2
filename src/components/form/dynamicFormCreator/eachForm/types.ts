import { IServiceForm } from "@/hooks/api/types";
import { Dispatch, SetStateAction } from "react";
import { FieldType, FormType } from "./constants";

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
