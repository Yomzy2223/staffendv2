import { ISubForm } from "@/hooks/api/types";
import useServiceApi from "@/hooks/useServiceApi";
import {
  useCreateMultipleServiceSubFormsMutation,
  useCreateServiceFormMutation,
  useCreateServiceMutation,
  useCreateServiceSubFormMutation,
  useDeleteServiceFormMutation,
  useDeleteServiceSubFormMutation,
  useGetServiceFormsQuery,
  useGetServiceQuery,
  useUpdateServiceFormMutation,
  useUpdateServiceMutation,
  useUpdateServiceSubFormMutation,
} from "@/services/service";
import { TServiceCreate } from "@/services/service/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  FieldType,
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";

// Actions for service info section
export const useServiceInfoActions = ({
  section,
  setSection,
}: {
  section: number;
  setSection: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { get } = useSearchParams();
  const { serviceId } = useParams();
  const isEdit = serviceId && get("action") == "edit";

  const serviceInfo = useGetServiceQuery(serviceId as string);
  const createServiceMutation = useCreateServiceMutation();
  const updateServiceMutation = useUpdateServiceMutation();

  const submitServiceInfo = async (values: TServiceCreate) => {
    console.log(values);
    isEdit
      ? updateServiceMutation.mutate(
          {
            id: serviceId as string,
            formInfo: values,
          },
          {
            onSuccess: () => setSection(section + 1),
          }
        )
      : createServiceMutation.mutate(values, {
          onSuccess: (data) => {
            setSection(section + 1);
            router.push(`/services/${data.data.data.id}?action=add`);
          },
        });
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
  const { serviceId } = useParams();

  const serviceFormInfo = useGetServiceFormsQuery(serviceId as string);
  const createServiceFormMutation = useCreateServiceFormMutation();
  const updateServiceFormMutation = useUpdateServiceFormMutation();
  const deleteServiceFormMutation = useDeleteServiceFormMutation();
  const createServiceSubFormMutation = useCreateServiceSubFormMutation();
  const updateServiceSubFormMutation = useUpdateServiceSubFormMutation();
  const deleteServiceSubFormMutation = useDeleteServiceSubFormMutation();
  const createMultipleServiceSubFormsMutation =
    useCreateMultipleServiceSubFormsMutation();

  const submitServiceForm = async ({
    formId,
    values,
    onSuccess,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updateServiceFormMutation.mutate(
          { id: formId, formInfo: values },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        )
      : createServiceFormMutation.mutate(
          {
            serviceId: (serviceId as string) || "",
            formInfo: values,
          },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        );
  };

  const submitServiceFormField = ({
    formId,
    fieldId,
    values,
    onSuccess,
  }: IFieldSubmitHandlerArg) => {
    fieldId
      ? updateServiceSubFormMutation.mutate(
          {
            id: fieldId,
            formInfo: values as ISubForm,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        )
      : formId &&
        createServiceSubFormMutation.mutate(
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
    createMultipleServiceSubFormsMutation.mutate({
      formId,
      formInfo: values as ISubForm[],
    });
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
    formDeleteLoading: deleteServiceFormMutation.isPending,
    fieldLoading:
      createServiceSubFormMutation.isPending ||
      updateServiceSubFormMutation.isPending,
    fieldSuccess:
      createServiceSubFormMutation.isSuccess ||
      updateServiceSubFormMutation.isSuccess,
    fieldDeleteLoading: deleteServiceSubFormMutation.isPending,
  };

  return {
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
    handleFieldDelete,
    handleFormDelete,
    submitMultipleFields,
  };
};
