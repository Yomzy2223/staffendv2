import { productSubFormType } from "@/hooks/api/productApi";
import { serviceFormType, serviceSubFormType } from "@/hooks/api/serviceApi";
import useProductApi from "@/hooks/useProductApi";
import { useParams, useSearchParams } from "next/navigation";
import { FormType } from "../dynamicFormCreator/eachForm/constants";
import { productInfoType } from "./constants";

// Actions for service info section
export const useProductInfoActions = () => {
  const { get } = useSearchParams();
  const { serviceId, productId } = useParams();
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
      : createProductMutation.mutate({
          serviceCategoryId: serviceId.toString(),
          formInfo: values,
        });
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
export const useServiceFormActions = () => {
  const { get } = useSearchParams();
  const { serviceId, productId } = useParams();

  const {
    createProductFormMutation,
    updateProductFormMutation,
    useGetProductFormsQuery,
    createProductSubFormMutation,
    updateProductSubFormMutation,
  } = useProductApi();
  const serviceFormInfo = useGetProductFormsQuery(productId as string);

  const submitServiceForm = async ({ formId, values }: serviceFormArgType) => {
    formId
      ? updateProductFormMutation.mutate({ id: formId, formInfo: values })
      : createProductFormMutation.mutate({
          serviceId: serviceId.toString(),
          formInfo: values,
        });
  };

  const submitServiceFormField = ({
    formId,
    formValues,
    fieldId,
    values,
  }: serviceSubFormArgType) => {
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
          serviceId: serviceId.toString(),
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

  const serviceFormState = {
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
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
  };
};

export interface serviceSubFormArgType {
  formId?: string;
  formValues: serviceFormType;
  fieldId?: string;
  values: { [x: string]: any };
}

export interface serviceFormArgType {
  formId?: string;
  values: FormType;
}
