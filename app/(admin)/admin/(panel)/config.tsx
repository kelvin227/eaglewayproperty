import {
  Home,
  ShieldCheck,
  Mail,
  MessageCircle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  position: string;
}

export const NavItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    position: "top",
  },
    {
    name: "Chats",
    href: "/chat",
    icon: MessageCircle,
    position: "top",
  },
  {
    name: "MailBox",
    href: "/mailer",
    icon: Mail,
    position: "top",
  },
  {
    name: "KYC Requests",
    href: "/kyc",
    icon: ShieldCheck,
    position: "top",
  }
];
