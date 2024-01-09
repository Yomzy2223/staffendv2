import { cn } from "@/lib/utils";
import { Button, Card } from "flowbite-react";
import { BriefcaseIcon, LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { ReactNode } from "react";

const RequestDetailsSectionWrapper = ({
  children,
  title,
  icon,
  raiseIssueAction,
  className,
}: {
  children: ReactNode;
  title: string;
  raiseIssueAction: Function;
  icon: any;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="flex flex-1 gap-2 min-h-full sm:max-w-[360px] rounded">
        <div className="hidden bg-card/25 p-3 rounded h-max sm:block">
          {icon}
        </div>
        <div className="bg-card/25 flex flex-row justify-between gap-6 p-4 rounded w-full sm:flex-col">
          <p className="sb-text-16 font-semibold uppercase">{title}</p>
          <Button
            color="ghost"
            size="fit"
            className="sb-text-16 font-normal underline text-primary"
          >
            Raise an issue
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex-1 rounded border border-border p-4 w-full max-w-[542px] overflow-auto shadow-none",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default RequestDetailsSectionWrapper;
