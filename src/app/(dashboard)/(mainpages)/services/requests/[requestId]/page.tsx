import RequestDetails from "@/components/features/services/details/requestDetails";
import React from "react";

const page = ({ params }: { params: { requestId: string } }) => {
  const { requestId } = params;

  return (
    <div className="py-6">
      <RequestDetails requestId={requestId} />
    </div>
  );
};

export default page;
