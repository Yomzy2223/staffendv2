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
    useGetServiceFormQuery,
  } = useServiceApi();

  const submitServiceForm = async ({
    formId,
    values,
  }: {
    formId?: string;
    values: FormType;
  }) => {
    // formId
    //   ? updateServiceFormMutation.mutate({ id: formId, formInfo: values })
    //   : createServiceFormMutation.mutate({
    //       serviceCategoryId: serviceId || "",
    //       formInfo: values,
    //     });
    console.log("Submit service form", values);
  };

  const submitServiceFormField = (value: { [x: string]: any }) => {
    console.log("Submit service form field", value);
  };

  return {
    submitServiceForm,
    submitServiceFormField,
  };
};
