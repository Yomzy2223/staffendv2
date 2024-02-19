import { productFormType, productSubFormType } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import useProductApi from "@/hooks/useProductApi";
import { useParams, useSearchParams } from "next/navigation";
import { FormType } from "../dynamicFormCreator/eachForm/constants";
import { productInfoType } from "./constants";

// Actions for service info section
export const useProductInfoActions = () => {
  const { get } = useSearchParams();
  const { serviceId } = useParams();
  const { setQuery } = useGlobalFucntions();
  const productId = get("productId");
  const isEdit = productId && get("action") == "edit";

  const { createProductMutation, updateProductMutation, useGetProductQuery } =
    useProductApi();
  const productInfo = useGetProductQuery(productId as string);

  const submitProductInfo = async (values: productInfoType) => {
    productId
      ? updateProductMutation.mutate({
          id: productId as string,
          formInfo: values,
        })
      : createProductMutation.mutate(
          {
            serviceCategoryId: serviceId.toString(),
            formInfo: values,
          },
          {
            onSuccess: (data) => setQuery("productId", data.data.data.id),
          }
        );
  };

  const productLoading =
    createProductMutation.isPending || updateProductMutation.isPending;
  const productSuccess =
    createProductMutation.isSuccess || updateProductMutation.isSuccess;

  return {
    isEdit,
    productLoading,
    productSuccess,
    productInfo,
    submitProductInfo,
  };
};

// Actions for service form section
export const useProductFormActions = () => {
  const { get } = useSearchParams();
  const productId = get("productId") as string;

  const {
    createProductFormMutation,
    updateProductFormMutation,
    useGetProductFormsQuery,
    createProductSubFormMutation,
    updateProductSubFormMutation,
  } = useProductApi();
  const productFormInfo = useGetProductFormsQuery(productId);

  const submitProductForm = async ({ formId, values }: productFormArgType) => {
    formId
      ? updateProductFormMutation.mutate({ id: formId, formInfo: values })
      : createProductFormMutation.mutate({
          serviceId: productId,
          formInfo: values,
        });
  };

  const submitProductFormField = ({
    formId,
    formValues,
    fieldId,
    values,
  }: productSubFormArgType) => {
    const submitField = (formId: string) => {
      fieldId
        ? updateProductSubFormMutation.mutate({
            id: fieldId,
            formInfo: values as productSubFormType,
          })
        : createProductSubFormMutation.mutate({
            serviceFormId: formId,
            formInfo: values as productSubFormType,
          });
    };

    if (formId) {
      submitField(formId);
    } else {
      createProductFormMutation.mutate(
        {
          serviceId: productId,
          formInfo: formValues,
        },
        {
          onSuccess: (data) => {
            const formId = data.data.data.id;
            submitField(formId);
          },
        }
      );
    }
  };

  const productFormState = {
    formLoading:
      createProductFormMutation.isPending ||
      updateProductFormMutation.isPending,
    formSuccess:
      createProductFormMutation.isSuccess ||
      updateProductFormMutation.isSuccess,
    fieldLoading:
      createProductSubFormMutation.isPending ||
      updateProductSubFormMutation.isPending,
    fieldSuccess:
      createProductSubFormMutation.isSuccess ||
      updateProductSubFormMutation.isSuccess,
  };

  return {
    productFormInfo,
    submitProductForm,
    submitProductFormField,
    productFormState,
  };
};

export interface productSubFormArgType {
  formId?: string;
  formValues: productFormType;
  fieldId?: string;
  values: { [x: string]: any };
}

export interface productFormArgType {
  formId?: string;
  values: FormType;
}
