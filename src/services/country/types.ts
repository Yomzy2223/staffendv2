export type TCountry = {
  name: string;
  code: string;
  iso: string;
  currency: string;
};

export type TCountryGet = TCountry & {
  id: string;
};
