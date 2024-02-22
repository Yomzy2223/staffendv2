import * as z from "zod";

export const countrySchema = z.object({
  name: z.string().min(3, "Select country"),
  iso: z
    .string({ required_error: "Enter country ISO" })
    .min(1, "Enter country ISO"),
  code: z
    .string({ required_error: "Enter country code" })
    .min(3, "Enter country code"),
  currency: z
    .string({ required_error: "Enter country currency" })
    .min(1, "Enter country currency"),
});

export type countryType = z.infer<typeof countrySchema>;
