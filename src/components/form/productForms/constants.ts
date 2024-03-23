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
  feature: z
    .string({ required_error: "Enter at least one feature" })
    .array()
    .refine(
      (feature) => {
        return feature.length >= 4;
      },
      { message: "Enter at least 4 feature" }
    ),
  recurringInterval: z
    .string({ required_error: "Select recurring interval" })
    .min(1, "Select recurring interval"),
  otherExpectedRequest: z.string().array(),
});

export type productInfoType = z.infer<typeof productInfoSchema>;
