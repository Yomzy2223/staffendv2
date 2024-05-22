import { TFormCreate, TSubFormGet } from "..";

export type TPartnerFormRes = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  country: string;
};

export type TPartnerFormGet = TPartnerFormRes & {
  subForm: TSubFormGet[];
};

export type TPartnerFormQA = TFormCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  formId: string;
  isDeprecated: false;
  userId: string;
  subForm: TPartnerSubFormQA[];
};

export type TPartnerSubFormQA = TSubFormGet & {
  answer: string[];
  formId: string;
};
