import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface propTypes {
  navRoutes: {
    name: string;
    to: string;
  }[];
  className?: string;
}

const Navigation2 = ({ className, navRoutes }: propTypes) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex gap-2 max-w-full overflow-auto p-1 md:gap-4",
        className
      )}
    >
      {navRoutes.map((el, i) => {
        let isActive = i === 0 ? el.to === pathname : pathname.includes(el.to);

        return (
          <div key={i}>
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
          </div>
        );
      })}
    </div>
  );
};

export default Navigation2;
