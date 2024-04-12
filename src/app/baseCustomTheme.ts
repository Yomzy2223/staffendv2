import type { ThemeProps } from "flowbite-react";

export const customTheme: ThemeProps = {
  theme: {
    badge: {
      root: {
        base: "flex h-fit items-center gap-1 font-semibold !py-0.5 !px-2.5 !rounded-md",
        color: {
          magenta:
            "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary group-hover:bg-secondary/20 dark:group-hover:bg-secondary/30",
          pink: "bg-[#d400cc14] text-[#D400CC]",
        },
      },
    },
    tabs: {
      tablist: {
        base: "flex",
        tabitem: {
          base: "flex items-center justify-center p-2 rounded-t-lg text-sm font-medium transition transition-all first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 ",
          styles: {
            default: {
              base: "rounded-t-lg",
              active: {
                on: "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary",
                off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
              },
            },
            underline: {
              base: "rounded-t-lg",
              active: {
                on: "text-primary rounded-t-lg border-b-2 border-primary active dark:text-primary dark:border-primary",
                off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
              },
            },
            fullWidth: {
              base: "p-4",
              active: {
                on: "text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
                off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
              },
            },
          },
        },
      },
    },
    button: {
      base: "w-max h-max focus:!ring-0 hover:opacity-80 active:opacity-90 transition transition-all text-sm",
      color: {
        primary:
          "bg-primary text-primary-foreground border border-transparent enabled:hover:bg-primary-dark",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent enabled:hover:bg-secondary-dark",
        ghost: "bg-transparent text-foreground",
      },
      outline: {
        color: {
          default: "border border-input",
          white: "border border-white enabled:hover:bg-foreground/10",
          primary:
            "border border-primary !text-primary bg-transparent enabled:hover:bg-primary-dark",
          magenta:
            "border border-secondary bg-transparent enabled:hover:bg-secondary-dark",
        },
        on: "flex justify-center bg-white text-foreground transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
      },
      size: {
        fit: "p-0 h-max w-max !p-0",
      },
      inner: {
        base: "flex justify-center items-center gap-2 !px-4 !py-2",
      },
      spinnerSlot: "h-max",
      disabled:
        "cursor-not-allowed opacity-50 hover:opacity-50 active:opacity-50",
    },
    textInput: {
      field: {
        input: {
          base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 outline-primary",
        },
      },
    },
    textarea: {
      base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm outline-primary",
      colors: {
        primary:
          "border-border text-foreground placeholder-cyan-700 focus:border-primary focus:ring-primary dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-primary dark:focus:ring-primary",
      },
    },
    checkbox: {
      root: {
        base: "h-4 w-4 rounded focus:ring-offset-0 focus:ring-1 appearance-none bg-muted border-none rounded  bg-white ring-1 ring-border checked:bg-primary checked:ring-primary disabled:opacity-70",
        color: {},
      },
    },
    progress: {
      color: {
        primary: "bg-primary",
      },
    },
    radio: {
      root: {
        base: "h-4 w-4 appearance-none bg-muted border-none rounded-full ring-border ring-0 ring-offset-0 checked:bg-primary checked:ring-primary focus:ring-0 focus:ring-offset-0",
      },
    },
  },
};
