import { IDependsOn } from "@/components/form/dynamicFormCreator/eachForm/types";

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
  form: TFormGet[];
  products: []; //To add the product type here
};

export type TFormCreate = {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
};

export type TForm = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  serviceId: string;
};

export type TFormGet = TForm & {
  subForm: TSubFormGet[];
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

export type TSubFormGet = TSubFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
};
