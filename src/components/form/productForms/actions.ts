import { productFormType, productSubFormType } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { useCountryApi } from "@/hooks/useCountryApi";
import useProductApi from "@/hooks/useProductApi";
import { useParams, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "../dynamicFormCreator/eachForm/constants";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";
import { productInfoType, section1FormInfo } from "./constants";

// Actions for service info section
export const useProductInfoActions = () => {
  const { get } = useSearchParams();
  const { serviceId } = useParams();
  const { setQuery } = useGlobalFucntions();
  const productId = get("productId");

  const title1 = productId ? "Update Product" : "Create Product";

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
    title1,
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
    deleteProductFormMutation,
    useGetProductFormsQuery,
    createProductSubFormMutation,
    updateProductSubFormMutation,
    deleteProductSubFormMutation,
  } = useProductApi();
  const productFormInfo = useGetProductFormsQuery(productId);

  const submitProductForm = async ({
    formId,
    values,
    setEdit,
    setNewlyAdded,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updateProductFormMutation.mutate(
          { id: formId, formInfo: values },
          { onSuccess: () => setEdit(false) }
        )
      : createProductFormMutation.mutate(
          {
            serviceId: productId,
            formInfo: values,
          },
          {
            onSuccess: () => {
              setEdit(false);
              setNewlyAdded && setNewlyAdded(undefined);
            },
          }
        );
  };

  const submitProductFormField = ({
    formId,
    formValues,
    fieldId,
    values,
    setEdit,
    setNewlyAdded,
  }: IFieldSubmitHandlerArg) => {
    const submitField = (formId: string) => {
      fieldId
        ? updateProductSubFormMutation.mutate(
            {
              id: fieldId,
              formInfo: values as productSubFormType,
            },
            { onSuccess: () => setEdit(false) }
          )
        : createProductSubFormMutation.mutate(
            {
              serviceFormId: formId,
              formInfo: values as productSubFormType,
            },
            {
              onSuccess: () => {
                setEdit(false);
                setNewlyAdded && setNewlyAdded(undefined);
              },
            }
          );
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

  const handleFormDelete = (id: string) => {
    deleteProductFormMutation.mutate(id);
  };

  const handleFieldDelete = (id: string) => {
    deleteProductSubFormMutation.mutate(id);
  };

  const productFormState = {
    formLoading:
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
  };
};

// export interface productSubFormArgType {
//   formId?: string;
//   formValues: productFormType;
//   fieldId?: string;
//   values: { [x: string]: any };
// }

// export interface productFormArgType {
//   formId?: string;
//   values: FormType;
//   setEdit: Dispatch<SetStateAction<boolean>>;
//   setNewlyAdded: Dispatch<SetStateAction<FormType | undefined>>;
// }
