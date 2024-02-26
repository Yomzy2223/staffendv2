import { FileInput } from "@/components/file/fileInput";
import { Label } from "flowbite-react";
import React from "react";

const DocumentTemplate = () => {
  const handleFile = (file: File) => {
    console.log(file);
  };

  return (
    <div id="fileUpload" className="max-w-md">
      <FileInput onFileChange={handleFile} />
    </div>
  );
};

export default DocumentTemplate;
