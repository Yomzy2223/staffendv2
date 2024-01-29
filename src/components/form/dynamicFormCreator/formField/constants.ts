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
    type: "Address",
    icon: MapPin,
    title: "Enter company address",
  },
  {
    type: "Checkbox",
    icon: CheckSquare,
  },
  {
    type: "Countries",
    icon: FlagIcon,
    title: "Select operational country",
  },
  {
    type: "Document template",
    icon: File,
  },
  {
    type: "Document upload",
    icon: File,
  },
  {
    type: "Dropdown",
    icon: ChevronDown,
  },
  {
    type: "Email address",
    icon: Mail,
  },
  {
    type: "Paragraph",
    icon: FormInput,
  },
  {
    type: "Phone number",
    icon: PhoneOutgoing,
    title: "Enter your business phone number",
  },
  {
    type: "Promocode",
    icon: Gem,
    title: "Enter your promo code",
  },
  {
    type: "Multiple choice",
    icon: CircleDot,
  },
  {
    type: "Short answer",
    icon: FormInput,
  },
  {
    type: "Person",
    icon: User,
    options: [
      {
        type: "Short answer",
        title: "Enter your first name",
      },
      {
        type: "Short answer",
        title: "Enter your last name",
      },
      {
        type: "Email address",
        title: "Enter your email address",
      },
      {
        type: "Phone number",
        title: "Enter your phone number",
      },
    ],
  },
];
