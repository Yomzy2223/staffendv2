import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { Button } from "flowbite-react";
import React from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";
import { useCountryActions } from "./actions";
import { countrySchema } from "./constants";

const CountryForm = ({ open, setOpen }: IProps) => {
  const {
    formInfo,
    isEdit,
    countryInfo,
    submitCountry,
    countryLoading,
    countrySuccess,
    defaultValues,
  } = useCountryActions();

  const title = (isEdit ? "Update " : "Add ") + "Country";

  return (
    <DialogWrapper open={open} setOpen={setOpen} title={title} size="3xl">
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
            processingSpinner={
              <Oval color="white" strokeWidth={4} className="h-5 w-5" />
            }
          >
            {!countryLoading && "Done"}
          </Button>
        </div>
      </DynamicForm>
    </DialogWrapper>
  );
};

export default CountryForm;

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
