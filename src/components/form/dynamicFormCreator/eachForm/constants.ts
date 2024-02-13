import {
  CheckSquare,
  ChevronDown,
  CircleDot,
  File,
  FlagIcon,
  FormInput,
  Gem,
  LucideIcon,
  Mail,
  MapPin,
  PhoneOutgoing,
  User,
} from "lucide-react";
import * as z from "zod";

export interface FieldType {
  id?: string;
  type: string;
  question?: string;
  icon?: LucideIcon;
  compulsory?: boolean;
  options?: any[];
  fileName?: string;
  fileDescription?: string;
  fileLink?: string;
  fileType?: string;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Enter title" })
    .min(3, { message: "Must be at least 3 characters" }),
  description: z
    .string({ required_error: "Provide a suitable and precise description" })
    .min(3, { message: "Must be at least 3 characters" }),
  type: z
    .string({ required_error: "Select type" })
    .min(1, { message: "Select type" }),
  compulsory: z.boolean(),
});

export type FormType = z.infer<typeof formSchema> & { id?: string };

export const fieldOptions: FieldType[] = [
  {
    type: "address",
    icon: MapPin,
    question: "Enter company address",
    compulsory: true,
  },
  {
    type: "checkbox",
    icon: CheckSquare,
    options: [""],
    compulsory: true,
  },
  {
    type: "countries",
    icon: FlagIcon,
    question: "Select operational country",
    compulsory: true,
  },
  {
    type: "document template",
    icon: File,
    compulsory: true,
  },
  {
    type: "document upload",
    icon: File,
    compulsory: true,
  },
  {
    type: "dropdown",
    icon: ChevronDown,
    compulsory: true,
  },
  {
    type: "email address",
    icon: Mail,
    compulsory: true,
  },
  {
    type: "paragraph",
    icon: FormInput,
    compulsory: true,
  },
  {
    type: "phone number",
    icon: PhoneOutgoing,
    question: "Enter your business phone number",
    compulsory: true,
  },
  {
    type: "promocode",
    icon: Gem,
    question: "Enter your promo code",
    compulsory: true,
  },
  {
    type: "multiple choice",
    icon: CircleDot,
    compulsory: true,
  },
  {
    type: "short answer",
    icon: FormInput,
    compulsory: true,
  },
  {
    type: "form",
    icon: User,
    options: [],
    compulsory: true,
  },
];

export const formOptions: FormType[] = [
  {
    type: "form",
    title: "Title",
    compulsory: true,
    description: "Here is the form description",
  },
  {
    type: "person",
    title: "Person title",
    compulsory: true,
    description: "Here is the form description",
  },
];
