"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, Users, MousePointerClick, ArrowUp, ArrowDown, Activity, Filter } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type DateRange = "7d" | "30d" | "90d" | "1y";

interface ActiveUserPoint {
  date: string;
  activeUsers: number;
  sessions: number;
}

interface UserTypePoint {
  date: string;
  newUsers: number;
  returningUsers: number;
}

interface FunnelPoint {
  stage: string;
  count: number;
  rate: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ACTIVE_USERS_7D: ActiveUserPoint[] = [
  { date: "Mon", activeUsers: 3420, sessions: 5100 },
  { date: "Tue", activeUsers: 3870, sessions: 5800 },
  { date: "Wed", activeUsers: 4210, sessions: 6300 },
  { date: "Thu", activeUsers: 3990, sessions: 5950 },
  { date: "Fri", activeUsers: 4580, sessions: 6800 },
  { date: "Sat", activeUsers: 3100, sessions: 4600 },
  { date: "Sun", activeUsers: 2890, sessions: 4200 },
];

const ACTIVE_USERS_30D: ActiveUserPoint[] = [
  { date: "Jan 1", activeUsers: 2800, sessions: 4200 },
  { date: "Jan 5", activeUsers: 3100, sessions: 4700 },
  { date: "Jan 10", activeUsers: 3450, sessions: 5200 },
  { date: "Jan 15", activeUsers: 3200, sessions: 4800 },
  { date: "Jan 20", activeUsers: 3900, sessions: 5900 },
  { date: "Jan 25", activeUsers: 4200, sessions: 6300 },
  { date: "Jan 30", activeUsers: 4580, sessions: 6900 },
];

const ACTIVE_USERS_90D: ActiveUserPoint[] = [
  { date: "Oct", activeUsers: 2100, sessions: 3200 },
  { date: "Oct W2", activeUsers: 2400, sessions: 3600 },
  { date: "Oct W3", activeUsers: 2700, sessions: 4100 },
  { date: "Oct W4", activeUsers: 2900, sessions: 4400 },
  { date: "Nov W1", activeUsers: 3100, sessions: 4700 },
  { date: "Nov W2", activeUsers: 3400, sessions: 5100 },
  { date: "Nov W3", activeUsers: 3600, sessions: 5400 },
  { date: "Nov W4", activeUsers: 3800, sessions: 5700 },
  { date: "Dec W1", activeUsers: 4000, sessions: 6000 },
  { date: "Dec W2", activeUsers: 4200, sessions: 6300 },
  { date: "Dec W3", activeUsers: 4500, sessions: 6800 },
  { date: "Dec W4", activeUsers: 4580, sessions: 6900 },
];

const ACTIVE_USERS_1Y: ActiveUserPoint[] = [
  { date: "Jan", activeUsers: 1800, sessions: 2700 },
  { date: "Feb", activeUsers: 2100, sessions: 3200 },
  { date: "Mar", activeUsers: 2400, sessions: 3600 },
  { date: "Apr", activeUsers: 2800, sessions: 4200 },
  { date: "May", activeUsers: 3100, sessions: 4700 },
  { date: "Jun", activeUsers: 3400, sessions: 5100 },
  { date: "Jul", activeUsers: 3700, sessions: 5600 },
  { date: "Aug", activeUsers: 3900, sessions: 5900 },
  { date: "Sep", activeUsers: 4100, sessions: 6200 },
  { date: "Oct", activeUsers: 4300, sessions: 6500 },
  { date: "Nov", activeUsers: 4450, sessions: 6700 },
  { date: "Dec", activeUsers: 4580, sessions: 6900 },
];

const USER_TYPE_7D: UserTypePoint[] = [
  { date: "Mon", newUsers: 820, returningUsers: 2600 },
  { date: "Tue", newUsers: 940, returningUsers: 2930 },
  { date: "Wed", newUsers: 1100, returningUsers: 3110 },
  { date: "Thu", newUsers: 980, returningUsers: 3010 },
  { date: "Fri", newUsers: 1250, returningUsers: 3330 },
  { date: "Sat", newUsers: 700, returningUsers: 2400 },
  { date: "Sun", newUsers: 620, returningUsers: 2270 },
];

const USER_TYPE_30D: UserTypePoint[] = [
  { date: "Jan 1", newUsers: 600, returningUsers: 2200 },
  { date: "Jan 5", newUsers: 720, returningUsers: 2380 },
  { date: "Jan 10", newUsers: 850, returningUsers: 2600 },
  { date: "Jan 15", newUsers: 780, returningUsers: 2420 },
  { date: "Jan 20", newUsers: 960, returningUsers: 2940 },
  { date: "Jan 25", newUsers: 1100, returningUsers: 3100 },
  { date: "Jan 30", newUsers: 1250, returningUsers: 3330 },
];

const USER_TYPE_90D: UserTypePoint[] = [
  { date: "Oct", newUsers: 480, returningUsers: 1620 },
  { date: "Oct W2", newUsers: 560, returningUsers: 1840 },
  { date: "Oct W3", newUsers: 640, returningUsers: 2060 },
  { date: "Oct W4", newUsers: 700, returningUsers: 2200 },
  { date: "Nov W1", newUsers: 760, returningUsers: 2340 },
  { date: "Nov W2", newUsers: 840, returningUsers: 2560 },
  { date: "Nov W3", newUsers: 900, returningUsers: 2700 },
  { date: "Nov W4", newUsers: 960, returningUsers: 2840 },
  { date: "Dec W1", newUsers: 1020, returningUsers: 2980 },
  { date: "Dec W2", newUsers: 1100, returningUsers: 3100 },
  { date: "Dec W3", newUsers: 1180, returningUsers: 3320 },
  { date: "Dec W4", newUsers: 1250, returningUsers: 3330 },
];

const USER_TYPE_1Y: UserTypePoint[] = [
  { date: "Jan", newUsers: 380, returningUsers: 1420 },
  { date: "Feb", newUsers: 460, returningUsers: 1640 },
  { date: "Mar", newUsers: 540, returningUsers: 1860 },
  { date: "Apr", newUsers: 640, returningUsers: 2160 },
  { date: "May", newUsers: 740, returningUsers: 2360 },
  { date: "Jun", newUsers: 840, returningUsers: 2560 },
  { date: "Jul", newUsers: 940, returningUsers: 2760 },
  { date: "Aug", newUsers: 1000, returningUsers: 2900 },
  { date: "Sep", newUsers: 1060, returningUsers: 3040 },
  { date: "Oct", newUsers: 1120, returningUsers: 3180 },
  { date: "Nov", newUsers: 1180, returningUsers: 3270 },
  { date: "Dec", newUsers: 1250, returningUsers: 3330 },
];

const FUNNEL_7D: FunnelPoint[] = [
  { stage: "Page Views", count: 48200, rate: 100 },
  { stage: "Sign-up Click", count: 12400, rate: 25.7 },
  { stage: "Form Started", count: 8900, rate: 18.5 },
  { stage: "Form Submitted", count: 5600, rate: 11.6 },
  { stage: "Email Verified", count: 4100, rate: 8.5 },
  { stage: "Onboarded", count: 2800, rate: 5.8 },
];

const FUNNEL_30D: FunnelPoint[] = [
  { stage: "Page Views", count: 198000, rate: 100 },
  { stage: "Sign-up Click", count: 52000, rate: 26.3 },
  { stage: "Form Started", count: 37000, rate: 18.7 },
  { stage: "Form Submitted", count: 23000, rate: 11.6 },
  { stage: "Email Verified", count: 17000, rate: 8.6 },
  { stage: "Onboarded", count: 11500, rate: 5.8 },
];

const FUNNEL_90D: FunnelPoint[] = [
  { stage: "Page Views", count: 580000, rate: 100 },
  { stage: "Sign-up Click", count: 148000, rate: 25.5 },
  { stage: "Form Started", count: 104000, rate: 17.9 },
  { stage: "Form Submitted", count: 66000, rate: 11.4 },
  { stage: "Email Verified", count: 48000, rate: 8.3 },
  { stage: "Onboarded", count: 32000, rate: 5.5 },
];

const FUNNEL_1Y: FunnelPoint[] = [
  { stage: "Page Views", count: 2100000, rate: 100 },
  { stage: "Sign-up Click", count: 540000, rate: 25.7 },
  { stage: "Form Started", count: 380000, rate: 18.1 },
  { stage: "Form Submitted", count: 240000, rate: 11.4 },
  { stage: "Email Verified", count: 174000, rate: 8.3 },
  { stage: "Onboarded", count: 116000, rate: 5.5 },
];

// ─── KPI Summary Data ─────────────────────────────────────────────────────────
const KPI_DATA: Record<DateRange, { activeUsers: number; sessions: number; newUsers: number; conversionRate: number; activeChange: number; sessionsChange: number; newUsersChange: number; conversionChange: number }> = {
  "7d": { activeUsers: 4580, sessions: 6900, newUsers: 1250, conversionRate: 5.8, activeChange: 12.4, sessionsChange: 8.7, newUsersChange: 18.2, conversionChange: -1.3 },
  "30d": { activeUsers: 4580, sessions: 6900, newUsers: 11500, conversionRate: 5.8, activeChange: 22.1, sessionsChange: 15.4, newUsersChange: 31.6, conversionChange: 2.1 },
  "90d": { activeUsers: 4580, sessions: 6900, newUsers: 32000, conversionRate: 5.5, activeChange: 38.4, sessionsChange: 29.7, newUsersChange: 44.2, conversionChange: -0.8 },
  "1y": { activeUsers: 4580, sessions: 6900, newUsers: 116000, conversionRate: 5.5, activeChange: 154.4, sessionsChange: 155.6, newUsersChange: 229.0, conversionChange: 1.4 },
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, change, icon: Icon, color }: { title: string; value: string; change: number; icon: React.ElementType; color: string }) {
  const isPositive = change >= 0;
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative bg-[#1e293b]/60 border border-white/[0.07] rounded-2xl p-5 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
            {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            <span>{Math.abs(change).toFixed(1)}% vs prior period</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chart Card Wrapper ───────────────────────────────────────────────────────
function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-[#1e293b]/60 border border-white/[0.07] rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="mb-5">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("30d");

  const ranges: { label: string; value: DateRange }[] = [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
    { label: "1 Year", value: "1y" },
  ];

  const activeUsersData = useMemo(() => {
    if (range === "7d") return ACTIVE_USERS_7D;
    if (range === "30d") return ACTIVE_USERS_30D;
    if (range === "90d") return ACTIVE_USERS_90D;
    return ACTIVE_USERS_1Y;
  }, [range]);

  const userTypeData = useMemo(() => {
    if (range === "7d") return USER_TYPE_7D;
    if (range === "30d") return USER_TYPE_30D;
    if (range === "90d") return USER_TYPE_90D;
    return USER_TYPE_1Y;
  }, [range]);

  const funnelData = useMemo(() => {
    if (range === "7d") return FUNNEL_7D;
    if (range === "30d") return FUNNEL_30D;
    if (range === "90d") return FUNNEL_90D;
    return FUNNEL_1Y;
  }, [range]);

  const kpi = KPI_DATA[range];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Analytics</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Analytics Deep-Dive
              </h1>
              <p className="text-slate-400 mt-1.5 text-sm">
                Understand user behavior, acquisition trends, and conversion performance across your product.
              </p>
            </div>

            {/* Date Range Picker */}
            <motion.div variants={scaleIn} className="flex items-center gap-1.5 bg-[#1e293b]/80 border border-white/[0.08] rounded-xl p-1 backdrop-blur-sm">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
              {ranges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    range === r.value
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            title="Active Users"
            value={(kpi.activeUsers ?? 0).toLocaleString()}
            change={kpi.activeChange ?? 0}
            icon={Users}
            color="#6366f1"
          />
          <StatCard
            title="Total Sessions"
            value={(kpi.sessions ?? 0).toLocaleString()}
            change={kpi.sessionsChange ?? 0}
            icon={Activity}
            color="#8b5cf6"
          />
          <StatCard
            title="New Users"
            value={(kpi.newUsers ?? 0).toLocaleString()}
            change={kpi.newUsersChange ?? 0}
            icon={TrendingUp}
            color="#06b6d4"
          />
          <StatCard
            title="Conversion Rate"
            value={`${(kpi.conversionRate ?? 0).toFixed(1)}%`}
            change={kpi.conversionChange ?? 0}
            icon={MousePointerClick}
            color="#10b981"
          />
        </motion.div>

        {/* ── Area Chart: Active Users Trend ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6"
        >
          <ChartCard
            title="Active Users Trend"
            subtitle={`Daily active users and sessions over the selected ${range} period`}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={activeUsersData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradActiveUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }} />
                <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradActiveUsers)" dot={false} activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#8b5cf6" strokeWidth={2} fill="url(#gradSessions)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* ── Two-column: Line Chart + Insight Panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Line Chart: New vs Returning */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2"
          >
            <ChartCard
              title="New vs Returning Users"
              subtitle="Acquisition vs retention split across the selected period"
            >
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={userTypeData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }} />
                  <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#06b6d4" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#06b6d4", stroke: "#fff", strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="returningUsers" name="Returning Users" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          {/* Insight Panel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="bg-[#1e293b]/60 border border-white/[0.07] rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-base font-semibold text-white mb-1">Audience Insights</h3>
              <p className="text-xs text-slate-500 mb-5">Breakdown of your user base composition</p>

              {/* Ratio bar */}
              {(() => {
                const lastPoint = userTypeData[userTypeData.length - 1];
                const total = (lastPoint?.newUsers ?? 0) + (lastPoint?.returningUsers ?? 0);
                const newPct = total > 0 ? Math.round(((lastPoint?.newUsers ?? 0) / total) * 100) : 0;
                const retPct = 100 - newPct;
                return (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>New</span>
                      <span>Returning</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden flex">
                      <div className="h-full rounded-l-full bg-cyan-500 transition-all duration-500" style={{ width: `${newPct}%` }} />
                      <div className="h-full rounded-r-full bg-emerald-500 transition-all duration-500" style={{ width: `${retPct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs font-semibold mt-1.5">
                      <span className="text-cyan-400">{newPct}%</span>
                      <span className="text-emerald-400">{retPct}%</span>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-3 flex-1">
                {[
                  { label: "Avg. Session Duration", value: "4m 32s", color: "#6366f1" },
                  { label: "Pages per Session", value: "3.8", color: "#8b5cf6" },
                  { label: "Bounce Rate", value: "38.2%", color: "#f59e0b" },
                  { label: "Retention (D7)", value: "62.4%", color: "#10b981" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-400">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bar Chart: Conversion Funnel ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6"
        >
          <ChartCard
            title="Event & Conversion Funnel"
            subtitle="Step-by-step drop-off from first visit to successful onboarding"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart */}
              <div className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={funnelData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barSize={36}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="stage" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Users" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Funnel Steps */}
              <div className="flex flex-col justify-center gap-2">
                {funnelData.map((step, i) => (
                  <div key={step.stage} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-indigo-400">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-slate-400 truncate">{step.stage}</span>
                        <span className="text-xs font-semibold text-white ml-2">{(step.rate ?? 0).toFixed(1)}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${step.rate ?? 0}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </motion.div>

        {/* ── Top Events Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="bg-[#1e293b]/60 border border-white/[0.07] rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold text-white">Top Tracked Events</h3>
                <p className="text-xs text-slate-500 mt-0.5">Most triggered events in the selected period</p>
              </div>
              <span className="text-xs text-indigo-400 font-medium bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                {range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : range === "90d" ? "Last 90 days" : "Last 12 months"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Event Name", "Category", "Triggers", "Unique Users", "Trend"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4 last:pr-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { event: "page_view", category: "Navigation", triggers: 48200, users: 4580, trend: 12.4 },
                    { event: "button_click", category: "Interaction", triggers: 31400, users: 3920, trend: 8.1 },
                    { event: "form_submit", category: "Conversion", triggers: 5600, users: 2100, trend: 22.7 },
                    { event: "video_play", category: "Engagement", triggers: 14200, users: 3100, trend: -3.2 },
                    { event: "signup_start", category: "Acquisition", triggers: 12400, users: 4200, trend: 18.2 },
                    { event: "checkout_begin", category: "Revenue", triggers: 3800, users: 1800, trend: 5.6 },
                    { event: "feature_used", category: "Retention", triggers: 22100, users: 3400, trend: 31.4 },
                  ].map((row, i) => (
                    <motion.tr
                      key={row.event}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                      className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <code className="text-indigo-300 text-xs bg-indigo-500/10 px-2 py-0.5 rounded font-mono">{row.event}</code>
                      </td>
                      <td className="py-3 pr-4 text-slate-400 text-xs">{row.category}</td>
                      <td className="py-3 pr-4 text-white font-semibold">{(row.triggers ?? 0).toLocaleString()}</td>
                      <td className="py-3 pr-4 text-slate-300">{(row.users ?? 0).toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`flex items-center gap-1 text-xs font-semibold ${row.trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {row.trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {Math.abs(row.trend).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}