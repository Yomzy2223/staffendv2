import { serviceFormType, serviceSubFormType } from "@/api/serviceApi";
import useServiceApi from "@/hooks/useServiceApi";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { serviceInfoType } from ".";
import { FormType } from "../dynamicFormCreator/eachForm/constants";

// Actions for service info section
export const useServiceInfoActions = () => {
  const { get } = useSearchParams();
  const serviceId = get("serviceId");
  const isEdit = get("serviceId");

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
  const serviceId = get("serviceId");

  const {
    createServiceFormMutation,
    updateServiceFormMutation,
    useGetServiceFormsQuery,
    createServiceSubFormMutation,
    updateServiceSubFormMutation,
  } = useServiceApi();
  const serviceFormInfo = useGetServiceFormsQuery(serviceId as string);

  const submitServiceForm = async ({ formId, values }: serviceFormArgType) => {
    console.log("Form created");
    formId
      ? updateServiceFormMutation.mutate({ id: formId, formInfo: values })
      : createServiceFormMutation.mutate({
          serviceCategoryId: serviceId || "",
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
        ? updateServiceSubFormMutation.mutate({
            id: fieldId,
            formInfo: values as serviceSubFormType,
          })
        : createServiceSubFormMutation.mutate({
            formId,
            formInfo: values as serviceSubFormType,
          });
    };

    if (formId) {
      submitField(formId);
    } else {
      createServiceFormMutation.mutate(
        {
          serviceCategoryId: serviceId || "",
          formInfo: formValues,
        },
        {
          onSuccess: (data) => {
            const formId = data.data.data.id;
            console.log(formId, data);
            submitField(formId);
          },
        }
      );
    }
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
