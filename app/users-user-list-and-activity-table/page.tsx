"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, User, Mail, Calendar, Clock, Star, Activity, ChevronDown, ChevronUp, Eye, Edit, Trash2, Check, X, ArrowUp, ArrowDown, Circle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USERS = [
  { id: "u001", name: "Alexandra Chen", email: "alex.chen@techcorp.io", plan: "Enterprise", status: "Active", mrr: 1200, joinedAt: "2023-01-15", lastSeen: "2 min ago", avatar: "AC", country: "US", sessions: 342, pageViews: 8920 },
  { id: "u002", name: "Marcus Williams", email: "m.williams@startup.co", plan: "Pro", status: "Active", mrr: 79, joinedAt: "2023-03-22", lastSeen: "1h ago", avatar: "MW", country: "GB", sessions: 128, pageViews: 3410 },
  { id: "u003", name: "Priya Sharma", email: "priya@designstudio.in", plan: "Pro", status: "Active", mrr: 79, joinedAt: "2023-05-10", lastSeen: "3h ago", avatar: "PS", country: "IN", sessions: 95, pageViews: 2780 },
  { id: "u004", name: "James O'Brien", email: "james@fintech.eu", plan: "Enterprise", status: "Active", mrr: 1200, joinedAt: "2022-11-08", lastSeen: "Yesterday", avatar: "JO", country: "IE", sessions: 512, pageViews: 14200 },
  { id: "u005", name: "Sofia Rossi", email: "sofia.rossi@agency.it", plan: "Free", status: "Inactive", mrr: 0, joinedAt: "2024-01-03", lastSeen: "5 days ago", avatar: "SR", country: "IT", sessions: 12, pageViews: 340 },
  { id: "u006", name: "David Kim", email: "dkim@saasventures.kr", plan: "Pro", status: "Active", mrr: 79, joinedAt: "2023-07-19", lastSeen: "30 min ago", avatar: "DK", country: "KR", sessions: 201, pageViews: 5670 },
  { id: "u007", name: "Amara Osei", email: "amara@growthco.gh", plan: "Free", status: "Active", mrr: 0, joinedAt: "2024-02-14", lastSeen: "2h ago", avatar: "AO", country: "GH", sessions: 34, pageViews: 890 },
  { id: "u008", name: "Lucas Müller", email: "l.muller@enterprise.de", plan: "Enterprise", status: "Active", mrr: 1200, joinedAt: "2022-08-30", lastSeen: "Just now", avatar: "LM", country: "DE", sessions: 678, pageViews: 19800 },
  { id: "u009", name: "Yuki Tanaka", email: "yuki.t@mediagroup.jp", plan: "Pro", status: "Churned", mrr: 0, joinedAt: "2023-02-28", lastSeen: "3 weeks ago", avatar: "YT", country: "JP", sessions: 67, pageViews: 1890 },
  { id: "u010", name: "Rachel Torres", email: "r.torres@consulting.mx", plan: "Pro", status: "Active", mrr: 79, joinedAt: "2023-09-05", lastSeen: "4h ago", avatar: "RT", country: "MX", sessions: 156, pageViews: 4230 },
  { id: "u011", name: "Ethan Brooks", email: "ethan@devtools.io", plan: "Enterprise", status: "Active", mrr: 1200, joinedAt: "2022-12-01", lastSeen: "1h ago", avatar: "EB", country: "US", sessions: 445, pageViews: 12300 },
  { id: "u012", name: "Nadia Petrov", email: "nadia.p@analytics.ru", plan: "Free", status: "Inactive", mrr: 0, joinedAt: "2024-03-20", lastSeen: "2 weeks ago", avatar: "NP", country: "RU", sessions: 8, pageViews: 210 },
];

const ACTIVITY_LOG = [
  { id: "a001", userId: "u001", user: "Alexandra Chen", action: "Upgraded plan", detail: "Free → Enterprise", time: "2 min ago", type: "upgrade" },
  { id: "a002", userId: "u008", user: "Lucas Müller", action: "Exported report", detail: "Q1 Revenue Report (PDF)", time: "8 min ago", type: "export" },
  { id: "a003", userId: "u006", user: "David Kim", action: "Invited team member", detail: "jin.park@saasventures.kr", time: "30 min ago", type: "invite" },
  { id: "a004", userId: "u002", user: "Marcus Williams", action: "Connected integration", detail: "Slack Workspace", time: "1h ago", type: "integration" },
  { id: "a005", userId: "u003", user: "Priya Sharma", action: "Created dashboard", detail: "Q2 Marketing KPIs", time: "2h ago", type: "create" },
  { id: "a006", userId: "u009", user: "Yuki Tanaka", action: "Cancelled subscription", detail: "Pro Plan — reason: cost", time: "3 weeks ago", type: "churn" },
  { id: "a007", userId: "u004", user: "James O'Brien", action: "API key generated", detail: "Production key #4", time: "Yesterday", type: "security" },
  { id: "a008", userId: "u010", user: "Rachel Torres", action: "Updated billing info", detail: "Visa ending 4242", time: "Yesterday", type: "billing" },
  { id: "a009", userId: "u011", user: "Ethan Brooks", action: "Enabled 2FA", detail: "Authenticator app", time: "2 days ago", type: "security" },
  { id: "a010", userId: "u007", user: "Amara Osei", action: "Signed up", detail: "Free plan via referral", time: "2 days ago", type: "signup" },
];

const GROWTH_DATA = [
  { label: "Jan", active: 210, churned: 12, new: 45 },
  { label: "Feb", active: 245, churned: 8, new: 52 },
  { label: "Mar", active: 290, churned: 15, new: 68 },
  { label: "Apr", active: 318, churned: 10, new: 55 },
  { label: "May", active: 362, churned: 18, new: 72 },
  { label: "Jun", active: 401, churned: 9, new: 61 },
  { label: "Jul", active: 445, churned: 14, new: 78 },
  { label: "Aug", active: 489, churned: 11, new: 83 },
  { label: "Sep", active: 532, churned: 20, new: 91 },
  { label: "Oct", active: 578, churned: 16, new: 88 },
  { label: "Nov", active: 621, churned: 13, new: 95 },
  { label: "Dec", active: 668, churned: 9, new: 102 },
];

const PLAN_DIST = [
  { label: "Free", value: 312, color: "#64748b" },
  { label: "Pro", value: 245, color: "#6366f1" },
  { label: "Enterprise", value: 111, color: "#8b5cf6" },
];

const STAT_CARDS = [
  { title: "Total Users", value: "668", change: 12.4, icon: User, color: "from-indigo-500 to-violet-600", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { title: "Active Users", value: "541", change: 8.7, icon: Activity, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { title: "Avg. Sessions", value: "214", change: 5.2, icon: Clock, color: "from-sky-500 to-blue-600", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { title: "Churned (30d)", value: "9", change: -18.2, icon: Star, color: "from-rose-500 to-pink-600", bg: "bg-rose-500/10", border: "border-rose-500/20" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_COLORS: Record<string, string> = {
  Free: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Pro: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Enterprise: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Inactive: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Churned: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  upgrade: "bg-emerald-500/20 text-emerald-400",
  export: "bg-sky-500/20 text-sky-400",
  invite: "bg-indigo-500/20 text-indigo-400",
  integration: "bg-violet-500/20 text-violet-400",
  create: "bg-teal-500/20 text-teal-400",
  churn: "bg-rose-500/20 text-rose-400",
  security: "bg-amber-500/20 text-amber-400",
  billing: "bg-orange-500/20 text-orange-400",
  signup: "bg-emerald-500/20 text-emerald-400",
};

type SortKey = "name" | "plan" | "status" | "mrr" | "joinedAt" | "sessions";
type SortDir = "asc" | "desc";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{(p.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "activity">("table");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filteredUsers = useMemo(() => {
    let list = [...USERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") list = list.filter((u) => u.plan === planFilter);
    if (statusFilter !== "All") list = list.filter((u) => u.status === statusFilter);
    list.sort((a, b) => {
      let av: string | number = a[sortKey] ?? "";
      let bv: string | number = b[sortKey] ?? "";
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [search, planFilter, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowDown className="w-3 h-3 text-slate-600" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3 h-3 text-indigo-400" />
      : <ArrowDown className="w-3 h-3 text-indigo-400" />;
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="mt-1 text-slate-400 text-sm">
                Monitor user activity, manage plans, and track engagement across your platform.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </motion.button>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative rounded-2xl border ${card.border} ${card.bg} p-5 overflow-hidden`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{card.title}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Growth Chart */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">User Growth</h2>
                <p className="text-xs text-slate-500 mt-0.5">Active, new, and churned users over 12 months</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={GROWTH_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8", paddingTop: 12 }} />
                <Area type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={2} fill="url(#gradActive)" name="Active" />
                <Area type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} fill="url(#gradNew)" name="New" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white">Plan Distribution</h2>
              <p className="text-xs text-slate-500 mt-0.5">Users by subscription tier</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={PLAN_DIST} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Users">
                  {PLAN_DIST.map((entry) => (
                    <rect key={entry.label} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {PLAN_DIST.map((p) => (
                <div key={p.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-slate-400">{p.label}</span>
                  </div>
                  <span className="text-white font-semibold">{p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
        >
          {/* Tab Bar + Filters */}
          <div className="border-b border-white/[0.06] px-6 pt-5 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 w-fit">
                {(["table", "activity"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "table" ? "User List" : "Activity Log"}
                  </button>
                ))}
              </div>

              {activeTab === "table" && (
                <div className="flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search users…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 w-44"
                    />
                  </div>
                  {/* Plan Filter */}
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50"
                  >
                    {["All", "Free", "Pro", "Enterprise"].map((p) => (
                      <option key={p} value={p} className="bg-[#1e293b]">{p}</option>
                    ))}
                  </select>
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50"
                  >
                    {["All", "Active", "Inactive", "Churned"].map((s) => (
                      <option key={s} value={s} className="bg-[#1e293b]">{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* ── User Table ── */}
          <AnimatePresence mode="wait">
            {activeTab === "table" && (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.05]">
                        {[
                          { label: "User", key: "name" as SortKey },
                          { label: "Plan", key: "plan" as SortKey },
                          { label: "Status", key: "status" as SortKey },
                          { label: "MRR", key: "mrr" as SortKey },
                          { label: "Sessions", key: "sessions" as SortKey },
                          { label: "Joined", key: "joinedAt" as SortKey },
                          { label: "Last Seen", key: null },
                          { label: "Actions", key: null },
                        ].map((col) => (
                          <th
                            key={col.label}
                            onClick={() => col.key && handleSort(col.key)}
                            className={`px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap ${col.key ? "cursor-pointer hover:text-slate-300 select-none" : ""}`}
                          >
                            <div className="flex items-center gap-1">
                              {col.label}
                              {col.key && <SortIcon col={col.key} />}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredUsers ?? []).map((user, i) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.25 }}
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                          className={`border-b border-white/[0.04] cursor-pointer transition-colors ${
                            selectedUser === user.id
                              ? "bg-indigo-500/10"
                              : "hover:bg-white/[0.03]"
                          }`}
                        >
                          {/* User */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                {user.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          {/* Plan */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${PLAN_COLORS[user.plan] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                              {user.plan}
                            </span>
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[user.status] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                              <Circle className="w-1.5 h-1.5 fill-current" />
                              {user.status}
                            </span>
                          </td>
                          {/* MRR */}
                          <td className="px-6 py-4 text-white font-semibold">
                            {user.mrr > 0 ? `$${(user.mrr ?? 0).toLocaleString()}` : <span className="text-slate-600">—</span>}
                          </td>
                          {/* Sessions */}
                          <td className="px-6 py-4 text-slate-300">
                            {(user.sessions ?? 0).toLocaleString()}
                          </td>
                          {/* Joined */}
                          <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                            {user.joinedAt}
                          </td>
                          {/* Last Seen */}
                          <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                            {user.lastSeen}
                          </td>
                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-sky-500/20 hover:text-sky-400 text-slate-500 flex items-center justify-center transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-500 flex items-center justify-center transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-rose-500/20 hover:text-rose-400 text-slate-500 flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredUsers.length === 0 && (
                    <div className="py-16 text-center text-slate-500">
                      <User className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No users match your filters.</p>
                    </div>
                  )}
                </div>

                {/* Table Footer */}
                <div className="px-6 py-3.5 border-t border-white/[0.05] flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Showing <span className="text-slate-300 font-medium">{filteredUsers.length}</span> of <span className="text-slate-300 font-medium">{USERS.length}</span> users
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((p) => (
                      <button
                        key={p}
                        className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-white hover:bg-white/[0.05]"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Activity Log ── */}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6"
              >
                <div className="space-y-3">
                  {(ACTIVITY_LOG ?? []).map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {(event.user ?? "").split(" ").map((n) => n.charAt(0)).join("").slice(0, 2)}
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-white">{event.user}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ACTIVITY_TYPE_COLORS[event.type] ?? "bg-slate-500/20 text-slate-400"}`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300">{event.action}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{event.detail}</p>
                      </div>
                      {/* Time */}
                      <div className="flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Selected User Detail Panel ── */}
        <AnimatePresence>
          {selectedUser && (() => {
            const user = USERS.find((u) => u.id === selectedUser);
            if (!user) return null;
            return (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{user.name}</h3>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Plan", value: user.plan },
                    { label: "Status", value: user.status },
                    { label: "MRR", value: user.mrr > 0 ? `$${user.mrr.toLocaleString()}` : "—" },
                    { label: "Sessions", value: (user.sessions ?? 0).toLocaleString() },
                    { label: "Page Views", value: (user.pageViews ?? 0).toLocaleString() },
                    { label: "Country", value: user.country },
                    { label: "Joined", value: user.joinedAt },
                    { label: "Last Seen", value: user.lastSeen },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </div>
    </main>
  );
}