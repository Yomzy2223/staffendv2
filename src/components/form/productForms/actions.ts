import { IProductSubForm } from "@/hooks/api/types";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import useProductApi from "@/hooks/useProductApi";
import { useParams, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";
import { productInfoType } from "./constants";

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
  const { setQuery } = useGlobalFucntions();
  const productId = get("productId");

  const title1 = productId ? "Update Product" : "Create Product";

  const { createProductMutation, updateProductMutation, useGetProductQuery } =
    useProductApi();
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
            productId,
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
    setNewlyAddedForm,
  }: IFieldSubmitHandlerArg) => {
    const submitField = (formId: string) => {
      fieldId
        ? updateProductSubFormMutation.mutate(
            {
              id: fieldId,
              formInfo: values as IProductSubForm,
            },
            { onSuccess: () => setEdit(false) }
          )
        : createProductSubFormMutation.mutate(
            {
              formId: formId,
              formInfo: values as IProductSubForm,
            },
            {
              onSuccess: () => {
                setEdit(false);
                setNewlyAdded && setNewlyAdded(undefined);
                setNewlyAddedForm && setNewlyAddedForm(undefined);
              },
            }
          );
    };

    if (formId) {
      submitField(formId);
    } else {
      createProductFormMutation.mutate(
        {
          productId,
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
