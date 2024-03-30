import { IDependsOn } from "@/components/form/dynamicFormCreator/eachForm/types";

export interface IService {
  name: string;
  description: string;
}

export interface IServiceFull extends IService {
  id: string;
}

export interface IServiceForm {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface ISubForm {
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  allowOther?: boolean;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
  documentType: string; //to be removed
  dependsOn?: IDependsOn;
}

export interface IProduct {
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
  recurringInterval: string;
  otherExpectedRequest: string[];
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

export interface IRequest {
  completedAt: string;
  createdAt: string;
  currentState: string;
  id: string;
  paid: boolean;
  productId: string;
  status: "PENDING" | "SUBMITTED" | "COMPLETED";
  submittedAt: string;
  updatedAt: string;
}

export interface IPartnerForm {
  forms: ISubForm;
}
