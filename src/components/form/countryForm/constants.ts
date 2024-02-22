import * as z from "zod";

export const countrySchema = z.object({
  name: z.string().min(3, "Select country"),
  capital: z
    .string({ required_error: "Enter country capital" })
    .min(1, "Enter country capital"),
  language: z
    .string({ required_error: "Enter country language" })
    .min(1, "Enter country language"),
  code: z
    .string({ required_error: "Enter country code" })
    .min(3, "Enter country code"),
  currency: z
    .string({ required_error: "Enter country currency" })
    .min(1, "Enter country currency"),
});

export type countryType = z.infer<typeof countrySchema>;
