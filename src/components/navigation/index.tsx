"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, Select } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

interface propType {
  navRoutes: {
    name: string;
    to: string;
    type?: string;
    options?: { name: string; to: string }[];
  }[];
  className?: string;
  inactiveClassName?: string;
}

export const Navigation = ({
  navRoutes,
  className,
  inactiveClassName = "",
}: propType) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex gap-2 max-w-full overflow-auto p-1 px-5 md:px-8 md:gap-4 hide-scrollbar",
        className
      )}
    >
      {navRoutes.map((el, i) => {
        let isActive = i === 0 ? el.to === pathname : pathname.includes(el.to);
        isActive =
          el.type === "select" && el.options
            ? el.options.some((each) => pathname.includes(each.to))
            : isActive;

        return (
          <div key={i}>
            {el?.type === "select" && el?.options ? (
              <Select
                className={cn(
                  "[&_select]:!bg-transparent [&_select]:border-none rounded-lg min-w-max whitespace-nowrap",
                  {
                    "bg-primary [&_select]:text-primary-foreground": isActive,
                    [inactiveClassName]: !isActive,
                  }
                )}
                onChange={(el) =>
                  router.push("/" + el.target.value.toLowerCase())
                }
              >
                {el.options.map((each) => (
                  <option
                    key={each.name}
                    onMouseDown={() => console.log("You clicked")}
                  >
                    {each.name}
                  </option>
                ))}
              </Select>
            ) : (
              <Link href={el.to}>
                <Button
                  color="ghost"
                  className={cn("text-foreground-3 whitespace-nowrap", {
                    "bg-primary text-primary-foreground": isActive,
                    [inactiveClassName]: !isActive,
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
