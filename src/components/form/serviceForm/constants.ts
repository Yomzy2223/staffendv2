import * as z from "zod";

export const section1FormInfo = [
  {
    name: "name",
    label: "Enter service name",
    type: "text",
    labelProp: {
      className: "font-normal",
    },
    textInputProp: {
      placeholder: "Enter service name",
    },
  },
  {
    name: "description",
    label: "Enter service description",
    type: "textarea",
    labelProp: {
      className: "font-normal",
    },
    textAreaProp: {
      placeholder: "Enter a brief description of this service",
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
