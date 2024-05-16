import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import RequestDetails from "./requestDetails";

const PreviewDetails = ({
  selectedRequestId,
  setPreview,
}: {
  selectedRequestId: string;
  setPreview: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const { deleteQueryStrings } = useGlobalFunctions();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col gap-6 bg-background min-h-[max(500px,100%)] max-h-[700px] max-w-[50%] overflow-auto rounded-lg p-4 pt-0"
      tabIndex={0}
      onBlur={() => deleteQueryStrings(["preview"])}
    >
      <div className="flex flex-row justify-end gap-6 sticky top-0 bg-background py-4">
        <Button
          size="fit"
          color="transparent"
          className="text-primary"
          onClick={() => router.push(`/services/requests/${selectedRequestId}`)}
        >
          expand
        </Button>
        <Button
          size="fit"
          color="transparent"
          className="text-destructive-foreground"
          onClick={() => setPreview("")}
        >
          close
        </Button>
      </div>
      <RequestDetails requestId={selectedRequestId} previewMode />
    </div>
  );
};

export default PreviewDetails;
