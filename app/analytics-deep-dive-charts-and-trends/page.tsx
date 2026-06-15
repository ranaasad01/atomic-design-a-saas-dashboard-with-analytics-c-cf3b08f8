"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Activity, Users, Star, ArrowUp, ArrowDown, Calendar, Download, Filter, ChevronDown, Eye, Clock, Globe, Sparkles } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHLY_REVENUE = [
  { label: "Jan", mrr: 28400, arr: 340800, newMRR: 5200, churnedMRR: 1100, expansionMRR: 2300 },
  { label: "Feb", mrr: 31200, arr: 374400, newMRR: 6100, churnedMRR: 900, expansionMRR: 2800 },
  { label: "Mar", mrr: 34800, arr: 417600, newMRR: 7400, churnedMRR: 1200, expansionMRR: 3100 },
  { label: "Apr", mrr: 37100, arr: 445200, newMRR: 5900, churnedMRR: 1400, expansionMRR: 2600 },
  { label: "May", mrr: 41500, arr: 498000, newMRR: 8200, churnedMRR: 800, expansionMRR: 3800 },
  { label: "Jun", mrr: 46300, arr: 555600, newMRR: 9100, churnedMRR: 1100, expansionMRR: 4200 },
  { label: "Jul", mrr: 49800, arr: 597600, newMRR: 7800, churnedMRR: 1500, expansionMRR: 3600 },
  { label: "Aug", mrr: 53200, arr: 638400, newMRR: 8600, churnedMRR: 1200, expansionMRR: 4100 },
  { label: "Sep", mrr: 58700, arr: 704400, newMRR: 10200, churnedMRR: 900, expansionMRR: 4800 },
  { label: "Oct", mrr: 63100, arr: 757200, newMRR: 9400, churnedMRR: 1300, expansionMRR: 5100 },
  { label: "Nov", mrr: 68900, arr: 826800, newMRR: 11200, churnedMRR: 1100, expansionMRR: 5600 },
  { label: "Dec", mrr: 74500, arr: 894000, newMRR: 12800, churnedMRR: 800, expansionMRR: 6200 },
];

const WEEKLY_SESSIONS = [
  { label: "Mon", sessions: 4820, pageviews: 14200, conversions: 312 },
  { label: "Tue", sessions: 5340, pageviews: 16800, conversions: 389 },
  { label: "Wed", sessions: 6120, pageviews: 19400, conversions: 441 },
  { label: "Thu", sessions: 5890, pageviews: 18100, conversions: 418 },
  { label: "Fri", sessions: 6780, pageviews: 21300, conversions: 502 },
  { label: "Sat", sessions: 3920, pageviews: 11600, conversions: 228 },
  { label: "Sun", sessions: 3210, pageviews: 9800, conversions: 187 },
];

const ACQUISITION_CHANNELS = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Paid Ads", value: 18, color: "#06b6d4" },
  { name: "Referral", value: 12, color: "#10b981" },
  { name: "Social", value: 8, color: "#f59e0b" },
];

const FEATURE_USAGE = [
  { feature: "Dashboard", usage: 94, sessions: 18420 },
  { feature: "Analytics", usage: 87, sessions: 16940 },
  { feature: "Reports", usage: 72, sessions: 14080 },
  { feature: "Integrations", usage: 61, sessions: 11920 },
  { feature: "Alerts", usage: 54, sessions: 10560 },
  { feature: "API Access", usage: 43, sessions: 8400 },
  { feature: "Exports", usage: 38, sessions: 7420 },
];

const RADAR_DATA = [
  { metric: "Retention", A: 88, B: 72 },
  { metric: "Engagement", A: 92, B: 65 },
  { metric: "Conversion", A: 76, B: 58 },
  { metric: "Satisfaction", A: 84, B: 70 },
  { metric: "Growth", A: 95, B: 61 },
  { metric: "Churn Risk", A: 78, B: 55 },
];

const TOP_PAGES = [
  { page: "/dashboard", views: 48200, avgTime: "4m 32s", bounce: "18%", trend: 12 },
  { page: "/analytics", views: 36800, avgTime: "6m 14s", bounce: "12%", trend: 8 },
  { page: "/revenue", views: 28400, avgTime: "5m 48s", bounce: "15%", trend: 21 },
  { page: "/users", views: 22100, avgTime: "3m 22s", bounce: "24%", trend: -3 },
  { page: "/settings", views: 14600, avgTime: "2m 55s", bounce: "31%", trend: 5 },
  { page: "/reports", views: 11200, avgTime: "7m 10s", bounce: "9%", trend: 18 },
  { page: "/integrations", views: 8900, avgTime: "4m 02s", bounce: "22%", trend: -7 },
];

const GEO_DATA = [
  { country: "United States", users: 14820, revenue: 38400, flag: "🇺🇸" },
  { country: "United Kingdom", users: 6340, revenue: 16200, flag: "🇬🇧" },
  { country: "Germany", users: 4920, revenue: 12800, flag: "🇩🇪" },
  { country: "Canada", users: 4100, revenue: 10600, flag: "🇨🇦" },
  { country: "Australia", users: 3280, revenue: 8400, flag: "🇦🇺" },
  { country: "France", users: 2940, revenue: 7600, flag: "🇫🇷" },
  { country: "Japan", users: 2210, revenue: 5800, flag: "🇯🇵" },
];

const KPI_STATS = [
  {
    title: "Total Sessions",
    value: "2.84M",
    change: 18.4,
    icon: Activity,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
    detail: "vs last quarter",
  },
  {
    title: "Avg. Session Duration",
    value: "4m 38s",
    change: 6.2,
    icon: Clock,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    detail: "vs last quarter",
  },
  {
    title: "Conversion Rate",
    value: "7.84%",
    change: 1.3,
    icon: TrendingUp,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    detail: "vs last quarter",
  },
  {
    title: "Active Users",
    value: "38,420",
    change: -2.1,
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    detail: "vs last quarter",
  },
  {
    title: "Page Views",
    value: "11.2M",
    change: 22.7,
    icon: Eye,
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    detail: "vs last quarter",
  },
  {
    title: "Bounce Rate",
    value: "19.3%",
    change: -4.8,
    icon: Globe,
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
    detail: "vs last quarter",
  },
];

const TIME_RANGES = ["7D", "30D", "90D", "12M", "All"];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/40 min-w-[140px]">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="text-xs font-semibold text-white">
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Card Wrapper ─────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#1e293b]/60 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsDeepDivePage() {
  const [timeRange, setTimeRange] = useState("12M");
  const [activeTab, setActiveTab] = useState<"overview" | "acquisition" | "behavior" | "geo">("overview");

  const filteredRevenue =
    timeRange === "7D"
      ? MONTHLY_REVENUE.slice(-1)
      : timeRange === "30D"
      ? MONTHLY_REVENUE.slice(-1)
      : timeRange === "90D"
      ? MONTHLY_REVENUE.slice(-3)
      : MONTHLY_REVENUE;

  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "acquisition", label: "Acquisition" },
    { key: "behavior", label: "Behavior" },
    { key: "geo", label: "Geography" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Deep Dive</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Analytics &amp; Trends
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm max-w-xl">
                Comprehensive breakdown of user behavior, revenue trends, acquisition channels, and engagement metrics across your entire product.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Time Range Selector */}
              <div className="flex items-center bg-[#1e293b]/80 border border-white/[0.06] rounded-xl p-1 gap-0.5">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      timeRange === range
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e293b]/80 border border-white/[0.06] text-slate-300 hover:text-white text-xs font-medium transition-all hover:border-indigo-500/30"
              >
                <Filter className="w-3.5 h-3.5" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-500/30"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </motion.button>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-1 border-b border-white/[0.06]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key ? "text-indigo-300" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {KPI_STATS.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <motion.div
                key={stat.title}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-[#1e293b]/60 border border-white/[0.06] rounded-2xl p-4 backdrop-blur-sm cursor-default"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.glow} mb-3`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-slate-500 mb-1 truncate">{stat.title}</p>
                <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
                <div className={`flex items-center gap-0.5 mt-1 text-xs font-medium ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stat.change)}%
                  <span className="text-slate-600 font-normal ml-1 hidden sm:inline">{stat.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Trend (Area Chart) ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Revenue Trend</h2>
                <p className="text-sm text-slate-400 mt-0.5">MRR growth, new revenue, and churn over time</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-indigo-400 rounded-full inline-block" />MRR</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 rounded-full inline-block" />New MRR</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-400 rounded-full inline-block" />Churned</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={filteredRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke="#6366f1" strokeWidth={2} fill="url(#mrrGrad)" dot={false} />
                <Area type="monotone" dataKey="newMRR" name="New MRR" stroke="#10b981" strokeWidth={2} fill="url(#newGrad)" dot={false} />
                <Area type="monotone" dataKey="churnedMRR" name="Churned" stroke="#f43f5e" strokeWidth={2} fill="url(#churnGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* ── Two Column: Sessions Bar + Pie ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Weekly Sessions Bar Chart */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <Card className="h-full">
              <SectionHeader title="Weekly Sessions" subtitle="Sessions, pageviews, and conversions by day" />
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={WEEKLY_SESSIONS} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sessions" name="Sessions" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" name="Conversions" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Acquisition Pie */}
          <motion.div variants={slideInRight}>
            <Card className="h-full">
              <SectionHeader title="Acquisition" subtitle="Traffic source breakdown" />
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={ACQUISITION_CHANNELS}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ACQUISITION_CHANNELS.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, ""]} contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {ACQUISITION_CHANNELS.map((ch) => (
                  <div key={ch.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                      <span className="text-xs text-slate-400">{ch.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{ch.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── Radar + Feature Usage ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Radar Chart */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <SectionHeader title="Cohort Comparison" subtitle="Pro vs Free plan engagement metrics" />
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 9 }} />
                  <Radar name="Pro Plan" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                  <Radar name="Free Plan" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Feature Usage Bars */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <SectionHeader title="Feature Adoption" subtitle="% of active users engaging with each feature" />
              <div className="space-y-4">
                {FEATURE_USAGE.map((f, i) => (
                  <div key={f.feature}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-300">{f.feature}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{(f.sessions ?? 0).toLocaleString()} sessions</span>
                        <span className="text-sm font-semibold text-white">{f.usage}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.usage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #6366f1, #8b5cf6)`,
                          opacity: 0.7 + (f.usage / 100) * 0.3,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── MRR Breakdown Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">MRR Breakdown</h2>
                <p className="text-sm text-slate-400 mt-0.5">New, expansion, and churned MRR components</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-cyan-400 rounded-full inline-block" />New MRR</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-violet-400 rounded-full inline-block" />Expansion</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-400 rounded-full inline-block" />Churned</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="newMRR" name="New MRR" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3, fill: "#06b6d4", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="expansionMRR" name="Expansion" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="churnedMRR" name="Churned" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3, fill: "#f43f5e", strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* ── Top Pages Table + Geo ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Top Pages */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <Card className="h-full">
              <SectionHeader title="Top Pages" subtitle="Most visited pages with engagement metrics" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Page</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3 pr-4">Views</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3 pr-4">Avg Time</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3 pr-4">Bounce</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_PAGES.map((row, i) => (
                      <motion.tr
                        key={row.page}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 pr-4">
                          <span className="font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md">{row.page}</span>
                        </td>
                        <td className="py-3 pr-4 text-right text-slate-300 font-medium">{(row.views ?? 0).toLocaleString()}</td>
                        <td className="py-3 pr-4 text-right text-slate-400">{row.avgTime}</td>
                        <td className="py-3 pr-4 text-right text-slate-400">{row.bounce}</td>
                        <td className="py-3 text-right">
                          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${row.trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                            {row.trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(row.trend)}%
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Geo Breakdown */}
          <motion.div variants={slideInRight}>
            <Card className="h-full">
              <SectionHeader title="Top Countries" subtitle="Users and revenue by region" />
              <div className="space-y-3">
                {GEO_DATA.map((geo, i) => {
                  const maxUsers = GEO_DATA[0]?.users ?? 1;
                  const pct = Math.round(((geo.users ?? 0) / maxUsers) * 100);
                  return (
                    <motion.div
                      key={geo.country}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{geo.flag}</span>
                          <span className="text-xs text-slate-300">{geo.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-white">{(geo.users ?? 0).toLocaleString()}</span>
                          <span className="text-xs text-slate-500 ml-1">users</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.05]">
                <p className="text-xs text-slate-500 mb-3">Revenue by Country</p>
                {GEO_DATA.slice(0, 4).map((geo) => (
                  <div key={`rev-${geo.country}`} className="flex items-center justify-between py-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span>{geo.flag}</span>{geo.country}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">${(geo.revenue ?? 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── Insight Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: TrendingUp,
              color: "from-indigo-500 to-violet-600",
              glow: "shadow-indigo-500/20",
              title: "Growth Velocity",
              body: "MRR grew 162% YoY, outpacing the industry average of 94%. Expansion revenue now accounts for 38% of total new MRR.",
            },
            {
              icon: Star,
              color: "from-amber-500 to-orange-600",
              glow: "shadow-amber-500/20",
              title: "Top Performing Channel",
              body: "Organic search drives 38% of all traffic with the lowest CAC at $42. Invest in SEO to sustain compounding growth.",
            },
            {
              icon: Activity,
              color: "from-emerald-500 to-teal-600",
              glow: "shadow-emerald-500/20",
              title: "Engagement Signal",
              body: "Pro plan users spend 2.4× longer per session and have a 6.1% churn rate vs 18.3% for Free — upgrade prompts are working.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="bg-[#1e293b]/60 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.glow} mb-4`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}