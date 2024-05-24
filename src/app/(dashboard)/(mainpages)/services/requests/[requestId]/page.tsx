"use client";

import TableDetails from "@/components/tables/details/details";
import {
  useGetRequestFormQuery,
  useGetRequestBusinessQuery,
} from "@/services/request";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = ({ params }: { params: { requestId: string } }) => {
  const { requestId } = params;

  const searchParams = useSearchParams();
  const basePath = searchParams.get("basePath") || "";

  const requestQARes = useGetRequestFormQuery(requestId);
  const requestQA = requestQARes.data?.data?.data || [];

  const businessDetailsRes = useGetRequestBusinessQuery({
    requestId: requestId,
  });
  const businessDetails = businessDetailsRes.data?.data?.data?.[0];

  return (
    <div className="py-6">
      <TableDetails
        QAForms={requestQA}
        isLoading={requestQARes.isLoading}
        business={businessDetails}
        prev={{
          path: basePath !== "home" ? "/" + basePath : "/",
          text: basePath,
        }}
      />
    </div>
  );
};

export default Page;
