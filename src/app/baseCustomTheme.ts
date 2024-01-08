import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    button: {
      base: "w-max focus:!ring-0 hover:opacity-80 active:opacity-90 transition-all",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        magenta:
          "bg-magenta text-magenta-foreground border border-transparent enabled:hover:bg-magenta-dark",
        ghost: "bg-transparent text-foreground",
      },
      outline: {
        on: "bg-yellow-300",
        color: {
          white: "border border-white enabled:hover:bg-foreground/10",
          primary:
            "border border-primary bg-transparent enabled:hover:bg-primary-dark",
          magenta:
            "border border-magenta bg-transparent enabled:hover:bg-magenta-dark",
        },
      },
      size: {
        fit: "p-0 h-max w-max",
      },
      inner: {
        base: "flex justify-center items-center gap-2",
      },
    },
  },
};
