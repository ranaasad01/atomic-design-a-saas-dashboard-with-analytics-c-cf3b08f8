"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, footerSections } from "@/lib/data";
import { fadeInUp, staggerContainer, fadeIn } from "@/lib/motion";

const SOCIAL_LINKS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="border-t border-white/[0.06] bg-[#0a0f1e] mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-[220px]">
              {APP_TAGLINE}
            </p>
            <div className="flex items-center gap-2 mt-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-indigo-500/20 border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-600">All systems operational</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}