import { getCountries } from "@/hooks/api/countryApi";
import { ICountry, ISubForm } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useCountryApi } from "@/hooks/useCountryApi";
import {
  useCreateMultipleProductSubFormsMutation,
  useCreateProductFormMutation,
  useCreateProductMutation,
  useCreateProductSubFormMutation,
  useDeleteProductFormMutation,
  useDeleteProductSubFormMutation,
  useGetProductFormsQuery,
  useGetProductQuery,
  useUpdateProductFormMutation,
  useUpdateProductMutation,
  useUpdateProductSubFormMutation,
} from "@/services/product";
import { countries, TCountryCode } from "countries-list";
import { useParams, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { IDynamicFormField } from "../dynamicForm/constants";
import {
  BusinessObjectives,
  FormType,
} from "../dynamicFormCreator/eachForm/constants";
import {
  FieldType,
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";
import { productInfoType, recurringIntervals } from "./constants";

// Actions for service info section
export const useProductInfoActions = ({
  section,
  setSection,
}: {
  section: number;
  setSection: Dispatch<SetStateAction<number>>;
}) => {
  const { get } = useSearchParams();
  const { serviceId } = useParams();
  const { setQuery } = useGlobalFunctions();
  const productId = get("productId");

  const title1 = productId ? "Update Product" : "Create Product";

  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const productInfo = useGetProductQuery(productId as string);

  const submitProductInfo = async (values: productInfoType) => {
    productId
      ? updateProductMutation.mutate(
          {
            id: productId as string,
            formInfo: values,
          },
          {
            onSuccess: () => setSection(section + 1),
          }
        )
      : createProductMutation.mutate(
          {
            serviceId: serviceId.toString(),
            formInfo: values,
          },
          {
            onSuccess: (data) => {
              setSection(section + 1);
              setQuery("productId", data.data.data.id);
            },
          }
        );
  };

  const productLoading =
    createProductMutation.isPending || updateProductMutation.isPending;
  const productSuccess =
    createProductMutation.isSuccess || updateProductMutation.isSuccess;

  return {
    title1,
    productLoading,
    productSuccess,
    productInfo,
    submitProductInfo,
  };
};

//

//

// Actions for service form section
export const useProductFormActions = () => {
  const { get } = useSearchParams();
  const productId = get("productId") as string;

  const createProductFormMutation = useCreateProductFormMutation();
  const updateProductFormMutation = useUpdateProductFormMutation();
  const deleteProductFormMutation = useDeleteProductFormMutation();
  const createProductSubFormMutation = useCreateProductSubFormMutation();
  const createMultipleProductSubFormsMutation =
    useCreateMultipleProductSubFormsMutation();
  const updateProductSubFormMutation = useUpdateProductSubFormMutation();
  const deleteProductSubFormMutation = useDeleteProductSubFormMutation();
  const productFormInfo = useGetProductFormsQuery(productId);

  // SUBMITS A FORM
  const submitProductForm = async ({
    formId,
    values,
    onSuccess,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updateProductFormMutation.mutate(
          { id: formId, formInfo: values },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        )
      : createProductFormMutation.mutate(
          {
            productId,
            formInfo: values,
          },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        );
  };

  // SUBMITS A FIELD
  const submitProductFormField = ({
    formId,
    fieldId,
    values,
    onSuccess,
  }: IFieldSubmitHandlerArg) => {
    fieldId
      ? updateProductSubFormMutation.mutate(
          {
            id: fieldId,
            formInfo: values as ISubForm,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        )
      : formId &&
        createProductSubFormMutation.mutate(
          {
            formId,
            formInfo: values as ISubForm,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        );
  };

  const submitMultipleFields = ({
    formId,
    values,
  }: {
    formId: string;
    values: FieldType[];
  }) => {
    if (!formId) return;
    createMultipleProductSubFormsMutation.mutate({
      formId,
      formInfo: values as ISubForm[],
    });
  };

  const handleFormDelete = (id: string) => {
    deleteProductFormMutation.mutate(id);
  };

  const handleFieldDelete = (id: string) => {
    deleteProductSubFormMutation.mutate(id);
  };

  const productFormState = {
    formLoading:
      createMultipleProductSubFormsMutation.isPending ||
      createProductFormMutation.isPending ||
      updateProductFormMutation.isPending,
    formSuccess:
      createProductFormMutation.isSuccess ||
      updateProductFormMutation.isSuccess,
    formDeleteLoading: deleteProductFormMutation.isPending,
    fieldLoading:
      createProductSubFormMutation.isPending ||
      updateProductSubFormMutation.isPending,
    fieldSuccess:
      createProductSubFormMutation.isSuccess ||
      updateProductSubFormMutation.isSuccess,
    fieldDeleteLoading: deleteProductSubFormMutation.isPending,
  };

  return {
    productFormInfo,
    submitProductForm,
    submitProductFormField,
    productFormState,
    handleFieldDelete,
    handleFormDelete,
    submitMultipleFields,
  };
};

//

//

// Section info action
export const useSectionInfo = () => {
  const { getAllCountriesQuery } = useCountryApi();
  const countryData = getAllCountriesQuery.data?.data?.data;

  const allCountries = Object.keys(countries).map(
    (el: string) => countries[el as TCountryCode].name
  );
  const countryNames = countryData?.map((el: ICountry) => el.name) || [];
  const originalCountry = countryNames.map((el: string) =>
    allCountries?.find((each) => each.toLowerCase() === el)
  );

  const countryCurrencies =
    countryData?.map((el: ICountry) => el.currency) || [];

  const section1FormInfo: IDynamicFormField[] = [
    {
      name: "name",
      label: "Enter product name",
      type: "text",
      textInputProp: {
        placeholder: "Enter product name",
      },
    },
    {
      name: "description",
      label: "Enter product description",
      type: "text",
      textInputProp: {
        placeholder: "Enter product description",
      },
    },
    {
      name: "country",
      label: "Select operational country",
      selectOptions: originalCountry,
      optionsLoading: getAllCountriesQuery.isLoading,
      type: "select",
      selectProp: {
        placeholder: "Select operational country",
      },
    },
    {
      name: "currency",
      label: "Select currency",
      selectOptions: countryCurrencies,
      optionsLoading: getAllCountriesQuery.isLoading,
      type: "select",
      selectProp: {
        placeholder: "Select currency",
      },
    },
    {
      name: "amount",
      label: "Enter product amount",
      type: "number",
      textInputProp: {
        placeholder: "Enter product amount",
      },
    },
    {
      name: "timeline",
      label: "Enter processing timeline",
      type: "text",
      textInputProp: {
        placeholder: "Enter processing timeline",
      },
    },
    {
      name: "recurringInterval",
      label: "Select recurring interval (optional)",
      selectOptions: recurringIntervals,
      type: "select",
      selectProp: {
        placeholder: "Select recurring interval",
      },
    },
    {
      name: "otherExpectedRequest",
      fieldName: "objective(s)",
      label: "Select objectives expected to buy (optional)",
      type: "multiSelect",
      selectOptions: BusinessObjectives,
      selectProp: {
        placeholder: "Select objectives",
      },
    },
    {
      name: "feature",
      label: "Enter product features",
      type: "tagInput",
      minTagChars: 3,
      errors: {
        empty: "Enter feature",
        exists: "Feature already exists",
        minTagChars: "Feature must be at least three characters",
        length: "Features cannot be more than 4",
      },
      textInputProp: {
        placeholder: "Enter product features",
      },
    },
  ];

  return { section1FormInfo };
};
