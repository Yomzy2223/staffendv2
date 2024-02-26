"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import { Button } from "flowbite-react";
import { DownloadIcon, PenIcon } from "lucide-react";
import fileDownload from "js-file-download";

export const FileInput = ({
  name,
  onFileChange,
}: {
  name?: string;
  onFileChange: (file: File) => void;
}) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    onFileChange(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: !!file,
    noKeyboard: !!file,
    accept: {
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  const fileExtension = file?.name.split(".").pop();

  let fileSize: string | number = Math.ceil(file?.size ? file?.size / 1000 : 0);
  if (fileSize >= 1000) fileSize = (fileSize / 1000).toFixed(2) + "MB";
  else fileSize = fileSize + "KB";

  return (
    <div>
      <p className="text-sm font-medium leading-normal">{name}</p>
      <div
        {...getRootProps({})}
        className={cn(
          "bg-gray-50 px-8 py-4 cursor-pointer rounded-lg border-2 border-gray-200 border-dashed flex flex-col gap-2 items-center justify-center",
          {
            "border-solid cursor-default p-2": file,
          }
        )}
      >
        <input {...getInputProps({})} />
        {!file ? (
          <>
            <Upload />
            {isDragActive ? (
              <p className="text-gray-500 text-sm leading-normal">
                Drop the files here ...
              </p>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm leading-normal">
                  Drag files here to upload
                </p>
                <p className="underline text-xs leading-normal text-primary">
                  or browse for files
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4">
                <FileIcon
                  extension={fileExtension}
                  {...defaultStyles[fileExtension as DefaultExtensionType]}
                  glyphColor={`${fileExtension === "pdf" && "red"}`}
                />
              </div>
              <div>
                <p className="text-sm underline">{file.name}</p>
                <p className="text-xs">{fileSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button color="link" size="fit" onClick={open}>
                <PenIcon size={18} />
              </Button>
              <Button
                color="link"
                size="fit"
                onClick={() => fileDownload(file, file.name)}
              >
                <DownloadIcon size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
