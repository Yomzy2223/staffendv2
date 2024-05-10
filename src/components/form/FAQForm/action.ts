import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useCreateFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "@/services/faq";
import { useGetServiceProductsQuery } from "@/services/product";
import { TRequestState } from "@/services/request/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDynamicFormField } from "../dynamicForm/constants";
import { FormType } from "./constants";

export const useActions = ({
  setOpen,
  serviceId,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  serviceId: string;
}) => {
  const { deleteQueryStrings } = useGlobalFunctions();

  const searchParams = useSearchParams();
  const FAQId = searchParams.get("faqId") || "";
  const productId = searchParams.get("productId") || "";

  const createFAQMutation = useCreateFAQMutation();
  const updateFAQMutation = useUpdateFAQMutation();
  const FAQRes = useGetFAQQuery(FAQId);
  const FAQ = FAQRes.data?.data?.data;

  const productsRes = useGetServiceProductsQuery(serviceId);
  const products = productsRes.data?.data?.data;
  const productsNames = products?.map((el) => el.name) || [];

  const submitFAQ = (formInfo: FormType) => {
    const productId =
      products?.find((el) => el.name === formInfo.product)?.id || "";
    const payload = {
      serviceId,
      productId,
      requestState: formInfo.requestState.toUpperCase() as TRequestState,
      question: formInfo.question,
      answer: formInfo.answer,
    };

    if (FAQId) {
      updateFAQMutation.mutate(
        { formInfo: payload, id: FAQId },
        {
          onSuccess: () => {
            resetDialog();
            console.log("Faq updated successfully");
          },
        }
      );
      return;
    }
    createFAQMutation.mutate(payload, {
      onSuccess: () => {
        resetDialog();
        console.log("Faq created successfully");
      },
    });
  };

  const formInfo: IDynamicFormField[] = [
    {
      name: "product",
      type: "select",
      label: "Product",
      placeholder: "Select product",
      selectOptions: productsNames,
      optionsLoading: productsRes.isLoading,
      optionsErrorMsg: productsRes.error?.message,
    },
    {
      name: "question",
      type: "text",
      label: "Question",
      textInputProp: {
        placeholder: "Enter question",
      },
    },
    {
      name: "answer",
      type: "text",
      label: "Answer",
      textInputProp: {
        placeholder: "Enter answer",
      },
    },
    {
      name: "requestState",
      fieldName: "request state",
      type: "select",
      label: "Request state",
      placeholder: "Select request state",
      selectOptions: ["PRODUCTINFO", "SERVICEFORM", "PAYMENT", "PRODUCTFORM"],
    },
  ];

  const defaultValues: FormType = {
    product: products?.find((el) => el.id === productId)?.name || "",
    question: FAQ?.question || "",
    answer: FAQ?.answer || "",
    requestState: FAQ?.requestState || "",
  };

  const resetDialog = () => {
    setOpen(false);
    deleteQueryStrings(["faqId", "productId"]);
  };

  const isPending = createFAQMutation.isPending || updateFAQMutation.isPending;

  return { submitFAQ, FAQRes, isPending, formInfo, defaultValues, resetDialog };
};
