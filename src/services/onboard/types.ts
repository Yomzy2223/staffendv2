import { TFormCreate, TSubFormGet } from "..";

export type TOnboardFormRes = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  country: string;
};

export type TOnboardFormGet = TOnboardFormRes & {
  subForm: TSubFormGet[];
};

export type TOnboardFormQA = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  formId: string;
  isDeprecated: false;
  userId: string;
  subForm: TOnboardSubFormQA[];
};

export type TOnboardSubFormQA = TSubFormGet & {
  answer: string[];
  formId: string;
};
