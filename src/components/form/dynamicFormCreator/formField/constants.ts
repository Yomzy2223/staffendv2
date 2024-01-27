import {
  CheckSquare,
  ChevronDown,
  CircleDot,
  File,
  FlagIcon,
  FormInput,
  Gem,
  LocateIcon,
  LucideIcon,
  MapPin,
  PhoneOutgoing,
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
  },
  {
    type: "Multiple choice",
    icon: CircleDot,
  },
  {
    type: "Short answer",
    icon: FormInput,
  },
];
