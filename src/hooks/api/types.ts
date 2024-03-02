import { IDependsOn } from "@/components/form/dynamicFormCreator/eachForm/types";

export interface IService {
  name: string;
  description: string;
}

export interface IServiceForm {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface IServiceSubForm {
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  fileName?: string;
  fileDescription?: string;
  fileLink?: string;
  fileType?: string;
  documentType?: string;
}

export interface IProduct {
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
}

export interface IProductFull extends IProduct {
  id: string;
}

export interface IProductForm {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface IProductSubForm {
  question: string;
  type: string;
  options?: (string | number)[];
  compulsory: boolean;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  dependsOn?: IDependsOn;
  allowOther?: boolean;
}

export interface ICountry {
  name: string;
  code: string;
  iso: string;
  currency: string;
}

export interface ICountryFull {
  id: string;
  name: string;
  code: string;
  iso: string;
  currency: string;
}
