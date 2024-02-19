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
    name: "country",
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
    name: "currency",
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
    name: "amount",
    label: "Enter product amount",
    type: "number",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter product amount",
    },
  },
  {
    name: "timeline",
    label: "Enter processing timeline",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter processing timeline",
    },
  },
  {
    name: "feature",
    label: "Enter product features",
    type: "tagInput",
    minTagChars: 3,
    maxTag: 4,
    errors: {
      empty: "Enter feature",
      exists: "Feature already exists",
      minTagChars: "Feature must be at least three characters",
      length: "Features cannot be more than 4",
    },
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter product features",
    },
  },
];

export const productInfoSchema = z.object({
  name: z.string().min(3, "Product name should be at least 3 characters"),
  description: z
    .string({ required_error: "Provide product description" })
    .min(20, "Product description should be at least 20 characters"),
  country: z.string().min(1, "Select country"),
  currency: z.string().min(1, "Select currency"),
  amount: z.coerce.number().min(1, "Enter product amount"),
  timeline: z.string().min(1, "Enter product processing timeline"),
  feature: z
    .string({ required_error: "Enter at least one feature" })
    .array()
    .refine(
      (feature) => {
        return feature.length >= 4;
      },
      { message: "Enter at least 4 feature" }
    ),
});

export type productInfoType = z.infer<typeof productInfoSchema>;
