"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight, Calendar, Download, Filter, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MRR_HISTORY = [
  { month: "Jan", mrr: 38200, arr: 458400, newMRR: 4200, expansionMRR: 1800, churnedMRR: 1100, netNewMRR: 4900 },
  { month: "Feb", mrr: 41500, arr: 498000, newMRR: 5100, expansionMRR: 2200, churnedMRR: 1400, netNewMRR: 5900 },
  { month: "Mar", mrr: 44800, arr: 537600, newMRR: 4800, expansionMRR: 1900, churnedMRR: 1200, netNewMRR: 5500 },
  { month: "Apr", mrr: 47200, arr: 566400, newMRR: 5500, expansionMRR: 2400, churnedMRR: 1800, netNewMRR: 6100 },
  { month: "May", mrr: 51000, arr: 612000, newMRR: 6200, expansionMRR: 2800, churnedMRR: 1600, netNewMRR: 7400 },
  { month: "Jun", mrr: 54300, arr: 651600, newMRR: 5800, expansionMRR: 3100, churnedMRR: 2100, netNewMRR: 6800 },
  { month: "Jul", mrr: 58700, arr: 704400, newMRR: 7200, expansionMRR: 3400, churnedMRR: 1900, netNewMRR: 8700 },
  { month: "Aug", mrr: 62100, arr: 745200, newMRR: 6800, expansionMRR: 2900, churnedMRR: 2300, netNewMRR: 7400 },
  { month: "Sep", mrr: 65400, arr: 784800, newMRR: 7100, expansionMRR: 3200, churnedMRR: 2100, netNewMRR: 8200 },
  { month: "Oct", mrr: 69800, arr: 837600, newMRR: 8200, expansionMRR: 3600, churnedMRR: 2400, netNewMRR: 9400 },
  { month: "Nov", mrr: 73200, arr: 878400, newMRR: 7600, expansionMRR: 3100, churnedMRR: 2800, netNewMRR: 7900 },
  { month: "Dec", mrr: 78500, arr: 942000, newMRR: 9100, expansionMRR: 4200, churnedMRR: 2600, netNewMRR: 10700 },
];

const CHURN_BY_PLAN = [
  { name: "Free", value: 8.4, color: "#94a3b8" },
  { name: "Pro", value: 3.2, color: "#6366f1" },
  { name: "Enterprise", value: 1.1, color: "#8b5cf6" },
];

const CHURN_REASONS = [
  { reason: "Too expensive", count: 42, pct: 31 },
  { reason: "Missing features", count: 38, pct: 28 },
  { reason: "Switched to competitor", count: 27, pct: 20 },
  { reason: "No longer needed", count: 18, pct: 13 },
  { reason: "Poor support experience", count: 11, pct: 8 },
];

const COHORT_RETENTION = [
  { cohort: "Jan 2024", m0: 100, m1: 88, m2: 81, m3: 76, m4: 72, m5: 69, m6: 67 },
  { cohort: "Feb 2024", m0: 100, m1: 90, m2: 83, m3: 78, m4: 74, m5: 71, m6: 68 },
  { cohort: "Mar 2024", m0: 100, m1: 87, m2: 80, m3: 75, m4: 71, m5: 68, m6: null },
  { cohort: "Apr 2024", m0: 100, m1: 91, m2: 84, m3: 79, m4: 75, m5: null, m6: null },
  { cohort: "May 2024", m0: 100, m1: 89, m2: 82, m3: 77, m4: null, m5: null, m6: null },
  { cohort: "Jun 2024", m0: 100, m1: 92, m2: 85, m3: null, m4: null, m5: null, m6: null },
];

const RECENT_CHURNS = [
  { id: "CHR-001", company: "Acme Corp", plan: "Enterprise", mrr: 2400, reason: "Too expensive", date: "Dec 28, 2024", csm: "Sarah K." },
  { id: "CHR-002", company: "Bright Labs", plan: "Pro", mrr: 149, reason: "Missing features", date: "Dec 26, 2024", csm: "James T." },
  { id: "CHR-003", company: "Nexus Digital", plan: "Pro", mrr: 149, reason: "Switched to competitor", date: "Dec 24, 2024", csm: "Maria L." },
  { id: "CHR-004", company: "Orbit Systems", plan: "Enterprise", mrr: 1800, reason: "No longer needed", date: "Dec 22, 2024", csm: "Sarah K." },
  { id: "CHR-005", company: "Pixel Studio", plan: "Pro", mrr: 149, reason: "Too expensive", date: "Dec 20, 2024", csm: "James T." },
  { id: "CHR-006", company: "Quantum AI", plan: "Enterprise", mrr: 3200, reason: "Missing features", date: "Dec 18, 2024", csm: "Maria L." },
  { id: "CHR-007", company: "Relay Networks", plan: "Pro", mrr: 149, reason: "Poor support experience", date: "Dec 15, 2024", csm: "James T." },
];

const KPI_CARDS = [
  {
    title: "Monthly Recurring Revenue",
    value: 78500,
    prefix: "$",
    change: 7.2,
    changeLabel: "vs last month",
    color: "#6366f1",
    bg: "from-indigo-500/10 to-indigo-500/5",
    border: "border-indigo-500/20",
    icon: DollarSign,
  },
  {
    title: "Annual Recurring Revenue",
    value: 942000,
    prefix: "$",
    change: 7.2,
    changeLabel: "vs last month",
    color: "#8b5cf6",
    bg: "from-violet-500/10 to-violet-500/5",
    border: "border-violet-500/20",
    icon: TrendingUp,
  },
  {
    title: "Net New MRR",
    value: 10700,
    prefix: "$",
    change: 35.4,
    changeLabel: "vs last month",
    color: "#10b981",
    bg: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/20",
    icon: ArrowUpRight,
  },
  {
    title: "Churned MRR",
    value: 2600,
    prefix: "$",
    change: -7.1,
    changeLabel: "vs last month",
    color: "#f43f5e",
    bg: "from-rose-500/10 to-rose-500/5",
    border: "border-rose-500/20",
    icon: ArrowDownRight,
  },
  {
    title: "MRR Churn Rate",
    value: 3.4,
    suffix: "%",
    change: -0.3,
    changeLabel: "vs last month",
    color: "#f59e0b",
    bg: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/20",
    icon: TrendingDown,
  },
  {
    title: "Active Subscribers",
    value: 1284,
    change: 4.8,
    changeLabel: "vs last month",
    color: "#06b6d4",
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
    icon: Users,
  },
];

const RANGE_OPTIONS = ["Last 3 months", "Last 6 months", "Last 12 months", "All time"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(val: number, prefix = "", suffix = "") {
  if (val >= 1_000_000) return `${prefix}${(val / 1_000_000).toFixed(1)}M${suffix}`;
  if (val >= 1_000) return `${prefix}${(val / 1_000).toFixed(1)}K${suffix}`;
  return `${prefix}${val.toFixed(suffix === "%" ? 1 : 0)}${suffix}`;
}

function retentionColor(val: number | null) {
  if (val === null) return "bg-slate-800/60 text-slate-600";
  if (val >= 85) return "bg-emerald-500/20 text-emerald-400";
  if (val >= 75) return "bg-indigo-500/20 text-indigo-400";
  if (val >= 65) return "bg-amber-500/20 text-amber-400";
  return "bg-rose-500/20 text-rose-400";
}

const planColors: Record<string, string> = {
  Enterprise: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Pro: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Free: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="text-white font-semibold">${(p.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RevenueMRRARRChurnPage() {
  const [range, setRange] = useState("Last 12 months");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "churn" | "cohort">("overview");

  const displayData =
    range === "Last 3 months"
      ? MRR_HISTORY.slice(-3)
      : range === "Last 6 months"
      ? MRR_HISTORY.slice(-6)
      : MRR_HISTORY;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                Revenue Breakdown
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm">
                MRR, ARR, and churn analysis — December 2024
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Range Picker */}
              <div className="relative">
                <button
                  onClick={() => setRangeOpen((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-slate-300 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all"
                >
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  {range}
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${rangeOpen ? "rotate-180" : ""}`} />
                </button>
                {rangeOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                    {RANGE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setRange(opt); setRangeOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${range === opt ? "text-indigo-300 bg-indigo-500/10" : "text-slate-300 hover:bg-white/[0.05]"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
        >
          {KPI_CARDS.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isGoodPositive = card.title !== "Churned MRR" && card.title !== "MRR Churn Rate" ? isPositive : !isPositive;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} p-4 overflow-hidden cursor-default`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-slate-400 font-medium leading-tight">{card.title}</p>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${card.color}22` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">
                  {fmt(card.value, card.prefix ?? "", card.suffix ?? "")}
                </p>
                <div className={`flex items-center gap-1 text-xs font-medium ${isGoodPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(card.change)}% {card.changeLabel}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-1 p-1 bg-white/[0.04] border border-white/[0.06] rounded-xl w-fit mb-6"
        >
          {(["overview", "churn", "cohort"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "overview" ? "MRR / ARR" : tab === "churn" ? "Churn Analysis" : "Cohort Retention"}
            </button>
          ))}
        </motion.div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* MRR Growth Chart */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-white">MRR Growth</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Monthly recurring revenue over time</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  +105.5% YoY
                </span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={displayData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8", paddingTop: 12 }} />
                  <Area type="monotone" dataKey="mrr" name="MRR" stroke="#6366f1" strokeWidth={2.5} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                  <Area type="monotone" dataKey="arr" name="ARR" stroke="#8b5cf6" strokeWidth={2} fill="url(#arrGrad)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6" }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* MRR Waterfall */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
            >
              <div className="mb-6">
                <h2 className="text-base font-semibold text-white">MRR Movement</h2>
                <p className="text-xs text-slate-500 mt-0.5">New, expansion, and churned MRR breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={displayData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8", paddingTop: 12 }} />
                  <Bar dataKey="newMRR" name="New MRR" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="expansionMRR" name="Expansion MRR" fill="#10b981" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="churnedMRR" name="Churned MRR" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Summary Table */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <h2 className="text-base font-semibold text-white">Monthly Revenue Summary</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {["Month", "MRR", "ARR", "New MRR", "Expansion", "Churned", "Net New MRR"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...displayData].reverse().map((row, i) => (
                      <motion.tr
                        key={row.month}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-5 py-3 font-medium text-slate-200">{row.month}</td>
                        <td className="px-5 py-3 text-indigo-300 font-semibold">${(row.mrr ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-violet-300 font-semibold">${(row.arr ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-slate-300">${(row.newMRR ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-emerald-400">${(row.expansionMRR ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-rose-400">${(row.churnedMRR ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <span className="text-emerald-400 font-semibold">${(row.netNewMRR ?? 0).toLocaleString()}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Churn Tab ── */}
        {activeTab === "churn" && (
          <motion.div
            key="churn"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Churn by Plan Pie */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
              >
                <h2 className="text-base font-semibold text-white mb-1">Churn Rate by Plan</h2>
                <p className="text-xs text-slate-500 mb-6">Monthly customer churn rate per tier</p>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={CHURN_BY_PLAN}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {CHURN_BY_PLAN.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: number) => [`${val}%`, "Churn Rate"]}
                        contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                        labelStyle={{ color: "#94a3b8" }}
                        itemStyle={{ color: "#e2e8f0" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 min-w-[120px]">
                    {CHURN_BY_PLAN.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        <span className="text-sm text-slate-400">{item.name}</span>
                        <span className="ml-auto text-sm font-semibold text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Churn Reasons */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
              >
                <h2 className="text-base font-semibold text-white mb-1">Churn Reasons</h2>
                <p className="text-xs text-slate-500 mb-6">Exit survey responses from churned accounts</p>
                <div className="space-y-4">
                  {CHURN_REASONS.map((item) => (
                    <div key={item.reason}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-slate-300">{item.reason}</span>
                        <span className="text-xs text-slate-500">{item.count} accounts ({item.pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Churns Table */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">Recent Churns</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Accounts lost in the last 30 days</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-indigo-500/30">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {["ID", "Company", "Plan", "Lost MRR", "Reason", "Date", "CSM"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_CHURNS.map((row, i) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-5 py-3 text-slate-500 font-mono text-xs">{row.id}</td>
                        <td className="px-5 py-3 font-medium text-slate-200">{row.company}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${planColors[row.plan] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                            {row.plan}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-rose-400 font-semibold">-${(row.mrr ?? 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-slate-400">{row.reason}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs">{row.date}</td>
                        <td className="px-5 py-3 text-slate-400">{row.csm}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Cohort Tab ── */}
        {activeTab === "cohort" && (
          <motion.div
            key="cohort"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <h2 className="text-base font-semibold text-white">Cohort Retention Analysis</h2>
                <p className="text-xs text-slate-500 mt-0.5">Percentage of customers retained by signup cohort</p>
              </div>
              <div className="overflow-x-auto p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-4 pr-4">Cohort</th>
                      {["M0", "M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
                        <th key={m} className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-4 px-2">{m}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {COHORT_RETENTION.map((row, i) => (
                      <motion.tr
                        key={row.cohort}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <td className="pr-4 py-2 text-slate-300 font-medium text-xs whitespace-nowrap">{row.cohort}</td>
                        {([row.m0, row.m1, row.m2, row.m3, row.m4, row.m5, row.m6] as (number | null)[]).map((val, j) => (
                          <td key={j} className="px-2 py-2 text-center">
                            <span className={`inline-block w-14 py-1.5 rounded-lg text-xs font-semibold ${retentionColor(val)}`}>
                              {val !== null ? `${val}%` : "—"}
                            </span>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 pb-5 flex items-center gap-4 flex-wrap">
                <span className="text-xs text-slate-500">Legend:</span>
                {[
                  { label: "≥ 85%", cls: "bg-emerald-500/20 text-emerald-400" },
                  { label: "75–84%", cls: "bg-indigo-500/20 text-indigo-400" },
                  { label: "65–74%", cls: "bg-amber-500/20 text-amber-400" },
                  { label: "< 65%", cls: "bg-rose-500/20 text-rose-400" },
                ].map((l) => (
                  <span key={l.label} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${l.cls}`}>{l.label}</span>
                ))}
              </div>
            </motion.div>

            {/* Retention Trend Chart */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
            >
              <h2 className="text-base font-semibold text-white mb-1">Average Retention by Month</h2>
              <p className="text-xs text-slate-500 mb-6">Blended retention across all cohorts</p>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={[
                    { month: "M0", retention: 100 },
                    { month: "M1", retention: 89.5 },
                    { month: "M2", retention: 82.5 },
                    { month: "M3", retention: 77 },
                    { month: "M4", retention: 73 },
                    { month: "M5", retention: 69 },
                    { month: "M6", retention: 67.5 },
                  ]}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, "Avg Retention"]}
                    contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: "#94a3b8" }}
                    itemStyle={{ color: "#e2e8f0" }}
                  />
                  <Area type="monotone" dataKey="retention" name="Retention" stroke="#6366f1" strokeWidth={2.5} fill="url(#retGrad)" dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Insight Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { label: "Avg M1 Retention", value: "89.5%", note: "First-month survival rate", color: "text-emerald-400", border: "border-emerald-500/20", bg: "from-emerald-500/10 to-emerald-500/5" },
                { label: "Avg M3 Retention", value: "77.0%", note: "3-month survival rate", color: "text-indigo-400", border: "border-indigo-500/20", bg: "from-indigo-500/10 to-indigo-500/5" },
                { label: "Avg M6 Retention", value: "67.5%", note: "6-month survival rate", color: "text-violet-400", border: "border-violet-500/20", bg: "from-violet-500/10 to-violet-500/5" },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  variants={scaleIn}
                  whileHover={{ y: -3 }}
                  className={`rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} p-5`}
                >
                  <p className="text-xs text-slate-500 mb-2">{card.label}</p>
                  <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{card.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}