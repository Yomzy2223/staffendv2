import { TRequestState } from "../request/types";

export type TCreateFAQ = {
  serviceId: string;
  productId: string;
  requestState: TRequestState;
  question: string;
  answer: string;
};

export type TFAQ = TCreateFAQ & {
  id: string;
};
