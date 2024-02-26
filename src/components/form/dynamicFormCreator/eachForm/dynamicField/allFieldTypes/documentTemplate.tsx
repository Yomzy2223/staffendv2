import { FileInput } from "@/components/file/fileInput";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

const DocumentTemplate = ({ setValue, edit, error }: IProps) => {
  const handleFile = (file: File) => {
    setValue("documentTemp", file);
  };

  return (
    <div id="fileUpload" className="max-w-md">
      <FileInput onFileChange={handleFile} editMode={edit} />
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
}
