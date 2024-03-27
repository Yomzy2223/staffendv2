import * as z from "zod";

export const productInfoSchema = z.object({
  name: z.string().min(3, "Product name should be at least 3 characters"),
  description: z
    .string({ required_error: "Provide product description" })
    .min(20, "Product description should be at least 20 characters"),
  country: z
    .string({ required_error: "Select country" })
    .min(1, "Select country"),
  currency: z
    .string({ required_error: "Select currency" })
    .min(1, "Select currency"),
  amount: z.coerce.number().min(1, "Enter product amount"),
  timeline: z.string().min(1, "Enter product processing timeline"),
  recurringInterval: z.string({ required_error: "Select recurring interval" }),
  otherExpectedRequest: z.string().array(),
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

export const recurringIntervals = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "7 months",
  "8 months",
  "9 months",
  "10 months",
  "11 months",
  "12 months",
  "13 months",
  "14 months",
  "15 months",
  "16 months",
  "17 months",
  "18 months",
  "19 months",
  "20 months",
  "21 months",
  "22 months",
  "23 months",
  "24 months",
];
