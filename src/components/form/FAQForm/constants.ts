import { IDynamicFormField } from "../dynamicForm/constants";
import * as z from "zod";

export const formSchema = z.object({
  product: z
    .string({ required_error: "Select a product" })
    .min(3, "Select a product"),
  question: z
    .string({ required_error: "Enter question" })
    .min(3, "Question should be at least 3 characters"),
  answer: z
    .string({ required_error: "Enter answer" })
    .min(3, "Answer should be at least 3 characters"),
  requestState: z
    .string({ required_error: "Select request state" })
    .min(1, "Select request state"),
});

export type FormType = z.infer<typeof formSchema>;
