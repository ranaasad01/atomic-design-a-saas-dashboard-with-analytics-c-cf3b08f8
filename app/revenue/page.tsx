"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
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
import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, XCircle, RefreshCw, Filter, Download } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    title: "Monthly Recurring Revenue",
    value: 87420,
    prefix: "$",
    change: 12.4,
    changeLabel: "vs last month",
    color: "#6366f1",
    icon: DollarSign,
    gradient: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    title: "Annual Recurring Revenue",
    value: 1049040,
    prefix: "$",
    change: 18.7,
    changeLabel: "vs last year",
    color: "#8b5cf6",
    icon: TrendingUp,
    gradient: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
  },
  {
    title: "Churn Rate",
    value: 2.3,
    suffix: "%",
    change: -0.4,
    changeLabel: "vs last month",
    color: "#f43f5e",
    icon: TrendingDown,
    gradient: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/20",
  },
  {
    title: "Avg Revenue Per User",
    value: 148,
    prefix: "$",
    change: 5.2,
    changeLabel: "vs last month",
    color: "#10b981",
    icon: Users,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
];

const MRR_ARR_DATA = [
  { label: "Jan", mrr: 54200, arr: 650400 },
  { label: "Feb", mrr: 58900, arr: 706800 },
  { label: "Mar", mrr: 61400, arr: 736800 },
  { label: "Apr", mrr: 65800, arr: 789600 },
  { label: "May", mrr: 70200, arr: 842400 },
  { label: "Jun", mrr: 73500, arr: 882000 },
  { label: "Jul", mrr: 76100, arr: 913200 },
  { label: "Aug", mrr: 79400, arr: 952800 },
  { label: "Sep", mrr: 81900, arr: 982800 },
  { label: "Oct", mrr: 83600, arr: 1003200 },
  { label: "Nov", mrr: 85200, arr: 1022400 },
  { label: "Dec", mrr: 87420, arr: 1049040 },
];

const PLAN_REVENUE_DATA = [
  { name: "Starter", value: 14260, color: "#6366f1" },
  { name: "Pro", value: 38940, color: "#8b5cf6" },
  { name: "Enterprise", value: 34220, color: "#10b981" },
];

const TRANSACTIONS = [
  {
    id: "TXN-8821",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 1200,
    plan: "Enterprise",
    status: "Paid",
    date: "2024-12-15",
  },
  {
    id: "TXN-8820",
    customer: "Nova Labs",
    email: "finance@novalabs.io",
    amount: 299,
    plan: "Pro",
    status: "Paid",
    date: "2024-12-14",
  },
  {
    id: "TXN-8819",
    customer: "Bright Minds",
    email: "admin@brightminds.co",
    amount: 49,
    plan: "Starter",
    status: "Paid",
    date: "2024-12-14",
  },
  {
    id: "TXN-8818",
    customer: "Vertex Systems",
    email: "ops@vertexsys.com",
    amount: 1200,
    plan: "Enterprise",
    status: "Pending",
    date: "2024-12-13",
  },
  {
    id: "TXN-8817",
    customer: "Skyline Digital",
    email: "pay@skylinedigital.com",
    amount: 299,
    plan: "Pro",
    status: "Paid",
    date: "2024-12-13",
  },
  {
    id: "TXN-8816",
    customer: "Orbit Analytics",
    email: "billing@orbitanalytics.ai",
    amount: 299,
    plan: "Pro",
    status: "Failed",
    date: "2024-12-12",
  },
  {
    id: "TXN-8815",
    customer: "Cascade Media",
    email: "accounts@cascademedia.net",
    amount: 49,
    plan: "Starter",
    status: "Refunded",
    date: "2024-12-12",
  },
  {
    id: "TXN-8814",
    customer: "Pinnacle SaaS",
    email: "cfo@pinnaclesaas.com",
    amount: 1200,
    plan: "Enterprise",
    status: "Paid",
    date: "2024-12-11",
  },
  {
    id: "TXN-8813",
    customer: "Ember Studio",
    email: "hello@emberstudio.design",
    amount: 49,
    plan: "Starter",
    status: "Paid",
    date: "2024-12-11",
  },
  {
    id: "TXN-8812",
    customer: "Quantum Leap Inc",
    email: "finance@quantumleap.io",
    amount: 299,
    plan: "Pro",
    status: "Pending",
    date: "2024-12-10",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

function formatValue(val: number, prefix?: string, suffix?: string): string {
  const formatted =
    val >= 1_000_000
      ? `${(val / 1_000_000).toFixed(2)}M`
      : val >= 1_000
      ? `${(val / 1_000).toFixed(1)}K`
      : val % 1 !== 0
      ? val.toFixed(1)
      : val.toFixed(0);
  return `${prefix ?? ""}${formatted}${suffix ?? ""}`;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  Paid: { label: "Paid", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle },
  Pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: Clock },
  Failed: { label: "Failed", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", icon: XCircle },
  Refunded: { label: "Refunded", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20", icon: RefreshCw },
};

const PLAN_COLORS: Record<string, string> = {
  Starter: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Pro: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Enterprise: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomAreaTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(entry.value ?? 0)}</span>
        </div>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  const total = PLAN_REVENUE_DATA.reduce((s, d) => s + d.value, 0);
  const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-white font-semibold">{item.name}</p>
      <p className="text-slate-300">{formatCurrency(item.value ?? 0)}</p>
      <p className="text-slate-500">{pct}% of total</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [chartRange, setChartRange] = useState<"6M" | "12M">("12M");

  const filteredTransactions = (TRANSACTIONS ?? []).filter(
    (tx) => statusFilter === "All" || tx.status === statusFilter
  );

  const displayedMRRData =
    chartRange === "6M" ? MRR_ARR_DATA.slice(6) : MRR_ARR_DATA;

  const totalRevenue = PLAN_REVENUE_DATA.reduce((s, d) => s + (d.value ?? 0), 0);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Revenue
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm">
                Financial performance, subscription metrics, and transaction history.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition-all self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        >
          {(KPI_CARDS ?? []).map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.title === "Churn Rate";
            const goodChange = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl border ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-sm p-5 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs font-medium text-slate-400 leading-tight max-w-[140px]">
                    {card.title}
                  </p>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.color}22` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: card.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {formatValue(card.value, card.prefix, card.suffix)}
                </p>
                <div className="flex items-center gap-1.5">
                  {goodChange ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      goodChange ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {Math.abs(card.change)}%
                  </span>
                  <span className="text-xs text-slate-500">{card.changeLabel}</span>
                </div>
                {/* Decorative circle */}
                <div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
                  style={{ background: card.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* MRR vs ARR Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">MRR vs ARR</h2>
                <p className="text-xs text-slate-500 mt-0.5">Monthly and annual recurring revenue trend</p>
              </div>
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-1">
                {(["6M", "12M"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setChartRange(r)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      chartRange === r
                        ? "bg-indigo-500 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={displayedMRRData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
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
                  tickFormatter={(v) => formatCurrency(v)}
                  width={60}
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#mrrGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="arr"
                  name="ARR"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#arrGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue by Plan Donut */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">Revenue by Plan</h2>
              <p className="text-xs text-slate-500 mt-0.5">Distribution across subscription tiers</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={PLAN_REVENUE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {PLAN_REVENUE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="mt-4 space-y-2.5">
              {(PLAN_REVENUE_DATA ?? []).map((item) => {
                const pct = totalRevenue > 0 ? ((item.value / totalRevenue) * 100).toFixed(1) : "0";
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      <span className="text-sm text-slate-300">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{pct}%</span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(item.value ?? 0)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-500">Total MRR</span>
              <span className="text-base font-bold text-white">
                {formatCurrency(totalRevenue)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-white/[0.06]">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
                {statusFilter !== "All" ? ` · ${statusFilter}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-1">
                {(["All", "Paid", "Pending", "Failed", "Refunded"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      statusFilter === s
                        ? "bg-indigo-500 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {["Transaction ID", "Customer", "Date", "Plan", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filteredTransactions ?? []).map((tx, i) => {
                  const statusCfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG["Pending"];
                  const StatusIcon = statusCfg.icon;
                  const planClass = PLAN_COLORS[tx.plan] ?? "text-slate-400 bg-slate-500/10 border-slate-500/20";
                  return (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">{tx.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{tx.customer}</p>
                          <p className="text-xs text-slate-500">{tx.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{tx.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${planClass}`}
                        >
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${statusCfg.bg} ${statusCfg.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusCfg.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/[0.05]">
            {(filteredTransactions ?? []).map((tx, i) => {
              const statusCfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG["Pending"];
              const StatusIcon = statusCfg.icon;
              const planClass = PLAN_COLORS[tx.plan] ?? "text-slate-400 bg-slate-500/10 border-slate-500/20";
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{tx.customer}</p>
                      <p className="text-xs text-slate-500">{tx.email}</p>
                    </div>
                    <span className="text-sm font-bold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-500">{tx.id}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{tx.date}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${planClass}`}
                    >
                      {tx.plan}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border ${statusCfg.bg} ${statusCfg.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-500 text-sm">No transactions match the selected filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}