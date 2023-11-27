"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, Select } from "flowbite-react";
import { usePathname } from "next/navigation";

interface propTypes {
  navRoutes: {
    name: string;
    to: string;
    type?: string;
    options?: (string | number)[];
  }[];
  className?: string;
}

export const Navigation = ({ navRoutes, className }: propTypes) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex gap-2 max-w-full overflow-auto p-1 md:gap-4",
        className
      )}
    >
      {navRoutes.map((el, i) => {
        const isActive =
          i === 0 ? el.to === pathname : pathname.includes(el.to);

        return (
          <div key={i}>
            {el?.type === "select" && el?.options ? (
              <Select
                id="countries"
                className={cn(
                  "[&_select]:!bg-transparent [&_select]:border-none rounded-lg min-w-max whitespace-nowrap",
                  {
                    "bg-primary [&_select]:text-primary-foreground": isActive,
                  }
                )}
                onSelect={(el) => console.log(el)}
                required
              >
                {el.options.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </Select>
            ) : (
              <Link href={el.to}>
                <Button
                  color="ghost"
                  className={cn("text-foreground-3 whitespace-nowrap", {
                    "bg-primary text-primary-foreground": isActive,
                  })}
                >
                  {el.name}
                </Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
