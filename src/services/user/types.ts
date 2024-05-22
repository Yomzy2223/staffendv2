export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = {
  fullName: string;
  referral: string;
  isPartner: boolean;
  isStaff: boolean;
};

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUser = {
  country?: string;
  createdAt: string;
  email: string;
  fullName: string;
  googleId?: string;
  id: string;
  isActivated: boolean;
  partnerStatus?:
    | "INACTIVE"
    | "ACTIVE"
    | "SUBMITTED"
    | "DEACTIVATED"
    | "DECLINED";
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
};
