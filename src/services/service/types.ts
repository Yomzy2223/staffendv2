import { TFormCreate, TSubFormGet } from "..";

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
  form: TServiceFormGet[];
  products: []; //To add the product type here
};

export type TServiceFormRes = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  serviceId: string;
};

export type TProductFormRes = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  productId: string;
};

export type TServiceFormGet = TServiceFormRes & {
  subForm: TSubFormGet[];
};
export type TProductFormGet = TProductFormRes & {
  subForm: TSubFormGet[];
};

export type TFieldTypes =
  | "text"
  | "password"
  | "address"
  | "business name"
  | "checkbox"
  | "countries-operation"
  | "countries-all"
  | "document template"
  | "document upload"
  | "select"
  | "email"
  | "email address"
  | "paragraph"
  | "objectives"
  | "phone number"
  | "promocode"
  | "multiple choice"
  | "short answer";
