import { IDependsOn } from "@/components/form/dynamicFormCreator/eachForm/types";

export type TFormCreate = {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
};

export type TFormGet = TFormCreate & {
  id: string;
};

export type TSubFormCreate = {
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  allowOther?: boolean;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
  documentType?: string; //to be removed
  dependsOn?: IDependsOn;
};

export type TSubFormGet = TSubFormCreate & { id: string };

export type TServiceCreate = {
  name: string;
  description: string;
  label: string;
  priority: number;
};

export type TService = TServiceCreate & {
  id: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TServiceGet = TService & {
  form: [];
  products: [];
};
