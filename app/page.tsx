"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowRight, Star, Check, Users, TrendingUp, Shield, Zap, BarChart2, Globe, ChevronRight, Sparkles } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Mock Data ─────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Jan", mrr: 28400, users: 1240 },
  { month: "Feb", mrr: 31200, users: 1380 },
  { month: "Mar", mrr: 34800, users: 1520 },
  { month: "Apr", mrr: 38100, users: 1710 },
  { month: "May", mrr: 42600, users: 1890 },
  { month: "Jun", mrr: 47300, users: 2100 },
  { month: "Jul", mrr: 51800, users: 2340 },
  { month: "Aug", mrr: 56200, users: 2580 },
];

const CONVERSION_DATA = [
  { day: "Mon", free: 42, pro: 18, enterprise: 5 },
  { day: "Tue", free: 55, pro: 24, enterprise: 8 },
  { day: "Wed", free: 38, pro: 21, enterprise: 6 },
  { day: "Thu", free: 61, pro: 29, enterprise: 11 },
  { day: "Fri", free: 70, pro: 35, enterprise: 14 },
  { day: "Sat", free: 48, pro: 22, enterprise: 9 },
  { day: "Sun", free: 33, pro: 16, enterprise: 4 },
];

const FEATURES = [
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description:
      "Monitor every metric as it happens. Live dashboards update in under 200ms so you never miss a trend.",
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/25",
  },
  {
    icon: TrendingUp,
    title: "Revenue Intelligence",
    description:
      "Track MRR, ARR, churn, and expansion revenue with cohort analysis and predictive forecasting built in.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
  },
  {
    icon: Users,
    title: "User Segmentation",
    description:
      "Slice your audience by plan, behavior, geography, or custom attributes. Build segments in seconds.",
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/25",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. SSO, RBAC, audit logs, and data residency controls included on every plan.",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/25",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Set threshold-based or anomaly-detection alerts. Get notified via Slack, email, or webhook instantly.",
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/25",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Data processed across 12 regions with 99.99% uptime SLA. Your analytics are always available.",
    color: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/25",
  },
];

const STATS = [
  { value: "$2.4B+", label: "Revenue tracked monthly" },
  { value: "14,000+", label: "Companies on Pulse" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "< 200ms", label: "Dashboard latency" },
];

const TESTIMONIALS = [
  {
    quote:
      "Pulse replaced four separate tools for us. Our finance and growth teams finally speak the same language — and we closed our Series B with confidence because of the data.",
    author: "Mia Chen",
    role: "CFO at Luma Health",
    avatar: "/images/testimonial-mia-chen-cfo.jpg",
    stars: 5,
  },
  {
    quote:
      "The cohort retention charts alone saved us from a product decision that would have cost us 20% of our MRR. I can't imagine running our SaaS without Pulse.",
    author: "James Okafor",
    role: "Head of Product at Stackwise",
    avatar: "/images/testimonial-james-okafor-product.jpg",
    stars: 5,
  },
  {
    quote:
      "Setup took 15 minutes. Within an hour we had dashboards our entire leadership team checks every morning. The signal-to-noise ratio is unmatched.",
    author: "Sofia Reyes",
    role: "CEO at Orbit CRM",
    avatar: "/images/testimonial-sofia-reyes-ceo.jpg",
    stars: 5,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: [
      "Up to 5,000 tracked users",
      "10 custom dashboards",
      "7-day data retention",
      "Email alerts",
      "CSV exports",
    ],
    cta: "Start free trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "For growing teams that need deeper insight and automation.",
    features: [
      "Up to 50,000 tracked users",
      "Unlimited dashboards",
      "90-day data retention",
      "Slack & webhook alerts",
      "Cohort & funnel analysis",
      "Revenue intelligence suite",
    ],
    cta: "Start free trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For scale-ups and enterprises with advanced requirements.",
    features: [
      "Unlimited tracked users",
      "Unlimited data retention",
      "SSO & RBAC",
      "Dedicated success manager",
      "Custom SLA & data residency",
      "Priority support",
    ],
    cta: "Talk to sales",
    highlight: false,
    badge: null,
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name === "mrr"
            ? `$${(p.value ?? 0).toLocaleString()}`
            : (p.value ?? 0).toLocaleString()}{" "}
          <span className="text-slate-400 font-normal text-xs">{p.name}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-40 left-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            {...(shouldReduceMotion ? {} : { variants: staggerContainer, initial: "hidden", animate: "visible" })}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Introducing Pulse 2.0 — Now with AI forecasting
            </motion.div>

            <motion.h1
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]"
            >
              The analytics layer for
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                modern SaaS
              </span>
            </motion.h1>

            <motion.p
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {APP_TAGLINE} — one platform to track revenue, users, and product
              usage with the clarity your team needs to grow.
            </motion.p>

            <motion.div
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Start free trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Watch demo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.p
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="mt-6 text-sm text-slate-500"
            >
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </motion.div>

          {/* Hero Chart */}
          <motion.div
            {...(shouldReduceMotion
              ? {}
              : { variants: scaleIn, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="mt-16 bg-[#1e293b]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-400">Monthly Recurring Revenue</p>
                <p className="text-3xl font-bold text-white">$56,200</p>
                <p className="text-sm text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +32% since January
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-xs text-slate-400">MRR</span>
                <span className="w-2 h-2 rounded-full bg-violet-400 ml-3" />
                <span className="text-xs text-slate-400">Users</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2.5} fill="url(#mrrGrad)" dot={false} />
                <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} fill="url(#usersGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeIn)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Everything you need to grow
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Pulse brings your revenue, product, and user data into one
              beautifully designed workspace.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                {...motionProps(fadeInUp)}
                className={`bg-[#1e293b]/60 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300 shadow-xl ${f.glow}`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4 shadow-lg`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Conversion Chart ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1526]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...motionProps(slideInLeft)}>
              <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Conversion Analytics
              </p>
              <h2 className="text-4xl font-extrabold mb-5">
                Understand exactly where users convert
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Break down free-to-paid conversions by day, cohort, or traffic
                source. Pinpoint the moments that drive revenue.
              </p>
              <ul className="space-y-3">
                {[
                  "Daily and weekly conversion funnels",
                  "Plan-level breakdown (free → pro → enterprise)",
                  "Attribution by acquisition channel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...motionProps(slideInRight)}
              className="bg-[#1e293b]/80 border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <p className="text-sm text-slate-400 mb-1">Conversion by Plan — This Week</p>
              <p className="text-2xl font-bold mb-6">Weekly Signups</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={CONVERSION_DATA} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="free" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pro" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enterprise" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Loved by SaaS teams</h2>
            <p className="text-slate-400 text-lg">Join 14,000+ companies making smarter decisions with Pulse.</p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.author}
                {...motionProps(fadeInUp)}
                className="bg-[#1e293b]/60 border border-white/8 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1526]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg">Start free. Scale as you grow. No hidden fees.</p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {PRICING.map((plan) => (
              <motion.div
                key={plan.name}
                {...motionProps(fadeInUp)}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-indigo-600/10 border-indigo-500/50 shadow-2xl shadow-indigo-500/20"
                    : "bg-[#1e293b]/60 border-white/8"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`block text-center font-semibold py-3 rounded-xl transition-all duration-200 ${
                    plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...motionProps(scaleIn)}
            className="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Ready to see your data clearly?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of SaaS teams who use {APP_NAME} to turn raw
                numbers into confident decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  Start free trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Talk to sales
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">No credit card required · 14-day free trial</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white">{APP_NAME}</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
