import { cn } from "@/lib/utils";
import React from "react";

const Separator = ({ vertical }: { vertical?: boolean }) => {
  return (
    <div
      className={cn("border-border", {
        "h-full border-l-2": vertical,
        "w-full border-b-2": !vertical,
      })}
    />
  );
};

export default Separator;
