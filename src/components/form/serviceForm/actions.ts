import { IServiceSubForm } from "@/hooks/api/types";
import useServiceApi from "@/hooks/useServiceApi";
import { useParams, useSearchParams } from "next/navigation";
import { FormType } from "../dynamicFormCreator/eachForm/constants";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";
import { serviceInfoType } from "./constants";

// Actions for service info section
export const useServiceInfoActions = () => {
  const { get } = useSearchParams();
  const { serviceId } = useParams();
  const isEdit = serviceId && get("action") == "edit";

  const { createServiceMutation, updateServiceMutation, useGetServiceQuery } =
    useServiceApi();
  const serviceInfo = useGetServiceQuery(serviceId as string);

  const submitServiceInfo = async (values: serviceInfoType) => {
    serviceId
      ? updateServiceMutation.mutate({
          id: serviceId as string,
          formInfo: values,
        })
      : createServiceMutation.mutate(values);
  };

  const serviceLoading =
    createServiceMutation.isPending || updateServiceMutation.isPending;
  const serviceSuccess =
    createServiceMutation.isSuccess || updateServiceMutation.isSuccess;

  return {
    isEdit,
    serviceLoading,
    serviceSuccess,
    serviceInfo,
    submitServiceInfo,
  };
};

// Actions for service form section
export const useServiceFormActions = () => {
  const { get } = useSearchParams();
  const { serviceId } = useParams();

  const {
    createServiceFormMutation,
    updateServiceFormMutation,
    deleteServiceFormMutation,
    useGetServiceFormsQuery,
    createServiceSubFormMutation,
    updateServiceSubFormMutation,
    deleteServiceSubFormMutation,
  } = useServiceApi();
  const serviceFormInfo = useGetServiceFormsQuery(serviceId as string);

  const submitServiceForm = async ({
    formId,
    values,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updateServiceFormMutation.mutate({ id: formId, formInfo: values })
      : createServiceFormMutation.mutate({
          serviceCategoryId: (serviceId as string) || "",
          formInfo: values,
        });
  };

  const submitServiceFormField = ({
    formId,
    formValues,
    fieldId,
    values,
  }: IFieldSubmitHandlerArg) => {
    const submitField = (formId: string) => {
      fieldId
        ? updateServiceSubFormMutation.mutate({
            id: fieldId,
            formInfo: values as IServiceSubForm,
          })
        : createServiceSubFormMutation.mutate({
            formId,
            formInfo: values as IServiceSubForm,
          });
    };

    if (formId) {
      submitField(formId);
    } else {
      createServiceFormMutation.mutate(
        {
          serviceCategoryId: (serviceId as string) || "",
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
    deleteServiceFormMutation.mutate(id);
  };

  const handleFieldDelete = (id: string) => {
    deleteServiceSubFormMutation.mutate(id);
  };

  const serviceFormState = {
    formLoading:
      createServiceFormMutation.isPending ||
      updateServiceFormMutation.isPending,
    formSuccess:
      createServiceFormMutation.isSuccess ||
      updateServiceFormMutation.isSuccess,
    fieldLoading:
      createServiceSubFormMutation.isPending ||
      updateServiceSubFormMutation.isPending,
    fieldSuccess:
      createServiceSubFormMutation.isSuccess ||
      updateServiceSubFormMutation.isSuccess,
    fieldDeleteLoading: deleteServiceSubFormMutation.isPending,
    formDeleteLoading: deleteServiceFormMutation.isPending,
  };

  return {
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
  };
};
