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

export const BusinessObjectives = [
  "Accommodation, hotels and hospitality",
  "Accounting and tax advisory services",
  "Advertising and market research",
  "Agriculture Activities",
  "Architectural and engineering activities",
  "Artiste management and record label servicesBoutique and sale of clothes",
  "Bakery and other pastry activities",
  "Barbing and hair dressing saloon",
  "Bed and Beddings and other household items",
  "Body cream and other cosmetology activities",
  "Building construction and masonry",
  "Domestic personnel agencies",
  "Climate and climate action activities",
  "Climate technology activities",
  "Civil engineering and other related engineering activities",
  "Chemical and Chemical and chemical products",
  "Consultancy, advisory and management services",
  "Creative art and entertainment activities",
  "Crop and and animal production, hunting and related services activities",
  "Education, teaching and other personal learning activities",
  "Electricity, gas, steam and air conditioning supply",
  "Event planner and related services activities",
  "Fashion designing and garment making",
  "Financial technology services and products",
  "Fitness, gym and other related activities",
  "Furniture and fittings making",
  "Fishing, aquaculture and other marine activities",
  "Food and catering services",
  "Forestry and logging activities",
  "Hair, wigs and related product activities",
  "Hotels and Hospitality services",
  "Human health activities",
  "Human resource, personnel management and employment activities",
  "Information Communication Technology",
  "Interior decoration and related activities",
  "Land transportation, taxi services and other commercial transport activities",
  "Legal and advisory services",
  "Libraries, archives, museums and other cultural activities",
  "Luxury goods and upscale items",
  "Makeup, cosmetics, spa and other beauty products",
  "Manufacturing of products",
  "Manufacture of food products",
  "Manufacture of wood and of products of wood and cork, except furniture",
  "Manufacture of basic metals",
  "Manufacture of chemicals and chemical products",
  "Manufacture of furniture",
  "Manufacture of fabric and textiles",
  "Manufacture of machinery and equipment",
  "Manufacture of rubber and plastics products",
  "Manufacture of tobacco products",
  "Manufacture of pharmaceuticals, medicinal chemical and botanical products Manufacture of building materials",
  "Marketing",
  "Motion picture, video and television program production, sound recording and music production services",
  "Office administration, office support and business support services",
  "Other manufacturing",
  "POS Service",
  "Courier, logistics and Postal activities",
  "Printing and reproduction of recorded media",
  "Publishing activities including books",
  "Real estate, rental and leasing activities",
  "Real estate technology activities",
  "Repair of electronic gadgets, computer and other household goods",
  "Software Development, computer programming, consulting and related activities",
  "Technology Services",
  "Tailoring materials and sale of fabrics",
  "Stylist, fashion and others",
  "Ushering agency and event support staff",
  "Waste management and recycling activities",
  "Other services",
];

export const fieldOptions: FieldType[] = [
  {
    type: "address",
    icon: MapPin,
    question: "Enter company address",
    compulsory: true,
  },
  {
    type: "business name",
    icon: MapPin,
    question:
      "To register your business, you must give your business a unique name. Enter exactly 4 names.",
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
    type: "objectives",
    question:
      "We'll need your business objectives to successfully register your business (4)",
    icon: FormInput,
    compulsory: true,
    options: BusinessObjectives,
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
