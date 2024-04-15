import { IDependsOn } from "@/components/form/dynamicFormCreator/eachForm/types";

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

export interface IService {
  name: string;
  description: string;
}

export interface IServiceFull extends IService {
  id: string;
}

export interface IForm {
  id?: string;
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface ISubForm {
  id?: string;
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  allowOther?: boolean;
  fileName?: string;
  fileLink?: string;
  fileType?: string;
  fileSize?: string;
  documentType?: string; //to be removed
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
  id: string;
  paid: boolean;
  businessName: string;
  status: "PENDING" | "SUBMITTED" | "ASSIGNED" | "REJECTED" | "COMPLETED";
  completedAt: string;
  createdAt: string;
  submittedAt: string;
  createdBy: string;
  productCountry: string;
  processId: string;
  productName: string;
  serviceName: string;
  updatedAt: string;
  assignedAt: string;
  productId: string;
  currentState: string;
  partnerInCharge: string;
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

export interface IRequesForm {
  id: string;
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
  isGeneral: boolean;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  requestId: string;
  subForm: {
    id: string;
    question: string;
    answer: string[];
    type: string;
    fileName: string;
    fileType: string;
    fileLink: string;
    fileSize: string;
    compulsory: boolean;
    isDeprecated: boolean;
    requestQAId: string;
  }[];
}

export interface IBusiness {
  id: string;
  businessName: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
