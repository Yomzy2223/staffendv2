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
  },
  {
    type: "checkbox",
    icon: CheckSquare,
  },
  {
    type: "countries",
    icon: FlagIcon,
    question: "Select operational country",
  },
  {
    type: "document template",
    icon: File,
  },
  {
    type: "document upload",
    icon: File,
  },
  {
    type: "dropdown",
    icon: ChevronDown,
  },
  {
    type: "email address",
    icon: Mail,
  },
  {
    type: "paragraph",
    icon: FormInput,
  },
  {
    type: "phone number",
    icon: PhoneOutgoing,
    question: "Enter your business phone number",
  },
  {
    type: "promocode",
    icon: Gem,
    question: "Enter your promo code",
  },
  {
    type: "multiple choice",
    icon: CircleDot,
  },
  {
    type: "short answer",
    icon: FormInput,
  },
  {
    type: "form",
    icon: User,
    options: [],
  },
  {
    type: "person",
    icon: User,
    options: [
      {
        type: "short answer",
        title: "Enter your first name",
      },
      {
        type: "short answer",
        title: "Enter your last name",
      },
      {
        type: "email address",
        title: "Enter your email address",
      },
      {
        type: "phone number",
        title: "Enter your phone number",
      },
    ],
  },
];

export const formOptions: FormType[] = [
  {
    type: "form",
    title: "Title",
    compulsory: true,
    description: "Description",
  },
];
