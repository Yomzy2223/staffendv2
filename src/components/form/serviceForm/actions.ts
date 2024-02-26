import { IServiceSubForm } from "@/hooks/api/types";
import useServiceApi from "@/hooks/useServiceApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";
import { serviceInfoType } from "./constants";

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

  const { createServiceMutation, updateServiceMutation, useGetServiceQuery } =
    useServiceApi();
  const serviceInfo = useGetServiceQuery(serviceId as string);

  const submitServiceInfo = async (values: serviceInfoType) => {
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
    setEdit,
    setNewlyAdded,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updateServiceFormMutation.mutate(
          { id: formId, formInfo: values },
          { onSuccess: () => setEdit(false) }
        )
      : createServiceFormMutation.mutate(
          {
            serviceId: (serviceId as string) || "",
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

  const submitServiceFormField = ({
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
        ? updateServiceSubFormMutation.mutate(
            {
              id: fieldId,
              formInfo: values as IServiceSubForm,
            },
            { onSuccess: () => setEdit(false) }
          )
        : createServiceSubFormMutation.mutate(
            {
              formId,
              formInfo: values as IServiceSubForm,
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
      createServiceFormMutation.mutate(
        {
          serviceId: (serviceId as string) || "",
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
  };
};
