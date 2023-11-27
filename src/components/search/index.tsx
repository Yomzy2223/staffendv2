import { cn } from "@/lib/utils";
import { Button, TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import React, {
  ChangeEventHandler,
  FunctionComponent,
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
  buttonProps?: Object;
}

const SearchComp = ({
  type,
  icon,
  placeholder,
  onChange,
  searchText,
  onSubmit,
  buttonProps,
}: propTypes) => {
  return (
    <div className="hidden w-full max-w-[364px] md:flex">
      <TextInput
        type={type || "text"}
        icon={icon}
        placeholder={"Search..." || placeholder}
        onChange={onChange}
        className={cn("w-full", {
          "[&_input]:rounded-r-none": onSubmit,
        })}
      />
      {onSubmit && (
        <Button
          onClick={onSubmit}
          className={cn("text-sm font-medium", {
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
