export type TProductCreate = {
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
  recurringInterval: string;
  otherExpectedRequest: string[];
};

export type TProductGet = TProductCreate & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
  serviceId: string;
};
