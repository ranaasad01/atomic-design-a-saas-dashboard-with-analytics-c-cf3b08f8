import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Analytics — SaaS Dashboard",
  description:
    "Monitor your key business metrics, revenue trends, and user growth with Pulse Analytics — the modern SaaS intelligence platform.",
  keywords: ["analytics", "dashboard", "SaaS", "metrics", "revenue", "MRR"],
  authors: [{ name: "Pulse Analytics" }],
  openGraph: {
    title: "Pulse Analytics — SaaS Dashboard",
    description: "Modern SaaS analytics dashboard with real-time insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[#0f172a] text-slate-100 antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}