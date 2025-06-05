import {
  Home,
  ShieldCheck,
  Wallet,
  Mail,
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
    name: "Wallet and Gas tank",
    href: "/admin_wallet",
    icon: Wallet,
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
