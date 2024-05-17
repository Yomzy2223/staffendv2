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
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {details?.map((el) => (
        <div key={el?.field}>
          {el?.type === "document template" ||
          el?.type === "document upload" ? (
            el.fileName && el.fileLink && el.fileSize && el.fileType ? (
              <FileInput
                fileName={el.fileName}
                fileLink={el.fileLink}
                fileSize={el.fileSize}
                fileType={el.fileType}
              />
            ) : (
              <div>
                <p className="text-base font-semibold text-foreground-9">
                  {el.field}
                </p>
                <p className="text-foreground-5 text-sm italic">
                  Document not uploaded yet
                </p>
              </div>
            )
          ) : (
            <TextWithDetails
              title={el?.field}
              text={typeof el?.value === "string" ? el?.value : ""}
              list={typeof el?.value !== "string" ? el?.value : []}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Content;
