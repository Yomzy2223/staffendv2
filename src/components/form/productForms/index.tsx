import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import DynamicFormCreator from "../dynamicFormCreator";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { Oval } from "react-loading-icons";
import { useServiceFormActions, useProductInfoActions } from "./actions";
import { section1FormInfo, productInfoSchema } from "./constants";

const ProductForm = ({ open, setOpen }: propsType) => {
  const [section, setSection] = useState(1);
  const { isDesktop } = useGlobalFucntions();

  const {
    isEdit,
    productInfo,
    submitProductInfo,
    productLoading,
    productSuccess,
  } = useProductInfoActions();

  const {
    serviceFormInfo,
    submitServiceForm,
    submitServiceFormField,
    serviceFormState,
  } = useServiceFormActions();

  const title1 = isEdit ? "Update Product" : "Create Product";
  const title2 = isEdit ? "Update Product Form" : "Add Product Form";
  const title = section === 1 ? title1 : title2;

  const serviceData = productInfo?.data?.data?.data;
  const serviceFormData = serviceFormInfo?.data?.data?.data;

  useEffect(() => {
    if (productSuccess) setSection(section + 1);
  }, [productSuccess]);

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  const wide = serviceFormData?.length > 1;

  const defaultValues = {
    name: serviceData?.name || "",
    description: serviceData?.description || "",
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        setOpen(open);
      }}
      title={title}
      size="5xl"
    >
      {section === 1 && (
        <DynamicForm
          formInfo={section1FormInfo}
          defaultValues={defaultValues}
          formSchema={productInfoSchema}
          onFormSubmit={submitProductInfo}
          className={cn("gap-4", {
            "grid grid-cols-2 gap-x-5": isDesktop,
          })}
        >
          <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
            <Button
              type="submit"
              color="primary"
              isProcessing={productLoading}
              disabled={productLoading}
              processingSpinner={
                <Oval color="white" strokeWidth={4} className="h-5 w-5" />
              }
            >
              {!productLoading && "Next"}
            </Button>
          </div>
        </DynamicForm>
      )}

      {section === 2 && (
        <div className="flex flex-col justify-between gap-6 flex-1">
          <DynamicFormCreator
            formInfo={serviceFormData}
            onEachSubmit={submitServiceFormField}
            onFormSubmit={submitServiceForm}
            formState={serviceFormState}
            wide={wide}
          />
          <div className="bg-white flex items-center justify-end gap-4 pt-4 sticky bottom-0">
            <Button color="outline" outline onClick={handleBack}>
              Back
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setOpen(false);
                setSection(1);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </DialogWrapper>
  );
};

export default ProductForm;

interface propsType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
