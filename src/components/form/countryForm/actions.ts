import { ICountry } from "@/hooks/api/types";
import { useCountryApi } from "@/hooks/useCountryApi";
import {
  countries,
  getCountryCode,
  getEmojiFlag,
  TCountryCode,
} from "countries-list";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDynamicFormField } from "../dynamicForm/constants";

// Actions for country info
export const useCountryActions = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    iso: "",
    code: "",
    currency: "",
  });

  const { get } = useSearchParams();
  const countryId = get("countryId") as string;
  const isEdit = !!countryId;

  const { createCountryMutation, updateCountryMutation, useGetCountryQuery } =
    useCountryApi();

  const countryInfo = useGetCountryQuery(countryId);
  const contryData = countryInfo.data?.data?.data;

  //   Create and update country
  const submitCountry = async (values: ICountry) => {
    countryId
      ? updateCountryMutation.mutate(
          {
            id: countryId,
            formInfo: values,
          },
          { onSuccess: () => setOpen(false) }
        )
      : createCountryMutation.mutate(
          { formInfo: values },
          { onSuccess: () => setOpen(false) }
        );
  };

  const countryLoading =
    createCountryMutation.isPending || updateCountryMutation.isPending;
  const countrySuccess =
    createCountryMutation.isSuccess || updateCountryMutation.isSuccess;

  // Updates other fields when a country is selected
  const handleCountrySelect = (selected?: string) => {
    if (!selected) return;
    const code = getCountryCode(selected);
    const countryInfo = countries[code as TCountryCode];
    setDefaultValues({
      name: countryInfo.name,
      iso: code.toString(),
      code: "+" + countryInfo.phone[0].toString(),
      currency: countryInfo.currency[0],
    });
  };

  //   Update country information
  useEffect(() => {
    if (contryData) {
      const originalCountry = Object.keys(countries)
        .map((el: string) => countries[el as TCountryCode].name)
        .find((el) => el.toLowerCase() === contryData.name);
      originalCountry && handleCountrySelect(originalCountry);
    }
  }, [contryData]);

  // Country form
  const formInfo: IDynamicFormField[] = [
    {
      name: "name",
      label: "Country name",
      type: "select",
      fieldName: "country",
      selectOptions: Object.keys(countries).map(
        (el: string) => countries[el as TCountryCode].name
      ),
      selectProp: {
        placeholder: "Select country",
        disabled: countryInfo.isLoading,
      },
      leftContent: getEmojiFlag(defaultValues.iso as TCountryCode),
      handleSelect: handleCountrySelect,
    },
    {
      name: "iso",
      label: "Country ISO",
      type: "text",
      textInputProp: {
        placeholder: "Country ISO",
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
        placeholder: "Country currency",
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
