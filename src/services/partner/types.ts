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
