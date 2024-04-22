import CardWrapper from "@/components/wrappers/cardWrapper";
import React, { ReactNode } from "react";

const Wrapper = ({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <CardWrapper big className="max-w-[634px] w-full">
      <div>
        <p className="sb-text-24 font-semibold mb-2">{title}</p>
        <p className="hidden text-base text-foreground-5 font-normal lg:flex">
          {description}
        </p>
      </div>
      {children}
    </CardWrapper>
  );
};

export default Wrapper;
