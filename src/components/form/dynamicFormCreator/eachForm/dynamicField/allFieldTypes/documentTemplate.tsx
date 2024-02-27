import { FileInput } from "@/components/file/fileInput";
import { Progress } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { fieldReturnType } from "../actions";

const DocumentTemplate = ({
  info,
  setValue,
  edit,
  error,
  uploadProgress,
  loading,
  setHasSelectedFile,
}: IProps) => {
  const handleFileChange = (file: File) => {
    setHasSelectedFile(true);
    setValue("documentTemp", file);
  };

  const editMode =
    edit && !loading && (!uploadProgress || uploadProgress === 100);
  const fileName = info?.fileName ? info?.fileName + "." + info?.fileType : "";

  return (
    <div id="fileUpload" className="max-w-md">
      <FileInput
        onFileChange={handleFileChange}
        editMode={editMode}
        fileName={fileName}
        fileLink={info?.fileLink}
        fileType={info?.fileType}
      />
      {uploadProgress && uploadProgress !== 100 ? (
        <Progress
          progress={uploadProgress}
          textLabel="uploading..."
          color="primary"
          size="md"
          labelProgress
          labelText
          className="text-[10px] mt-1"
        />
      ) : (
        ""
      )}
      <p className="text-sm text-destructive-foreground mt-1">
        {error?.message}
      </p>
    </div>
  );
};

export default DocumentTemplate;

interface IProps {
  setValue: UseFormSetValue<{ [x: string]: any }>;
  edit: boolean;
  error: any;
  uploadProgress: number;
  loading: boolean;
  info: fieldReturnType;
  setHasSelectedFile: Dispatch<SetStateAction<boolean>>;
}
