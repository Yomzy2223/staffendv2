import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    button: {
      base: "transition transition-all active:scale-95",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        magenta:
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground enabled:hover:bg-foreground/10",
        plain: "bg-transparent text-foreground",
      },
      outline: {
        on: "flex justify-center bg-transparent text-inherit transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
        color: {
          white: "border border-white enabled:hover:bg-foreground/10",
          primary:
            "border border-primary bg-transparent enabled:hover:bg-primary-dark",
          magenta:
            "border border-magenta bg-transparent enabled:hover:bg-magenta-dark",
        },
      },
      size: {
        fit: "p-0 h-max",
      },
    },
  },
};
