import { ISubForm } from "@/hooks/api/types";
import usePartnerApi from "@/hooks/usePartnerApi";
import { useSearchParams } from "next/navigation";
import {
  IFieldSubmitHandlerArg,
  IFormSubmitHandlerArg,
} from "../dynamicFormCreator/eachForm/types";

// Actions for service form section
export const useParterFormActions = () => {
  const { get } = useSearchParams();
  const country = get("country") as string;

  const {
    createPartnerFormMutation,
    updatePartnerFormMutation,
    deletePartnerFormMutation,
    useGetPartnerFormQuery,
    useGetCountryPartnerFormsQuery,
    createPartnerSubFormMutation,
    updatePartnerSubFormMutation,
    deletePartnerSubFormMutation,
  } = usePartnerApi();
  const partnerFormInfo = useGetCountryPartnerFormsQuery(country);

  // SUBMITS A FORM
  const submitPartnerForm = async ({
    formId,
    values,
    onSuccess,
  }: IFormSubmitHandlerArg) => {
    formId
      ? updatePartnerFormMutation.mutate(
          { id: formId, formInfo: values },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        )
      : createPartnerFormMutation.mutate(
          {
            country,
            formInfo: values,
          },
          { onSuccess: (data) => onSuccess && onSuccess(data) }
        );
  };

  // SUBMITS A FIELD
  const submitPartnerFormField = ({
    formId,
    fieldId,
    values,
    onSuccess,
  }: IFieldSubmitHandlerArg) => {
    fieldId
      ? updatePartnerSubFormMutation.mutate(
          {
            id: fieldId,
            formInfo: values as ISubForm,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        )
      : formId &&
        createPartnerSubFormMutation.mutate(
          {
            formId,
            formInfo: values as ISubForm,
          },
          {
            onSuccess: (data) => onSuccess && onSuccess(data),
          }
        );
  };

  const handleFormDelete = (id: string) => {
    deletePartnerFormMutation.mutate(id);
  };

  const handleFieldDelete = (id: string) => {
    deletePartnerSubFormMutation.mutate(id);
  };

  const partnerFormState = {
    formLoading:
      createPartnerFormMutation.isPending ||
      updatePartnerFormMutation.isPending,
    formSuccess:
      createPartnerFormMutation.isSuccess ||
      updatePartnerFormMutation.isSuccess,
    formDeleteLoading: deletePartnerFormMutation.isPending,
    fieldLoading:
      createPartnerSubFormMutation.isPending ||
      updatePartnerSubFormMutation.isPending,
    fieldSuccess:
      createPartnerSubFormMutation.isSuccess ||
      updatePartnerSubFormMutation.isSuccess,
    fieldDeleteLoading: deletePartnerSubFormMutation.isPending,
  };

  return {
    partnerFormInfo,
    submitPartnerForm,
    submitPartnerFormField,
    partnerFormState,
    handleFieldDelete,
    handleFormDelete,
  };
};
