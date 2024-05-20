import * as z from "zod";
import { IDynamicFormField } from "../dynamicForm/constants";

export const section1FormInfo: IDynamicFormField[] = [
  {
    name: "name",
    label: "Enter service name",
    type: "text",
    textInputProp: {
      placeholder: "Enter service name",
    },
  },
  {
    name: "label",
    label: "Enter service label",
    type: "text",
    textInputProp: {
      placeholder: "Enter a label for this service",
    },
  },
  {
    name: "priority",
    label: "Enter service priority",
    type: "text",
    textInputProp: {
      placeholder: "E.g 1 (Note: highest priority is given to 1)",
    },
  },
  {
    name: "description",
    label: "Enter service description",
    type: "textarea",
    textAreaProp: {
      placeholder: "Enter a brief description of this service",
    },
  },
];

export const serviceInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Service name should be at least 3 characters")
    .max(30, "Service name should not be more than 30 characters"),
  label: z
    .string({ required_error: "Provide service label" })
    .min(3, "Label should be at least 3 characters")
    .max(30, "Label should not be more than 30 characters"),
  priority: z.coerce
    .number({ required_error: "Provide service priority" })
    .min(1, { message: "Priority should be at least 1" })
    .max(10, { message: "Priority cannot be more than 10" }),
  description: z
    .string({ required_error: "Provide service description" })
    .min(20, "Description should be at least 20 characters")
    .max(100, "Description should not be more than 100 characters"),
});

export type serviceInfoType = z.infer<typeof serviceInfoSchema>;
