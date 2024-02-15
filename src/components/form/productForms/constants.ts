import * as z from "zod";

export const section1FormInfo = [
  {
    name: "name",
    label: "Enter product name",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter product name",
    },
  },
  {
    name: "description",
    label: "Enter product description",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter product description",
    },
  },
  {
    name: "name",
    label: "Select operational country",
    selectOptions: ["NGA", "US"],
    type: "select",
    labelProp: {
      className: "font-normal",
    },
    selectProp: {
      placeholder: "Select operational country",
    },
  },
  {
    name: "name",
    label: "Select currency",
    selectOptions: ["NGN", "USD"],
    type: "select",
    labelProp: {
      className: "font-normal",
    },
    selectProp: {
      placeholder: "Select currency",
    },
  },
  {
    name: "name",
    label: "Enter product amount",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter product amount",
    },
  },
  {
    name: "name",
    label: "Enter processing timeline",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter processing timeline",
    },
  },
];

export const serviceInfoSchema = z.object({
  name: z.string().min(3, "Service name should be at least 3 characters"),
  description: z
    .string({ required_error: "Provide service description" })
    .min(20, "Kindly provide more information"),
});

export type serviceInfoType = z.infer<typeof serviceInfoSchema>;
