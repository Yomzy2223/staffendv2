export type TCreateFAQ = {
  serviceId: string;
  productId: string;
  requestState: string;
  question: string;
  answer: string;
};

export type TFAQ = TCreateFAQ & {
  id: string;
};
