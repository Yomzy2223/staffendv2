import ConfirmAction from "@/components/confirmAction";
import { FileInput } from "@/components/file/fileInput";
import { useApproveUserDocMutation, useGetUserRequestDocQuery } from "@/services/users";
import { TUserDocGet } from "@/services/users/types";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Oval } from "react-loading-icons";

const DocSection = ({
  requestId,
  requestDocs,
}: {
  requestId: string;
  requestDocs: TUserDocGet[];
}) => {
  const [confirmApprove, setConfirmApprove] = useState(false);

  const approveUserDocuments = useApproveUserDocMutation();

  return (
    <>
      <div className="flex flex-col justify-end gap-8">
        <div className="flex flex-col gap-4">
          {requestDocs.map((file, i) => (
            <FileInput
              key={i}
              fileLink={file.link}
              fileName={file.name}
              fileSize={file.size}
              fileType={file.type}
              editMode={false}
              approved={file.isApproved}
            />
          ))}
        </div>
        {requestDocs?.length > 0 && requestDocs.some((el) => !el.isApproved) && (
          <Button
            color="primary"
            className="self-end"
            isProcessing={approveUserDocuments.isPending}
            disabled={approveUserDocuments.isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
            onClick={() => setConfirmApprove(true)}
          >
            Approve Documents
          </Button>
        )}
      </div>

      {confirmApprove && (
        <ConfirmAction
          open={confirmApprove}
          setOpen={setConfirmApprove}
          confirmAction={async () => {
            await Promise.all(
              requestDocs.map((doc) => {
                approveUserDocuments.mutate(doc.id);
              })
            );
            setConfirmApprove(false);
          }}
          title="Approve Documents"
          description="Are you sure you want to approve these documents? Client will be notified, and will now see them on his dashboard"
          isLoading={approveUserDocuments.isPending}
          dismissible={!approveUserDocuments.isPending}
        />
      )}
    </>
  );
};

export default DocSection;
