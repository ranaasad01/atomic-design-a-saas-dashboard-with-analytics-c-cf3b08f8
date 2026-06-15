// ─── Brand Constants ──────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Intelligence that moves at the speed of your business.";
export const APP_VERSION = "2.4.1";

// ─── Color Palette ────────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  dark: "#1e1b4b",
  surface: "#0f172a",
  light: "#f8fafc",
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: "Layout" },
  { label: "Analytics", href: "/analytics", icon: "Activity" },
  { label: "Users", href: "/users", icon: "User" },
  { label: "Revenue", href: "/revenue", icon: "Star" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

export const topNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

// ─── Shared TypeScript Types ──────────────────────────────────────────────────
export interface KPICard {
  title: string;
  value: string;
  change: number; // percentage, positive = up, negative = down
  changeLabel: string;
  prefix?: string;
  suffix?: string;
  color: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Inactive" | "Churned";
  mrr: number;
  joinedAt: string;
  lastSeen: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  user: string;
  email: string;
  amount: number;
  plan: string;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
  date: string;
}

export interface RevenueMetric {
  month: string;
  mrr: number;
  arr: number;
  newMRR: number;
  expansionMRR: number;
  churnedMRR: number;
  netNewMRR: number;
}

// ─── Footer Links ─────────────────────────────────────────────────────────────
export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics", href: "/analytics" },
      { label: "Revenue", href: "/revenue" },
      { label: "Users", href: "/users" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Settings", href: "/settings" },
      { label: "Profile", href: "/settings" },
      { label: "Billing", href: "/revenue" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
];