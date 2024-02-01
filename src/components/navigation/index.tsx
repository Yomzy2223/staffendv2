"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const Navigation = ({ navRoutes, className, inactiveClassName = "" }: propType) => {
  const router = useRouter();
  const pathname = usePathname();

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

        return (
          <div key={i}>
            {el?.type === "select" && el?.options ? (
              <Select>
                <SelectTrigger
                  className={cn(
                    "w-max border-none bg-transparent focus:ring-0 focus:ring-offset-0 px-4 py-2 h-max",
                    {
                      "bg-primary text-white": isActive,
                    }
                  )}
                >
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {el.options.map((each) => (
                    <SelectItem
                      key={each.name}
                      value={each.name}
                      onMouseDown={() => router.push(each.to)}
                      className="border-b border-border py-2"
                    >
                      {each.name}
                    </SelectItem>
                  ))}
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
// <Select
//                 className={cn(
//                   "[&_select]:!bg-transparent [&_select]:border-none rounded-lg min-w-max whitespace-nowrap",
//                   {
//                     "bg-primary [&_select]:text-primary-foreground": isActive,
//                     [inactiveClassName]: !isActive,
//                   }
//                 )}
//                 onChange={(el) => router.push("/" + el.target.value.toLowerCase())}
//               >
// {el.options.map((each) => (
//   <option key={each.name} onMouseDown={() => console.log("You clicked")}>
//     {each.name}
//   </option>
// ))}
//               </Select>
