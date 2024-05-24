"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode, useState } from "react";

export const Navigation = ({
  navRoutes,
  className,
  inactiveClassName = "",
  others,
}: IProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const basePath = (searchParams.get("basePath") || "").toLowerCase();

  return (
    <motion.div
      className={cn(
        "flex items-start gap-2 max-w-full p-1 px-5 md:px-8 md:gap-4 overflow-hidden h-20",
        className
      )}
      whileHover={{ overflowX: "auto" }}
    >
      {navRoutes.map((el, i) => {
        let isActive = i === 0 ? el.to === pathname : pathname.includes(el.to);
        isActive =
          el.type === "select" && el.options
            ? el.options.some((each) => pathname.includes(each.to))
            : isActive;

        if (basePath) {
          console.log(el.to);
          if (i === 0)
            basePath === "home" ? (isActive = true) : (isActive = false);
          else
            el.to?.toLowerCase()?.includes(basePath)
              ? (isActive = true)
              : (isActive = false);
        }
        return (
          <div key={i}>
            {el?.type === "select" && el?.options ? (
              <Select open={open} onOpenChange={() => setOpen(!open)}>
                <SelectTrigger
                  className={cn(
                    "w-max border-none bg-transparent focus:ring-0 focus:ring-offset-0 px-4 py-2 h-max capitalize",
                    {
                      "bg-primary text-white": isActive,
                    }
                  )}
                >
                  <SelectValue placeholder={el.defaultValue} />
                </SelectTrigger>
                <SelectContent>
                  {el.options
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((each) => (
                      <SelectItem
                        key={each.name}
                        value={each.name}
                        onMouseDown={() => router.push(each.to)}
                        className="py-2 capitalize"
                      >
                        {each.icon && each.icon}
                        {each.name}
                      </SelectItem>
                    ))}
                  <div
                    onClick={() => setOpen(false)}
                    className="border-t border-border"
                  >
                    {others}
                  </div>
                </SelectContent>
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
    </motion.div>
  );
};

interface IProps {
  navRoutes: {
    name: string;
    to: string;
    type?: string;
    options?: { name: string; to: string; icon?: any }[];
    defaultValue?: string;
  }[];
  className?: string;
  inactiveClassName?: string;
  others?: ReactNode;
}
