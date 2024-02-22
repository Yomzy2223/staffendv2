import { ICountry } from "@/hooks/api/types";
import { useCountryApi } from "@/hooks/useCountryApi";
import {
  countries,
  getCountryCode,
  getCountryData,
  getCountryDataList,
  TCountryCode,
} from "countries-list";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Actions for country info
export const useCountryActions = () => {
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    capital: "",
    language: "",
    code: "",
    currency: "",
  });

  const { get } = useSearchParams();
  const countryId = get("countryId") as string;
  const isEdit = countryId ? true : false;

  const { createCountryMutation, updateCountryMutation, useGetCountryQuery } =
    useCountryApi();
  const countryInfo = useGetCountryQuery(countryId);

  const submitCountry = async (values: ICountry) => {
    countryId
      ? updateCountryMutation.mutate({
          id: countryId,
          formInfo: values,
        })
      : createCountryMutation.mutate({ formInfo: values });
  };

  const countryLoading =
    createCountryMutation.isPending || updateCountryMutation.isPending;
  const countrySuccess =
    createCountryMutation.isSuccess || updateCountryMutation.isSuccess;

  const handleCountrySelect = (selected: string) => {
    const code = getCountryCode(selected);
    const countryInfo = countries[code as TCountryCode];
    setDefaultValues({
      name: countryInfo.name,
      capital: countryInfo.capital,
      code: "+" + countryInfo.phone[0].toString(),
      language: countryInfo.languages[0],
      currency: countryInfo.currency[0],
    });
  };

  // Country form
  const formInfo = [
    {
      name: "name",
      label: "Country name",
      type: "combobox",
      fieldName: "country",
      selectOptions: Object.keys(countries).map(
        (el: string) => countries[el as TCountryCode].name
      ),
      selectProp: {
        placeholder: "Select country",
        onSelect: handleCountrySelect,
      },
    },
    {
      name: "capital",
      label: "Country capital",
      type: "text",
      textInputProp: {
        placeholder: "Country capital",
        disabled: true,
      },
    },
    {
      name: "language",
      label: "Country language",
      type: "text",
      textInputProp: {
        placeholder: "Country language",
        disabled: true,
      },
    },
    {
      name: "code",
      label: "Country code",
      type: "text",
      textInputProp: {
        placeholder: "Country code",
        disabled: true,
      },
    },
    {
      name: "currency",
      label: "Country currency",
      type: "text",
      textInputProp: {
        placeholder: "Country ",
        disabled: true,
      },
    },
  ];

  return {
    isEdit,
    countryLoading,
    countrySuccess,
    countryInfo,
    submitCountry,
    formInfo,
    defaultValues,
  };
};
//   const country = selected.replace(/\b[a-z](?!and|of)/g, (match) =>
//     match.toUpperCase()
//   );
