import { cn } from "@/lib/utils";
import { Button, TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import React, {
  ChangeEventHandler,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  SVGProps,
} from "react";

interface propTypes {
  type?: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  searchText?: string;
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  wrapperClassName?: string;
}

const SearchComp = ({
  type,
  icon,
  placeholder,
  onChange = () => {},
  searchText,
  onSubmit,
  buttonProps,
  wrapperClassName,
}: propTypes) => {
  return (
    <div
      className={cn(
        "hidden w-full max-w-[364px] h-max md:flex",
        wrapperClassName
      )}
    >
      <TextInput
        type={type || "text"}
        icon={icon ? icon : () => <Search color="#727474" />}
        placeholder={"Search..." || placeholder}
        onChange={onChange}
        className={cn("w-full", {
          "[&_input]:rounded-r-none": onSubmit,
        })}
        theme={{ field: { input: { base: "!py-2 w-full" } } }}
      />
      {onSubmit && (
        <Button
          size="md"
          onClick={onSubmit}
          className={cn("text-sm font-medium bg-primary h-max", {
            "rounded-l-none": onSubmit,
          })}
          {...buttonProps}
        >
          {"Search" || searchText}
        </Button>
      )}
    </div>
  );
};

export default SearchComp;
