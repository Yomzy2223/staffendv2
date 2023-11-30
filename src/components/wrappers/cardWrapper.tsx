import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const CardWrapper = ({
  children,
  big,
  className,
}: {
  children: ReactNode;
  big?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background rounded-lg p-4 shadow-md",
        {
          "p-4 lg:p-6": big,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
