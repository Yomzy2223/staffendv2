import { cn } from "@/lib/utils";
import { Button, TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import React, {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  SVGProps,
  useState,
} from "react";

const SearchComp = ({
  type,
  icon,
  placeholder,
  onChange = () => {},
  searchText,
  onSubmit,
  buttonProps,
  wrapperClassName,
}: propType) => {
  const [value, setValue] = useState("");

  const handleSearchSubmit = () => {
    onSubmit && onSubmit(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

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
        onChange={handleChange}
        className={cn("w-full", {
          "[&_input]:rounded-r-none": onSubmit,
        })}
        theme={{ field: { input: { base: "!py-2 w-full" } } }}
      />
      {onSubmit && (
        <Button
          size="md"
          onClick={handleSearchSubmit}
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

interface propType {
  type?: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  onChange?: (value: string) => void;
  searchText?: string;
  onSubmit?: (value: string) => void;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  wrapperClassName?: string;
}
