import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";
import DynamicFormCreator from "../dynamicFormCreator";
import { useCountryActions, useOnboardingFormActions, useParterFormActions } from "./actions";
import { countrySchema } from "./constants";

const CountryForm = ({ open, setOpen }: IProps) => {
  const [section, setSection] = useState(1);

  const { deleteQueryStrings } = useGlobalFunctions();

  const { formInfo, isEdit, activeCountry, submitCountry, countryLoading, defaultValues } =
    useCountryActions({ setOpen, section, setSection });

  const {
    partnerFormRes,
    submitPartnerForm,
    submitPartnerFormField,
    partnerFormState,
    handlePartnerFieldDelete,
    handlePartnerFormDelete,
  } = useParterFormActions({ country: activeCountry?.name });
  const partnerFormData = partnerFormRes?.data?.data?.data || [];

  const {
    onboardFormRes,
    submitOnboardForm,
    submitOnboardFormField,
    onboardFormState,
    handleOnboardFieldDelete,
    handleOnboardFormDelete,
  } = useOnboardingFormActions({ country: activeCountry?.name });
  const onboardFormData = onboardFormRes?.data?.data?.data || [];

  const title1 = (isEdit ? "Update" : "Add") + " Country";
  const title2 =
    ((partnerFormData?.length ?? 0) > 0 ? "Update" : "Add") + " Partner Activation Form";
  const title3 = ((partnerFormData?.length ?? 0) > 0 ? "Update" : "Add") + " Onboarding Form";
  let title = title1;

  switch (section) {
    case 2:
      title = title2;
      break;
    case 3:
      title = title3;
      break;
  }

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  const resetDialog = () => {
    setOpen(false);
    deleteQueryStrings(["countryId"]);
  };

  const wide = (partnerFormData?.length ?? 0) > 1 && section !== 1;

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={title}
      size={wide ? "5xl" : ""}
      dismissible={!countryLoading}
    >
      {section === 1 && (
        <DynamicForm
          formInfo={formInfo}
          defaultValues={defaultValues}
          formSchema={countrySchema}
          onFormSubmit={submitCountry}
          className={"gap-4"}
        >
          <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
            <Button
              type="submit"
              color="primary"
              isProcessing={countryLoading}
              disabled={countryLoading}
              processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
            >
              {!countryLoading && (isEdit ? "Update" : "Create")}
            </Button>
          </div>
        </DynamicForm>
      )}

      {section === 2 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={partnerFormData}
            onEachSubmit={submitPartnerFormField}
            onEachDelete={handlePartnerFieldDelete}
            onFormSubmit={submitPartnerForm}
            onFormDelete={handlePartnerFormDelete}
            formState={partnerFormState}
            wide={wide}
            disallowPerson
          />
          <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
            <Button color="primary" onClick={() => setSection(section + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {section === 3 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={onboardFormData}
            onEachSubmit={submitOnboardFormField}
            onEachDelete={handleOnboardFieldDelete}
            onFormSubmit={submitOnboardForm}
            onFormDelete={handleOnboardFormDelete}
            formState={onboardFormState}
            wide={wide}
            disallowPerson
          />
          <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
            <Button color="primary" onClick={resetDialog}>
              Done
            </Button>
          </div>
        </div>
      )}
    </DialogWrapper>
  );
};

export default CountryForm;

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
