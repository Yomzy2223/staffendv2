import { deletePartnerSubForm } from "@/hooks/api/partnerApi";
import { ICountry } from "@/hooks/api/types";
import { useCountryApi } from "@/hooks/useCountryApi";
import { TSubFormCreate } from "@/services";
import {
  useCreatePartnerFormMutation,
  useCreatePartnerSubFormMutation,
  useDeletePartnerFormMutation,
  useDeletePartnerSubFormMutation,
  useGetCountryPartnerFormsQuery,
  useUpdatePartnerFormMutation,
  useUpdatePartnerSubFormMutation,
} from "@/services/partner";
import {
  countries,
  getCountryCode,
  getEmojiFlag,
  TCountryCode,
} from "countries-list";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDynamicFormField } from "../dynamicForm/constants";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";

// Actions for country info
export const useCountryActions = ({
  setOpen,
  section,
  setSection,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  section: number;
  setSection: Dispatch<SetStateAction<number>>;
}) => {
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    iso: "",
    code: "",
    currency: "",
  });

  const router = useRouter();
  const { get } = useSearchParams();
  const countryId = get("countryId") as string;
  const isEdit = !!countryId;

  const { createCountryMutation, updateCountryMutation, useGetCountryQuery } =
    useCountryApi();

  const countryRes = useGetCountryQuery(countryId);
  const activeCountry = countryRes.data?.data?.data;

  //   Create and update country
  const submitCountry = async (values: ICountry) => {
    countryId
      ? updateCountryMutation.mutate(
          {
            id: countryId,
            formInfo: values,
          },
          {
            onSuccess: () => setSection(section + 1),
          }
        )
      : createCountryMutation.mutate(
          { formInfo: values },
          {
            onSuccess: (data) => setSection(section + 1),
          }
        );
  };

  const countryLoading =
    createCountryMutation.isPending || updateCountryMutation.isPending;

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
    if (activeCountry) {
      const originalCountry = Object.keys(countries)
        .map((el: string) => countries[el as TCountryCode].name)
        .find((el) => el.toLowerCase() === activeCountry.name);
      originalCountry && handleCountrySelect(originalCountry);
    }
  }, [activeCountry]);

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
        disabled: countryRes.isLoading,
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
    activeCountry,
    submitCountry,
    formInfo,
    defaultValues,
  };
};

// Actions for service form section
export const useParterFormActions = ({ country }: { country: string }) => {
  const partnerFormRes = useGetCountryPartnerFormsQuery(country);
  const createPartnerForm = useCreatePartnerFormMutation();
  const updatePartnerForm = useUpdatePartnerFormMutation();
  const deletePartnerForm = useDeletePartnerFormMutation();

  const createPartnerSubForm = useCreatePartnerSubFormMutation();
  const updatePartnerSubForm = useUpdatePartnerSubFormMutation();
  const deletePartnerSubForm = useDeletePartnerSubFormMutation();

  // SUBMITS A FORM
  const submitPartnerForm = async ({
    formId,
    values,
    onSuccess,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updatePartnerForm.mutate(
          { id: formId, formInfo: values },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        )
      : createPartnerForm.mutate(
          {
            country,
            formInfo: values,
          },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        );
  };

  // SUBMITS A FIELD
  const submitPartnerFormField = ({
    formId,
    fieldId,
    values,
    onSuccess,
  }: IFieldSubmitHandlerArg) => {
    fieldId
      ? updatePartnerSubForm.mutate(
          {
            id: fieldId,
            formInfo: values as TSubFormCreate,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        )
      : formId &&
        createPartnerSubForm.mutate(
          {
            formId,
            formInfo: values as TSubFormCreate,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        );
  };

  const handleFormDelete = (id: string) => {
    deletePartnerForm.mutate(id);
  };

  const handleFieldDelete = (id: string) => {
    deletePartnerSubForm.mutate(id);
  };

  const partnerFormState = {
    formLoading: createPartnerForm.isPending || updatePartnerForm.isPending,
    formSuccess: createPartnerForm.isSuccess || updatePartnerForm.isSuccess,
    formDeleteLoading: deletePartnerForm.isPending,
    fieldLoading:
      createPartnerSubForm.isPending || updatePartnerSubForm.isPending,
    fieldSuccess:
      createPartnerSubForm.isSuccess || updatePartnerSubForm.isSuccess,
    fieldDeleteLoading: deletePartnerSubForm.isPending,
  };

  return {
    partnerFormRes,
    submitPartnerForm,
    submitPartnerFormField,
    partnerFormState,
    handleFieldDelete,
    handleFormDelete,
  };
};
