export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = TSignIn & {
  fullName: string;
  organization: string;
  referral: string;
  isPartner: boolean;
  isStaff: boolean;
  address: string;
};

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUserDocCreate = {
  name: string;
  link: string;
  type: string;
  size: string;
  isReceived: boolean;
  requestId: string;
  userId: string;
};

export type TUserDocGet = TUserDocCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isDeprecated: boolean;
  requestSubFormId: string;
};

export interface TUser {
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
  partnerStatus: "INACTIVE" | "SUBMITTED" | "ACTIVATED" | "DEACTIVATED" | "DECLINED";
}
