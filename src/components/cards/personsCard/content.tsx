import { FileInput } from "@/components/file/fileInput";
import TextWithDetails from "@/components/texts/textWithDetails";
import { cn } from "@/lib/utils";
import React from "react";
import { IPersonCard } from ".";

const Content = ({
  details,
  clicked,
  className,
}: {
  details: IPersonCard[];
  clicked: boolean;
  className?: string;
}) => {
  const fileFields = details?.filter(
    (el) => el.type === "document template" || el.type === "document upload"
  );
  const otherFields = details?.filter(
    (el) => el.type !== "document template" && el.type !== "document upload"
  );

  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {otherFields?.map((el) => (
        <TextWithDetails
          key={el?.field}
          title={el?.field}
          text={typeof el?.value === "string" ? el?.value : ""}
          list={typeof el?.value !== "string" ? el?.value : []}
        />
      ))}
      {fileFields?.map((el) => (
        <div key={el?.field}>
          {el.fileName && el.fileLink && el.fileSize && el.fileType ? (
            <div>
              <p className="text-base font-medium text-foreground-9">
                {el?.field}
              </p>
              <FileInput
                fileName={el.fileName}
                fileLink={el.fileLink}
                fileSize={el.fileSize}
                fileType={el.fileType}
                editMode={false}
              />
            </div>
          ) : (
            <div>
              <p className="text-base font-medium text-foreground-9">
                {el.field}
              </p>
              <p className="text-foreground-5 text-sm italic">
                Document not uploaded yet
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Content;
