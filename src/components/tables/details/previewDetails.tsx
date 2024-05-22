import { TPartnerFormQA } from "@/services/partner/types";
import { TBusinessInfoGet, TRequestForm } from "@/services/request/types";
import { TUser } from "@/services/user/types";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import TableDetails from "./details";

const PreviewDetails = ({
  selectedRequestId,
  QAForms,
  business,
  partner,
  isLoading,
  setPreview,
  detailsUrl,
}: {
  selectedRequestId?: string;
  QAForms: (TPartnerFormQA | TRequestForm)[];
  business?: TBusinessInfoGet;
  partner?: TUser;
  isLoading?: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  detailsUrl: string;
}) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col gap-6 bg-background min-h-[max(500px,100%)] max-h-[600px] max-w-[50%] overflow-auto rounded-lg p-4 pt-0"
    >
      <div className="flex flex-row justify-end gap-6 sticky top-0 bg-background py-4">
        <Button
          size="fit"
          color="transparent"
          className="text-primary"
          onClick={() => router.push(detailsUrl)}
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
      <TableDetails
        QAForms={QAForms}
        business={business}
        partner={partner}
        isLoading={isLoading}
        previewMode
      />
    </div>
  );
};

export default PreviewDetails;
