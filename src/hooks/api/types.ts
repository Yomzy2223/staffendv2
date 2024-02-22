export interface productType {
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
}

export interface productFullType extends productType {
  id: string;
}

export interface productFormType {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface productSubFormType {
  question: string;
  type: string;
  options?: (string | number)[];
  compulsory: boolean;
  fileName?: string;
  allowOther?: boolean;
  dependsOn?: string;
  fileLink?: string;
  fileType?: string;
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
