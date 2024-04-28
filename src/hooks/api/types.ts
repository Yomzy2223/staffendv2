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

export interface IUser {
  country?: string;
  createdAt: string;
  email: string;
  fullName: string;
  googleId?: string;
  id: string;
  isActivated: boolean;
  isDeprecated: boolean;
  isIdentificationRegistered: boolean;
  isIdentificationVerified: boolean;
  isPartner: boolean;
  isPhoneRegistered: boolean;
  isPhoneVerified: boolean;
  isStaff: boolean;
  isVerified: boolean;
  partnerPermission: string[];
  password: string;
  phone?: string;
  picture?: string;
  referral: string;
  resetToken?: string;
  staffPermission: [];
  updatedAt: string;
  userPermission: string[];
  username?: string;
}
