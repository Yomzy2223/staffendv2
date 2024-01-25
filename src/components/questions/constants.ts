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
  PhoneOutgoing,
} from "lucide-react";

export interface QuestionType {
  label: string;
  icon: LucideIcon;
}

export const questionTypes: QuestionType[] = [
  {
    label: "Address",
    icon: LocateIcon,
  },
  {
    label: "Checkbox",
    icon: CheckSquare,
  },
  {
    label: "Countries",
    icon: FlagIcon,
  },
  {
    label: "Document Template",
    icon: File,
  },
  {
    label: "Document Upload",
    icon: File,
  },
  {
    label: "Dropdown",
    icon: ChevronDown,
  },
  {
    label: "Paragraph",
    icon: FormInput,
  },
  {
    label: "Phone Number",
    icon: PhoneOutgoing,
  },
  {
    label: "Promocode",
    icon: Gem,
  },
  {
    label: "Multiple Choice",
    icon: CircleDot,
  },
  {
    label: "Short Answer",
    icon: FormInput,
  },
];
