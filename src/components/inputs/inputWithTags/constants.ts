import { HTMLAttributes } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface propsType {
  size?: string;
  textInputProp?: HTMLAttributes<HTMLInputElement>;
  maxTag?: number;
  minTagChars: number;
  handleKeyDown: (tags: string[]) => void;
  errors?: {
    empty?: string;
    length?: string;
    exists?: string;
    minTagChars?: string;
  };
  submitErr?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  defaultTags?: string[];
  disabled?: boolean;
}

export const tagColors = [
  {
    text: "hsl(300,100%,41%)",
    bg: "bg-[hsl(300,100%,91%)]",
  },
  {
    text: "hsl(250, 100%, 41%)",
    bg: "bg-[hsl(250,100%,91%)]",
  },
  {
    text: "hsl(200, 100%, 41%)",
    bg: "bg-[hsl(200,100%,91%)]",
  },
  {
    text: "hsl(150, 100%, 41%)",
    bg: "bg-[hsl(150,100%,91%)]",
  },
  {
    text: "hsl(100, 100%, 41%)",
    bg: "bg-[hsl(100,100%,91%)]",
  },
  {
    text: "hsl(50, 100%, 41%)",
    bg: "bg-[hsl(50,100%,91%)]",
  },
];
