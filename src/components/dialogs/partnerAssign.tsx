import { IUser } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import useUserApi from "@/hooks/useUserApi";
import { Button, Radio } from "flowbite-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Oval } from "react-loading-icons";
import DialogWrapper from "../wrappers/dialogWrapper";

const PartnerAssignDialog = ({
  open,
  setOpen,
  selectedRequests,
  setSelectedRequests,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedRequests: string[];
  setSelectedRequests: Dispatch<SetStateAction<string[]>>;
}) => {
  const [selectedPartnerId, setSelectedPartnerId] = useState("");

  const resetDialog = () => {
    setOpen(false);
  };

  const { assignRequestMutation } = useRequestApi();
  const { getAllUsersQuery } = useUserApi();
  const users = getAllUsersQuery;
  const usersData = users.data?.data?.data;
  const partners = usersData?.filter((el: IUser) => !el.isPartner);

  const handleAssignRequests = () => {
    assignRequestMutation.mutate(
      {
        formInfo: {
          userId: selectedPartnerId,
          requestIds: selectedRequests,
        },
      },
      {
        onSuccess: () => {
          setSelectedRequests([]);
          setOpen(false);
        },
      }
    );
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={(open) => {
        open ? setOpen(open) : resetDialog();
      }}
      title={`Assign selected request(s) to a partner (${selectedRequests.length})`}
    >
      <p className="font-semibold mb-8">
        This partner will be notified to begin the request(s) process
        immediately
      </p>
      <div className="flex flex-col gap-5">
        {partners?.map((el: IUser) => (
          <div key={el.id} className="flex items-center gap-3">
            <Radio
              id={el.id}
              name="partners"
              onChange={() => setSelectedPartnerId(el.id)}
            />
            <label htmlFor={el.id}>
              <p className="sb-text-16 font-medium">
                {el.fullName + " " + `(${el.country})`}
              </p>
              <p className="text-xs text-foreground-5 font-normal">
                {el.email}
              </p>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-4 sticky bottom-0 bg-white pt-5">
        <Button
          size="fit"
          color="ghost"
          className="text-destructive-foreground"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!selectedPartnerId || assignRequestMutation.isPending}
          onClick={handleAssignRequests}
          isProcessing={assignRequestMutation.isPending}
          processingSpinner={
            <Oval color="white" strokeWidth={4} className="h-4 w-4" />
          }
        >
          Assign
        </Button>
      </div>
    </DialogWrapper>
  );
};

export default PartnerAssignDialog;
