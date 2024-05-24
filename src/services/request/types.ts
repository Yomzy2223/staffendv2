import { TProductGet } from "../product/types";
import { TFieldTypes } from "../service/types";

export type TRequestStatus =
  | "PENDING"
  | "SUBMITTED"
  | "ASSIGNED"
  | "REJECTED"
  | "COMPLETED";

export type TRequestState =
  | "PRODUCTINFO"
  | "SERVICEFORM"
  | "PAYMENT"
  | "PRODUCTFORM"
  | "REVIEW";

export type TRequestCF = {
  id: string;
  paid: boolean;
  status: TRequestStatus;
  currentState: TRequestState;
  partnerInCharge: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  submittedAt: string;
  assignedAt: string;
  businessId: string;
  productId: string;
  createdBy: string; // To be added to get request response in the backend
};

export type TRequestAll = TRequestCF & {
  companyName: string;
  status: TRequestStatus;
  requestStatus: string; // To be removed from the backend
  currentState: TRequestState;
  partnerInCharge: string;
  productName: string;
  productCountry: string;
  serviceName: string;
};

export type TRequestGet = TRequestCF & {
  requestQA: TRequestForm[];
  product: TProductGet;
  business: TBusinessInfoGet;
};

export type TBusinessInfoCreate = {
  rcNumber: number;
  companyName: string;
  companyEmail: string;
  companyType: string;
  branchAddress: string;
  city: string;
  classification: string;
  headOfficeAddress: string;
  lga: string;
  affiliates: number;
  shareCapital: string;
  state: string;
  status: string;
};

export type TBusinessInfoGet = {
  id: string;
  rcNumber: string;
  companyName: string;
  companyType: string;
  registrationDate: string;
  branchAddress: string;
  companyEmail: string;
  city: string;
  classification: string;
  headOfficeAddress: string;
  lga: string;
  affiliates: string;
  shareCapital: string;
  shareCapitalInWords: string;
  state: string;
  status: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TRequestForm = {
  id: string;
  title: string;
  description: string;
  type: TFieldTypes;
  compulsory: boolean;
  isGeneral: boolean;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  requestId: string;
  subForm: TRequestSubForm[];
  formId: string;
};

export type TRequestSubForm = {
  id: string;
  question: string;
  answer: string[];
  type: TFieldTypes;
  fileName: string;
  fileType: string;
  fileLink: string;
  fileSize: string;
  compulsory: boolean;
  isDeprecated: boolean;
  requestQAId: string;
};

export type TServiceReqPayload = {
  serviceId: string;
  page?: number | string;
  pageSize?: number | string;
  startDate?: string;
  endDate?: string;
};

export type TAllReqPayload = {
  page?: number | string;
  pageSize?: number | string;
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
};

export type TSearchReqArgs = {
  queryString: string;
  page?: number | string;
  pageSize?: number | string;
  serviceId?: string;
  startDate?: string;
  endDate?: string;
};
