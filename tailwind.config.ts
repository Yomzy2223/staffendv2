import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          3: "hsl(var(--foreground-3))",
          4: "hsl(var(--foreground-4))",
          5: "hsl(var(--foreground-5))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          dark: "hsl(var(--sb-yellow-dark))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          2: "hsla(var(--card-2))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        label: {
          DEFAULT: "hsl(var(--label))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        magenta: {
          DEFAULT: "hsl(var(--magenta))",
          foreground: "hsl(var(--magenta-foreground))",
          dark: "hsl(var(--magenta-dark))",
          light: "hsla(var(--magenta-light))",
        },
        sb: {
          "blue-light": "hsl(var(--sb-blue-light))",
        },

        // sb: {
        // 	cyan: "hsl(var(--sb-cyan)",
        // 	yellow:  "hsl(var(--sb-cyan)",
        // 	yellowdark:  "hsl(var(--sb-yellow-dark)",
        // },
      },
      backgroundImage: {
        authPattern: "url(../assets/svg/auth_pattern.svg)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
