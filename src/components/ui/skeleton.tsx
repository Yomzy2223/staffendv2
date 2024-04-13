import { cn } from "@/lib/utils";

interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  invertColor?: boolean;
}

function Skeleton({ className, invertColor, ...props }: propsType) {
  const bgColor = invertColor ? "bg-[#ffffffcc]" : "bg-gray-200";

  return (
    <div
      className={cn("animate-pulse rounded-md", bgColor, className)}
      {...props}
    />
  );
}

export { Skeleton };
