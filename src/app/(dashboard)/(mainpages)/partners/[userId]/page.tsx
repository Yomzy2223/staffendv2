"use client";

import ConfirmAction from "@/components/confirmAction";
import TableDetails from "@/components/tables/details/details";
import {
  useActivatePartnerMutation,
  useDeactivatePartnerMutation,
  useDeclinePartnerMutation,
  useGetPartnerFormQAQuery,
} from "@/services/partner";
import { useGetUserQuery } from "@/services/user";
import { Button } from "flowbite-react";
import React, { useState } from "react";

const Page = ({ params }: { params: { userId: string } }) => {
  const [openActivate, setOpenActivate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

  const userId = params.userId;

  const activatePartner = useActivatePartnerMutation();
  const deactivatePartner = useDeactivatePartnerMutation();
  const declinePartner = useDeclinePartnerMutation();

  const partnerFormQARes = useGetPartnerFormQAQuery(userId);
  const partnerFormQA = partnerFormQARes.data?.data?.data || [];

  const partnerRes = useGetUserQuery(userId);
  const partner = partnerRes.data?.data?.data;

  return (
    <div className="flex flex-col gap-6 py-6">
      <TableDetails
        QAForms={partnerFormQA}
        isLoading={partnerFormQARes.isLoading}
        partner={partner}
        errorMsg={partnerFormQARes.error?.message}
      />
      <div className="flex items-center justify-end gap-6">
        {partner?.partnerStatus === "SUBMITTED" && (
          <Button
            size="fit"
            color="transparent"
            disabled={declinePartner.isPending}
            onClick={() => setOpenDecline(true)}
            className="text-destructive-foreground"
          >
            Decline
          </Button>
        )}
        {(partner?.partnerStatus === "SUBMITTED" ||
          partner?.partnerStatus === "DECLINED" ||
          partner?.partnerStatus === "DEACTIVATED") && (
          <Button
            size="lg"
            color="primary"
            disabled={activatePartner.isPending}
            onClick={() => setOpenActivate(true)}
          >
            Activate
          </Button>
        )}
        {partner?.partnerStatus === "ACTIVE" && (
          <Button
            size="fit"
            color="transparent"
            disabled={deactivatePartner.isPending}
            onClick={() => setOpenActivate(true)}
            className="text-destructive-foreground"
          >
            Deactivate
          </Button>
        )}
      </div>

      {openActivate && (
        <ConfirmAction
          open={openActivate}
          setOpen={setOpenActivate}
          confirmAction={() =>
            activatePartner.mutate(userId, {
              onSuccess: () => setOpenActivate(false),
            })
          }
          title="Activate Partner"
          description="Are you sure you want to activate this partner? Partner will be notified."
          isLoading={activatePartner.isPending}
          dismissible={!activatePartner.isPending}
          isDelete
        />
      )}

      {openDeactivate && (
        <ConfirmAction
          open={openDeactivate}
          setOpen={setOpenDeactivate}
          confirmAction={() =>
            deactivatePartner.mutate(userId, {
              onSuccess: () => setOpenDeactivate(false),
            })
          }
          title="Deactivate Partner"
          description="Are you sure you want to deactivate this partner? Partner will be notified."
          isLoading={deactivatePartner.isPending}
          dismissible={!deactivatePartner.isPending}
          isDelete
        />
      )}

      {setOpenDecline && (
        <ConfirmAction
          open={openDecline}
          setOpen={setOpenDecline}
          confirmAction={() =>
            declinePartner.mutate(userId, {
              onSuccess: () => setOpenDecline(false),
            })
          }
          title="Decline Partner"
          description="Are you sure you want to decline? Partner will be notified."
          isLoading={declinePartner.isPending}
          dismissible={!declinePartner.isPending}
          isDelete
        />
      )}
    </div>
  );
};

export default Page;
