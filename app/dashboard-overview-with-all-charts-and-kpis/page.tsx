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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Star, ArrowUpRight, ArrowDownRight, Eye, ShoppingCart, Zap, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", mrr: 32000, arr: 384000, newMRR: 4200, churn: 1100 },
  { month: "Feb", mrr: 35500, arr: 426000, newMRR: 5100, churn: 1600 },
  { month: "Mar", mrr: 38200, arr: 458400, newMRR: 4800, churn: 2100 },
  { month: "Apr", mrr: 41000, arr: 492000, newMRR: 6200, churn: 3400 },
  { month: "May", mrr: 44800, arr: 537600, newMRR: 5900, churn: 2100 },
  { month: "Jun", mrr: 47300, arr: 567600, newMRR: 4700, churn: 2200 },
  { month: "Jul", mrr: 51200, arr: 614400, newMRR: 7100, churn: 3200 },
  { month: "Aug", mrr: 54600, arr: 655200, newMRR: 6400, churn: 3000 },
  { month: "Sep", mrr: 58900, arr: 706800, newMRR: 7800, churn: 3500 },
  { month: "Oct", mrr: 62100, arr: 745200, newMRR: 6200, churn: 3000 },
  { month: "Nov", mrr: 66400, arr: 796800, newMRR: 8100, churn: 3800 },
  { month: "Dec", mrr: 71200, arr: 854400, newMRR: 9200, churn: 4400 },
];

const userGrowthData = [
  { month: "Jan", active: 1240, new: 320, churned: 80 },
  { month: "Feb", active: 1480, new: 410, churned: 170 },
  { month: "Mar", active: 1720, new: 380, churned: 140 },
  { month: "Apr", active: 2010, new: 520, churned: 230 },
  { month: "May", active: 2290, new: 490, churned: 210 },
  { month: "Jun", active: 2560, new: 440, churned: 170 },
  { month: "Jul", active: 2890, new: 610, churned: 280 },
  { month: "Aug", active: 3180, new: 570, churned: 280 },
  { month: "Sep", active: 3520, new: 680, churned: 340 },
  { month: "Oct", active: 3810, new: 590, churned: 300 },
  { month: "Nov", active: 4150, new: 720, churned: 380 },
  { month: "Dec", active: 4560, new: 830, churned: 420 },
];

const trafficData = [
  { day: "Mon", organic: 4200, paid: 1800, referral: 900 },
  { day: "Tue", organic: 5100, paid: 2200, referral: 1100 },
  { day: "Wed", organic: 4800, paid: 1900, referral: 1300 },
  { day: "Thu", organic: 6200, paid: 2600, referral: 1500 },
  { day: "Fri", organic: 5900, paid: 2400, referral: 1200 },
  { day: "Sat", organic: 3800, paid: 1600, referral: 800 },
  { day: "Sun", organic: 3200, paid: 1200, referral: 700 },
];

const planDistribution = [
  { name: "Enterprise", value: 18, color: "#6366f1" },
  { name: "Pro", value: 42, color: "#8b5cf6" },
  { name: "Starter", value: 28, color: "#a78bfa" },
  { name: "Free", value: 12, color: "#c4b5fd" },
];

const conversionData = [
  { stage: "Visitors", count: 48200, pct: 100 },
  { stage: "Sign-ups", count: 9640, pct: 20 },
  { stage: "Activated", count: 5784, pct: 12 },
  { stage: "Converted", count: 1928, pct: 4 },
  { stage: "Retained", count: 1543, pct: 3.2 },
];

const recentTransactions = [
  { id: "TXN-8821", customer: "Acme Corp", email: "billing@acme.com", plan: "Enterprise", amount: 2400, status: "Paid", date: "Dec 28, 2024" },
  { id: "TXN-8820", customer: "Nova Labs", email: "finance@novalabs.io", plan: "Pro", amount: 149, status: "Paid", date: "Dec 28, 2024" },
  { id: "TXN-8819", customer: "Bright Media", email: "accounts@brightmedia.co", plan: "Pro", amount: 149, status: "Pending", date: "Dec 27, 2024" },
  { id: "TXN-8818", customer: "Vertex AI", email: "ops@vertexai.dev", plan: "Enterprise", amount: 2400, status: "Paid", date: "Dec 27, 2024" },
  { id: "TXN-8817", customer: "Skyline Inc", email: "pay@skyline.com", plan: "Starter", amount: 49, status: "Failed", date: "Dec 26, 2024" },
  { id: "TXN-8816", customer: "Orbit Systems", email: "billing@orbit.io", plan: "Pro", amount: 149, status: "Refunded", date: "Dec 26, 2024" },
  { id: "TXN-8815", customer: "Cascade Tech", email: "finance@cascade.tech", plan: "Enterprise", amount: 2400, status: "Paid", date: "Dec 25, 2024" },
];

const topPages = [
  { path: "/dashboard", views: 18420, bounce: "24%", avg: "4m 12s" },
  { path: "/analytics", views: 12380, bounce: "31%", avg: "3m 48s" },
  { path: "/revenue", views: 9210, bounce: "28%", avg: "5m 02s" },
  { path: "/users", views: 7640, bounce: "35%", avg: "2m 55s" },
  { path: "/settings", views: 4120, bounce: "42%", avg: "1m 38s" },
];

const kpis = [
  {
    title: "Monthly Recurring Revenue",
    value: "$71,200",
    change: 7.2,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
  },
  {
    title: "Active Users",
    value: "4,560",
    change: 9.8,
    changeLabel: "vs last month",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
  },
  {
    title: "Annual Recurring Revenue",
    value: "$854K",
    change: 12.4,
    changeLabel: "vs last year",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  {
    title: "Churn Rate",
    value: "3.2%",
    change: -0.4,
    changeLabel: "vs last month",
    icon: Activity,
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
  },
  {
    title: "Avg Revenue Per User",
    value: "$15.61",
    change: 2.1,
    changeLabel: "vs last month",
    icon: Star,
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
  {
    title: "Conversion Rate",
    value: "4.0%",
    change: 0.6,
    changeLabel: "vs last month",
    icon: Zap,
    color: "from-sky-500 to-cyan-600",
    glow: "shadow-sky-500/20",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Paid: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle className="w-3 h-3" /> },
  Pending: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <Clock className="w-3 h-3" /> },
  Failed: { color: "text-rose-400 bg-rose-500/10 border-rose-500/20", icon: <AlertCircle className="w-3 h-3" /> },
  Refunded: { color: "text-slate-400 bg-slate-500/10 border-slate-500/20", icon: <Circle className="w-3 h-3" /> },
};

const formatCurrency = (v: number) => `$${(v ?? 0).toLocaleString()}`;

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "users" | "traffic">("revenue");

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Page Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="border-b border-white/[0.06] bg-[#0f172a]/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-slate-400 text-sm">
                All charts, KPIs, and metrics — December 2024
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live data
              </span>
              <span className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5">
                Updated just now
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ── KPI Cards ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Key Performance Indicators
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              const isPositive = kpi.change >= 0;
              const isChurn = kpi.title === "Churn Rate";
              const good = isChurn ? !isPositive : isPositive;
              return (
                <motion.div
                  key={kpi.title}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`relative overflow-hidden rounded-2xl border ${kpi.border} bg-white/[0.03] p-5 shadow-lg ${kpi.glow} backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.text}`} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${good ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                      {good ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(kpi.change)}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white tracking-tight">{kpi.value}</p>
                  <p className="text-sm text-slate-400 mt-1">{kpi.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{kpi.changeLabel}</p>
                  {/* Decorative gradient */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${kpi.color} opacity-10 blur-2xl`} />
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Main Chart (tabbed) ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Growth Trends</h2>
              <p className="text-sm text-slate-500 mt-0.5">12-month performance overview</p>
            </div>
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
              {(["revenue", "users", "traffic"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "revenue" ? (
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="newMRRGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Area type="monotone" dataKey="mrr" name="MRR" stroke="#6366f1" strokeWidth={2} fill="url(#mrrGrad)" dot={false} />
                  <Area type="monotone" dataKey="newMRR" name="New MRR" stroke="#8b5cf6" strokeWidth={2} fill="url(#newMRRGrad)" dot={false} />
                </AreaChart>
              ) : activeTab === "users" ? (
                <BarChart data={userGrowthData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Bar dataKey="active" name="Active Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="new" name="New Users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churned" name="Churned" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={trafficData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Bar dataKey="organic" name="Organic" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="referral" name="Referral" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* ── Two-column: Pie + Funnel ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Plan Distribution Pie */}
          <motion.div
            variants={scaleIn}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Plan Distribution</h2>
            <p className="text-sm text-slate-500 mb-6">Revenue share by subscription tier</p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-48 h-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {planDistribution.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {planDistribution.map((plan) => (
                  <div key={plan.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: plan.color }} />
                      <span className="text-sm text-slate-300">{plan.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${plan.value}%`, background: plan.color }} />
                      </div>
                      <span className="text-sm font-semibold text-white w-8 text-right">{plan.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            variants={scaleIn}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Conversion Funnel</h2>
            <p className="text-sm text-slate-500 mb-6">Visitor → Retained customer pipeline</p>
            <div className="space-y-3">
              {conversionData.map((stage, i) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{(stage.count ?? 0).toLocaleString()}</span>
                      <span className="text-sm font-semibold text-white w-10 text-right">{stage.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── MRR Breakdown Line Chart ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">MRR Breakdown</h2>
            <p className="text-sm text-slate-500 mt-0.5">New MRR vs Churned MRR over 12 months</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                <Line type="monotone" dataKey="newMRR" name="New MRR" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="churn" name="Churned MRR" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: "#f43f5e", r: 3 }} activeDot={{ r: 5 }} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* ── Bottom Row: Transactions + Top Pages ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          {/* Recent Transactions */}
          <motion.div
            variants={fadeInUp}
            className="xl:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                <p className="text-sm text-slate-500 mt-0.5">Latest billing activity</p>
              </div>
              <span className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
                {recentTransactions.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["ID", "Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4 last:pr-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {recentTransactions.map((tx, i) => {
                    const sc = statusConfig[tx.status] ?? statusConfig["Pending"];
                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 pr-4 font-mono text-xs text-slate-500">{tx.id}</td>
                        <td className="py-3 pr-4">
                          <div className="font-medium text-slate-200">{tx.customer}</div>
                          <div className="text-xs text-slate-500">{tx.email}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-xs text-slate-400 bg-white/[0.05] border border-white/[0.06] rounded-md px-2 py-0.5">
                            {tx.plan}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-semibold text-white">{formatCurrency(tx.amount)}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${sc.color}`}>
                            {sc.icon}
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 text-xs text-slate-500">{tx.date}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <Eye className="w-4 h-4 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">Top Pages</h2>
            </div>
            <div className="space-y-4">
              {topPages.map((page, i) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono text-indigo-300 group-hover:text-indigo-200 transition-colors">
                      {page.path}
                    </span>
                    <span className="text-sm font-semibold text-white">{(page.views ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.round((page.views / 18420) * 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Bounce: {page.bounce}</span>
                    <span>Avg: {page.avg}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-3">
              {[
                { label: "Total Views", value: "51,770", icon: Eye },
                { label: "Avg Session", value: "3m 31s", icon: Clock },
                { label: "Bounce Rate", value: "32%", icon: Activity },
                { label: "Conversions", value: "1,928", icon: ShoppingCart },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                    <Icon className="w-3.5 h-3.5 text-indigo-400 mb-1.5" />
                    <p className="text-base font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}