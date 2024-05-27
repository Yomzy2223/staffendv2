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

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp extends ISignIn {
  fullName: string;
  referral: string;
  isPartner: boolean;
  isStaff: boolean;
}

export interface IResetPassword {
  token: string;
  password: string;
}
