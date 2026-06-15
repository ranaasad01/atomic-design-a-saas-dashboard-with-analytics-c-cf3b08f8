"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Settings, User, Menu, X, Activity, ChevronDown } from 'lucide-react';
import { topNavLinks, APP_NAME } from "@/lib/data";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/motion";

const NOTIFICATIONS = [
  { id: 1, text: "New user signed up: alex@example.com", time: "2m ago", unread: true },
  { id: 2, text: "MRR milestone reached: $50,000", time: "1h ago", unread: true },
  { id: 3, text: "Churn alert: 3 Enterprise accounts at risk", time: "3h ago", unread: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Activity className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {topNavLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-indigo-300 bg-indigo-500/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setNotifOpen((v) => !v)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/[0.07] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0f172a]" />
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-80 rounded-xl bg-[#1e293b] border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-100">Notifications</span>
                      <span className="text-xs text-indigo-400 font-medium">{unreadCount} new</span>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                      {NOTIFICATIONS.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 flex gap-3 items-start hover:bg-white/[0.03] transition-colors ${
                            n.unread ? "bg-indigo-500/[0.04]" : ""
                          }`}
                        >
                          {n.unread && (
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                          )}
                          <div className={n.unread ? "" : "pl-3.5"}>
                            <p className="text-xs text-slate-300 leading-relaxed">{n.text}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-white/[0.06]">
                      <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        View all notifications →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <Link href="/settings">
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/[0.07] transition-colors cursor-pointer"
                aria-label="Settings"
              >
                <Settings className="w-[18px] h-[18px]" />
              </motion.span>
            </Link>

            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center cursor-pointer ring-2 ring-indigo-500/30 hover:ring-indigo-400/50 transition-all"
            >
              <User className="w-4 h-4 text-white" />
            </motion.div>

            {/* Mobile Toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/[0.07] transition-colors ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0f172a]/95 backdrop-blur-xl"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="px-4 py-3 flex flex-col gap-1"
            >
              {topNavLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div key={link.href} variants={fadeInUp}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}