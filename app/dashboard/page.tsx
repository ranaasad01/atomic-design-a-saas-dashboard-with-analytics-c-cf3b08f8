"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Star, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrData = [
  { label: "Jan", value: 28400, secondary: 24100 },
  { label: "Feb", value: 31200, secondary: 26800 },
  { label: "Mar", value: 33800, secondary: 28500 },
  { label: "Apr", value: 36100, secondary: 30200 },
  { label: "May", value: 39500, secondary: 32900 },
  { label: "Jun", value: 42300, secondary: 35100 },
  { label: "Jul", value: 44800, secondary: 37600 },
  { label: "Aug", value: 47200, secondary: 39800 },
  { label: "Sep", value: 49600, secondary: 41500 },
  { label: "Oct", value: 52100, secondary: 43900 },
  { label: "Nov", value: 54800, secondary: 46200 },
  { label: "Dec", value: 58300, secondary: 49100 },
];

const weeklySignups = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 67 },
  { label: "Wed", value: 53 },
  { label: "Thu", value: 89 },
  { label: "Fri", value: 74 },
  { label: "Sat", value: 31 },
  { label: "Sun", value: 28 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 19, color: "#06b6d4" },
  { name: "Social", value: 12, color: "#10b981" },
  { name: "Email", value: 7, color: "#f59e0b" },
];

const recentTransactions = [
  { id: "TXN-001", user: "Sarah Chen", email: "sarah@acme.com", amount: 299, plan: "Enterprise", status: "Paid", date: "Dec 18, 2024" },
  { id: "TXN-002", user: "Marcus Webb", email: "marcus@startup.io", amount: 79, plan: "Pro", status: "Paid", date: "Dec 18, 2024" },
  { id: "TXN-003", user: "Priya Nair", email: "priya@techco.com", amount: 299, plan: "Enterprise", status: "Pending", date: "Dec 17, 2024" },
  { id: "TXN-004", user: "James Okafor", email: "james@devhub.net", amount: 79, plan: "Pro", status: "Paid", date: "Dec 17, 2024" },
  { id: "TXN-005", user: "Lena Müller", email: "lena@cloudbase.de", amount: 29, plan: "Starter", status: "Failed", date: "Dec 16, 2024" },
  { id: "TXN-006", user: "Tomás Rivera", email: "tomas@saasly.mx", amount: 79, plan: "Pro", status: "Refunded", date: "Dec 16, 2024" },
];

const kpiCards = [
  {
    title: "Monthly Revenue",
    value: "$58,300",
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "#6366f1",
    bg: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    title: "Active Users",
    value: "14,832",
    change: 8.7,
    changeLabel: "vs last month",
    icon: Users,
    color: "#8b5cf6",
    bg: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
  },
  {
    title: "Churn Rate",
    value: "2.4%",
    change: -0.6,
    changeLabel: "vs last month",
    icon: Activity,
    color: "#10b981",
    bg: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
  {
    title: "Annual Run Rate",
    value: "$699,600",
    change: 15.2,
    changeLabel: "vs last year",
    icon: Star,
    color: "#f59e0b",
    bg: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    Failed: "bg-red-500/15 text-red-400 border-red-500/20",
    Refunded: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  };
  const cls = map[status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/20";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {typeof entry.value === "number" && entry.value > 1000
            ? `$${entry.value.toLocaleString()}`
            : entry.value}
        </p>
      ))}
    </div>
  );
}

function BarTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-indigo-400">{payload[0]?.value ?? 0} signups</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"mrr" | "arr">("mrr");

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-slate-400 text-sm">
                Welcome back — here's what's happening with Pulse Analytics today.
              </p>
            </div>
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-400"
            >
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Last updated: Dec 18, 2024 · 14:32 UTC</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change > 0;
            const isChurn = card.title === "Churn Rate";
            const goodChange = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} p-6 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      goodChange
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {goodChange ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                <p className="text-sm text-slate-400 mt-1">{card.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{card.changeLabel}</p>
                {/* Decorative glow */}
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl"
                  style={{ backgroundColor: card.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          {/* MRR Line Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Growth</h2>
                <p className="text-xs text-slate-500 mt-0.5">MRR vs prior period — 12 months</p>
              </div>
              <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-1">
                {(["mrr", "arr"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mrrData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Current Period"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="secondary"
                  name="Prior Period"
                  stroke="#8b5cf6"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  activeDot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-5 h-0.5 bg-indigo-500 rounded-full inline-block" />
                Current Period
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-5 h-0.5 bg-violet-500 rounded-full inline-block border-dashed" style={{ borderTop: "2px dashed #8b5cf6", background: "none" }} />
                Prior Period
              </span>
            </div>
          </motion.div>

          {/* Donut PieChart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6"
          >
            <h2 className="text-base font-semibold text-white mb-1">Traffic Sources</h2>
            <p className="text-xs text-slate-500 mb-5">Breakdown by acquisition channel</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {trafficSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null;
                    const d = payload[0]?.payload as { name: string; value: number; color: string } | undefined;
                    if (!d) return null;
                    return (
                      <div className="bg-[#1e293b] border border-white/10 rounded-xl px-3 py-2 shadow-xl text-xs">
                        <p className="text-slate-400">{d.name}</p>
                        <p className="font-bold mt-0.5" style={{ color: d.color }}>{d.value}%</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-4 space-y-2">
              {trafficSources.map((src) => (
                <li key={src.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: src.color }} />
                    {src.name}
                  </span>
                  <span className="font-semibold text-slate-300">{src.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Weekly Signups Bar Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Weekly Signups</h2>
              <p className="text-xs text-slate-500 mt-0.5">New user registrations — current week</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.3% vs last week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklySignups} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={36}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Bar dataKey="value" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-white/[0.06]">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest billing activity across all plans</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              View all <Eye className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {recentTransactions.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    variants={fadeInUp}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="border-b border-white/[0.04] transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">{tx.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{tx.user}</p>
                        <p className="text-xs text-slate-500">{tx.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-300 bg-white/[0.05] px-2 py-1 rounded-md">
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{tx.date}</td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="sm:hidden divide-y divide-white/[0.05]"
          >
            {recentTransactions.map((tx) => (
              <motion.div key={tx.id} variants={fadeInUp} className="px-5 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{tx.user}</p>
                    <p className="text-xs text-slate-500">{tx.email}</p>
                  </div>
                  <StatusBadge status={tx.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{tx.plan} · {tx.id}</span>
                  <span className="font-semibold text-white">${(tx.amount ?? 0).toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{tx.date}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Quick Stats Footer Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: "Avg. Revenue / User", value: "$3.93", icon: DollarSign, trend: "up" },
            { label: "Trial Conversions", value: "34.2%", icon: CheckCircle, trend: "up" },
            { label: "Support Tickets", value: "18 open", icon: AlertCircle, trend: "down" },
            { label: "Uptime (30d)", value: "99.98%", icon: Activity, trend: "up" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="rounded-xl bg-white/[0.03] border border-white/[0.07] px-5 py-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}