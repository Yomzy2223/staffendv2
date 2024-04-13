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
import { DebounceInput } from "react-debounce-input";

const SearchComp = ({
  type,
  icon,
  placeholder,
  onChange,
  searchText,
  onSubmit,
  buttonProps,
  wrapperClassName,
}: IProps) => {
  const [value, setValue] = useState("");

  const handleSearchSubmit = () => {
    onSubmit && onSubmit(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <div className={cn("flex w-[364px] h-max ", wrapperClassName)}>
      <div className="flex-1 flex items-center relative w-max">
        <Search
          color="#727474"
          className="absolute left-4"
          width={20}
          height={20}
        />
        <DebounceInput
          type={type || "text"}
          minLength={3}
          debounceTimeout={1000}
          onChange={handleChange}
          placeholder={"Search..." || placeholder}
          className="flex-1 pl-11 pr-4 border-r-0 border-border rounded-l-lg text-sm focus:ring-0 focus:border-primary"
        />
      </div>
      {onSubmit && (
        <Button
          size="md"
          color="primary"
          onClick={handleSearchSubmit}
          className={cn("text-sm font-medium h-max", {
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

interface IProps {
  type?: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  onChange?: (value: string) => void;
  searchText?: string;
  onSubmit?: (value: string) => void;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  wrapperClassName?: string;
}
