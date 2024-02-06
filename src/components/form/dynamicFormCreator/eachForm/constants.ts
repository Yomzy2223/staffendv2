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

export interface FieldType {
  type: string;
  title?: string;
  icon?: LucideIcon;
  compulsory?: boolean;
  options?: any[];
}

export const fieldTypes: FieldType[] = [
  {
    type: "address",
    icon: MapPin,
    title: "Enter company address",
  },
  {
    type: "checkbox",
    icon: CheckSquare,
  },
  {
    type: "countries",
    icon: FlagIcon,
    title: "Select operational country",
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
    title: "Enter your business phone number",
  },
  {
    type: "promocode",
    icon: Gem,
    title: "Enter your promo code",
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

export const formFieldTypes: FieldType[] = [
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
