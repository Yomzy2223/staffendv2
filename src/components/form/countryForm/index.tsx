import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import { Oval } from "react-loading-icons";
import DynamicForm from "../dynamicForm";
import { useCountryActions } from "./actions";
import { countrySchema } from "./constants";

const CountryForm = ({ open, setOpen }: IProps) => {
  const { deleteQueryString } = useGlobalFunctions();

  const {
    formInfo,
    isEdit,
    countryInfo,
    submitCountry,
    countryLoading,
    countrySuccess,
    defaultValues,
  } = useCountryActions({ setOpen });

  const title = (isEdit ? "Update " : "Add ") + "Country";

  const resetDialog = () => {
    setOpen(false);
    deleteQueryString("countryId");
  };

  console.log(countryLoading);
  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={title}
      size="3xl"
      dismissible={!countryLoading}
    >
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
            {!countryLoading && (isEdit ? "Update" : "Create")}
          </Button>
        </div>
      </DynamicForm>
    </DialogWrapper>
  );
};

export default CountryForm;

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
