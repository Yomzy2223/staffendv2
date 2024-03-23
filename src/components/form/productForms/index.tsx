import React, { useState } from "react";
import DynamicForm from "../dynamicForm";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import DynamicFormCreator from "../dynamicFormCreator";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Oval } from "react-loading-icons";
import {
  useProductFormActions,
  useProductInfoActions,
  useSectionInfo,
} from "./actions";
import { productInfoSchema } from "./constants";
import ExpectedProducts from "./expectedProducts";

const ProductForm = ({ open, setOpen }: IProps) => {
  const [section, setSection] = useState(1);
  const { isDesktop, deleteQueryString } = useGlobalFunctions();
  const { section1FormInfo } = useSectionInfo();

  const { title1, productInfo, submitProductInfo, productLoading } =
    useProductInfoActions({ setSection, section });

  const {
    productFormInfo,
    submitProductForm,
    submitProductFormField,
    productFormState,
    handleFieldDelete,
    handleFormDelete,
    submitMultipleFields,
  } = useProductFormActions();

  const productData = productInfo?.data?.data?.data;
  const productFormData = productFormInfo?.data?.data?.data;

  const title2 =
    productFormData?.length > 0 ? "Update Product Form" : "Add Product Form";
  const title = section === 1 ? title1 : title2;

  const handleBack = () => {
    if (section === 1) {
      setOpen(false);
      return;
    }
    setSection(section - 1);
  };

  const resetDialog = () => {
    setOpen(false);
    setSection(1);
    deleteQueryString("action");
    deleteQueryString("productId");
  };

  const wide = productFormData?.length > 1;

  const defaultValues = {
    name: productData?.name || "",
    description: productData?.description || "",
    country: productData?.country || "",
    currency: productData?.currency || "",
    amount: productData?.amount || "",
    timeline: productData?.timeline || "",
    feature: productData?.feature || [],
    recurringInterval: productData?.recurringInterval || "",
    otherExpectedRequest: productData?.otherExpectedRequest || [],
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={title}
      size={section === 1 || wide ? "5xl" : ""}
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
          disableAll={productInfo.isLoading}
          renderOtherFields={(args) => <ExpectedProducts {...args} />}
        >
          {/* <ExpectedProducts /> */}
          <div className="bg-white flex items-center justify-end pt-4 sticky bottom-0">
            <Button
              type="submit"
              color="primary"
              isProcessing={productLoading}
              disabled={productLoading || productInfo.isLoading}
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
            formInfo={productFormData}
            submitMultipleFields={submitMultipleFields}
            onEachSubmit={submitProductFormField}
            onEachDelete={handleFieldDelete}
            onFormSubmit={submitProductForm}
            onFormDelete={handleFormDelete}
            formState={productFormState}
            wide={wide}
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

export default ProductForm;

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
