import { cn } from "@/lib/utils";
import React, { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

const CardWrapper = ({
  children,
  big,
  className,
  onClick,
}: {
  children: ReactNode;
  big?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      tabIndex={0}
      className={cn(
        "bg-background rounded-lg p-4 shadow-md",
        {
          "p-4 lg:p-6": big,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
