"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, ArrowUpDown, Users, UserCheck, UserPlus, Filter, Download, Eye, MoreHorizontal, Star, Activity, Circle } from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type Plan = "Free" | "Pro" | "Enterprise";
type Status = "Active" | "Inactive" | "Churned";

interface MockUser {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  mrr: number;
  joinedAt: string;
  lastSeen: string;
  avatar: string;
  initials: string;
  avatarColor: string;
  activity: { day: string; sessions: number }[];
}

const AVATAR_COLORS = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-green-600",
  "from-cyan-500 to-sky-600",
];

function makeActivity(seed: number) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    day,
    sessions: Math.max(0, Math.round(((seed * (i + 1) * 7) % 18) + 2)),
  }));
}

const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "Alexandra Chen",
    email: "alex.chen@techcorp.io",
    plan: "Enterprise",
    status: "Active",
    mrr: 1200,
    joinedAt: "2023-01-15",
    lastSeen: "2 min ago",
    avatar: "/images/avatar-alexandra-chen.jpg",
    initials: "AC",
    avatarColor: AVATAR_COLORS[0],
    activity: makeActivity(3),
  },
  {
    id: "u2",
    name: "Marcus Williams",
    email: "m.williams@growthlab.com",
    plan: "Pro",
    status: "Active",
    mrr: 299,
    joinedAt: "2023-03-22",
    lastSeen: "1h ago",
    avatar: "/images/avatar-marcus-williams.jpg",
    initials: "MW",
    avatarColor: AVATAR_COLORS[1],
    activity: makeActivity(5),
  },
  {
    id: "u3",
    name: "Priya Sharma",
    email: "priya@startupventures.in",
    plan: "Enterprise",
    status: "Active",
    mrr: 1800,
    joinedAt: "2022-11-08",
    lastSeen: "30 min ago",
    avatar: "/images/avatar-priya-sharma.jpg",
    initials: "PS",
    avatarColor: AVATAR_COLORS[2],
    activity: makeActivity(7),
  },
  {
    id: "u4",
    name: "James O'Brien",
    email: "james.obrien@fintech.co",
    plan: "Pro",
    status: "Inactive",
    mrr: 299,
    joinedAt: "2023-06-01",
    lastSeen: "3 days ago",
    avatar: "/images/avatar-james-obrien.jpg",
    initials: "JO",
    avatarColor: AVATAR_COLORS[3],
    activity: makeActivity(2),
  },
  {
    id: "u5",
    name: "Sofia Reyes",
    email: "sofia.reyes@designstudio.mx",
    plan: "Free",
    status: "Active",
    mrr: 0,
    joinedAt: "2024-01-10",
    lastSeen: "5h ago",
    avatar: "/images/avatar-sofia-reyes.jpg",
    initials: "SR",
    avatarColor: AVATAR_COLORS[4],
    activity: makeActivity(4),
  },
  {
    id: "u6",
    name: "Liam Nakamura",
    email: "liam.n@cloudops.jp",
    plan: "Enterprise",
    status: "Active",
    mrr: 2400,
    joinedAt: "2022-08-19",
    lastSeen: "Just now",
    avatar: "/images/avatar-liam-nakamura.jpg",
    initials: "LN",
    avatarColor: AVATAR_COLORS[5],
    activity: makeActivity(9),
  },
  {
    id: "u7",
    name: "Amara Osei",
    email: "amara.osei@datahub.gh",
    plan: "Pro",
    status: "Active",
    mrr: 299,
    joinedAt: "2023-09-14",
    lastSeen: "2h ago",
    avatar: "/images/avatar-amara-osei.jpg",
    initials: "AO",
    avatarColor: AVATAR_COLORS[6],
    activity: makeActivity(6),
  },
  {
    id: "u8",
    name: "Ethan Kowalski",
    email: "e.kowalski@saasbuilder.pl",
    plan: "Free",
    status: "Churned",
    mrr: 0,
    joinedAt: "2023-04-30",
    lastSeen: "2 weeks ago",
    avatar: "/images/avatar-ethan-kowalski.jpg",
    initials: "EK",
    avatarColor: AVATAR_COLORS[7],
    activity: makeActivity(1),
  },
  {
    id: "u9",
    name: "Isabelle Fontaine",
    email: "isabelle@agencenum.fr",
    plan: "Pro",
    status: "Active",
    mrr: 299,
    joinedAt: "2023-11-22",
    lastSeen: "45 min ago",
    avatar: "/images/avatar-isabelle-fontaine.jpg",
    initials: "IF",
    avatarColor: AVATAR_COLORS[0],
    activity: makeActivity(8),
  },
  {
    id: "u10",
    name: "Raj Patel",
    email: "raj.patel@infracloud.in",
    plan: "Enterprise",
    status: "Active",
    mrr: 1200,
    joinedAt: "2022-12-05",
    lastSeen: "10 min ago",
    avatar: "/images/avatar-raj-patel.jpg",
    initials: "RP",
    avatarColor: AVATAR_COLORS[1],
    activity: makeActivity(10),
  },
  {
    id: "u11",
    name: "Chloe Dubois",
    email: "chloe.d@mediagroup.be",
    plan: "Free",
    status: "Active",
    mrr: 0,
    joinedAt: "2024-02-14",
    lastSeen: "1 day ago",
    avatar: "/images/avatar-chloe-dubois.jpg",
    initials: "CD",
    avatarColor: AVATAR_COLORS[2],
    activity: makeActivity(3),
  },
  {
    id: "u12",
    name: "Noah Andersen",
    email: "noah.a@nordic.dev",
    plan: "Pro",
    status: "Inactive",
    mrr: 299,
    joinedAt: "2023-07-18",
    lastSeen: "5 days ago",
    avatar: "/images/avatar-noah-andersen.jpg",
    initials: "NA",
    avatarColor: AVATAR_COLORS[3],
    activity: makeActivity(2),
  },
  {
    id: "u13",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@pixelcraft.jp",
    plan: "Enterprise",
    status: "Active",
    mrr: 3600,
    joinedAt: "2022-06-01",
    lastSeen: "3h ago",
    avatar: "/images/avatar-yuki-tanaka.jpg",
    initials: "YT",
    avatarColor: AVATAR_COLORS[4],
    activity: makeActivity(11),
  },
  {
    id: "u14",
    name: "Fatima Al-Hassan",
    email: "fatima@techbridge.ae",
    plan: "Pro",
    status: "Active",
    mrr: 299,
    joinedAt: "2023-10-03",
    lastSeen: "20 min ago",
    avatar: "/images/avatar-fatima-al-hassan.jpg",
    initials: "FA",
    avatarColor: AVATAR_COLORS[5],
    activity: makeActivity(7),
  },
  {
    id: "u15",
    name: "Carlos Mendez",
    email: "c.mendez@latamops.co",
    plan: "Free",
    status: "Churned",
    mrr: 0,
    joinedAt: "2023-05-20",
    lastSeen: "1 month ago",
    avatar: "/images/avatar-carlos-mendez.jpg",
    initials: "CM",
    avatarColor: AVATAR_COLORS[6],
    activity: makeActivity(1),
  },
  {
    id: "u16",
    name: "Olivia Thompson",
    email: "olivia.t@growthmetrics.com",
    plan: "Enterprise",
    status: "Active",
    mrr: 1200,
    joinedAt: "2023-02-28",
    lastSeen: "Just now",
    avatar: "/images/avatar-olivia-thompson.jpg",
    initials: "OT",
    avatarColor: AVATAR_COLORS[7],
    activity: makeActivity(9),
  },
  {
    id: "u17",
    name: "Kwame Asante",
    email: "kwame@techaccelerator.gh",
    plan: "Pro",
    status: "Active",
    mrr: 299,
    joinedAt: "2024-01-05",
    lastSeen: "4h ago",
    avatar: "/images/avatar-kwame-asante.jpg",
    initials: "KA",
    avatarColor: AVATAR_COLORS[0],
    activity: makeActivity(5),
  },
  {
    id: "u18",
    name: "Elena Volkov",
    email: "elena.v@datastream.ru",
    plan: "Free",
    status: "Active",
    mrr: 0,
    joinedAt: "2024-03-01",
    lastSeen: "6h ago",
    avatar: "/images/avatar-elena-volkov.jpg",
    initials: "EV",
    avatarColor: AVATAR_COLORS[1],
    activity: makeActivity(4),
  },
  {
    id: "u19",
    name: "Samuel Park",
    email: "s.park@seoultech.kr",
    plan: "Enterprise",
    status: "Active",
    mrr: 2400,
    joinedAt: "2022-09-12",
    lastSeen: "15 min ago",
    avatar: "/images/avatar-samuel-park.jpg",
    initials: "SP",
    avatarColor: AVATAR_COLORS[2],
    activity: makeActivity(12),
  },
  {
    id: "u20",
    name: "Mia Johansson",
    email: "mia.j@scandinavian.io",
    plan: "Pro",
    status: "Inactive",
    mrr: 299,
    joinedAt: "2023-08-07",
    lastSeen: "4 days ago",
    avatar: "/images/avatar-mia-johansson.jpg",
    initials: "MJ",
    avatarColor: AVATAR_COLORS[3],
    activity: makeActivity(2),
  },
];

// ─── Summary Stats ────────────────────────────────────────────────────────────

const SUMMARY_STATS = [
  {
    label: "Total Users",
    value: "20",
    icon: Users,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    change: "+12%",
    changeUp: true,
  },
  {
    label: "Active Users",
    value: "14",
    icon: UserCheck,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    change: "+8%",
    changeUp: true,
  },
  {
    label: "New This Month",
    value: "4",
    icon: UserPlus,
    color: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/20",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    change: "+33%",
    changeUp: true,
  },
  {
    label: "Churned",
    value: "2",
    icon: Circle,
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
    change: "-5%",
    changeUp: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_STYLES: Record<Plan, string> = {
  Free: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Pro: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const STATUS_STYLES: Record<Status, { badge: string; dot: string }> = {
  Active: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Inactive: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  Churned: {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dot: "bg-rose-400",
  },
};

type SortKey = "name" | "plan" | "status" | "mrr" | "joinedAt";
type SortDir = "asc" | "desc";

// ─── Sparkline Component ──────────────────────────────────────────────────────

function Sparkline({ data }: { data: { day: string; sessions: number }[] }) {
  return (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data ?? []}>
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#6366f1"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "6px",
              fontSize: "10px",
              color: "#94a3b8",
              padding: "4px 8px",
            }}
            itemStyle={{ color: "#818cf8" }}
            labelStyle={{ display: "none" }}
            formatter={(val: number) => [`${val} sessions`, ""]}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Avatar Component ─────────────────────────────────────────────────────────

function Avatar({ user }: { user: MockUser }) {
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-lg flex-shrink-0`}
    >
      {user.initials}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState<string>("");
  const [planFilter, setPlanFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("joinedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (planFilter !== "All") {
      rows = rows.filter((u) => u.plan === planFilter);
    }

    if (statusFilter !== "All") {
      rows = rows.filter((u) => u.status === statusFilter);
    }

    rows.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      if (sortKey === "name") { aVal = a.name; bVal = b.name; }
      else if (sortKey === "plan") { aVal = a.plan; bVal = b.plan; }
      else if (sortKey === "status") { aVal = a.status; bVal = b.status; }
      else if (sortKey === "mrr") { aVal = a.mrr; bVal = b.mrr; }
      else if (sortKey === "joinedAt") { aVal = a.joinedAt; bVal = b.joinedAt; }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [search, planFilter, statusFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
      : <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />;
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 pb-20">
      {/* ── Page Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0a0f1e] to-[#0f172a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-48 bg-violet-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                User Management
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Users
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-2 text-slate-400 text-sm max-w-xl"
            >
              Monitor user activity, manage plans, and track engagement across your entire customer base.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ── Summary Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SUMMARY_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative rounded-2xl border ${stat.border} bg-white/[0.03] backdrop-blur-sm p-5 shadow-xl ${stat.glow} overflow-hidden group cursor-default`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} opacity-[0.03]`} />
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.text}`} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.changeUp
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Filters & Search ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
        >
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Churned">Churned</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:border-white/[0.12] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {/* User */}
                  <th className="text-left px-5 py-3.5">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      User <SortIcon col="name" />
                    </button>
                  </th>
                  {/* Plan */}
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("plan")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Plan <SortIcon col="plan" />
                    </button>
                  </th>
                  {/* Status */}
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Status <SortIcon col="status" />
                    </button>
                  </th>
                  {/* MRR */}
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("mrr")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      MRR <SortIcon col="mrr" />
                    </button>
                  </th>
                  {/* Joined */}
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("joinedAt")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Joined <SortIcon col="joinedAt" />
                    </button>
                  </th>
                  {/* Last Active */}
                  <th className="text-left px-4 py-3.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Last Active
                    </span>
                  </th>
                  {/* Activity */}
                  <th className="text-left px-4 py-3.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      7d Activity
                    </span>
                  </th>
                  {/* Actions */}
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>

              <tbody>
                <AnimatePresence mode="popLayout">
                  {(filtered ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-slate-600 text-sm">
                        No users match your filters.
                      </td>
                    </tr>
                  ) : (
                    (filtered ?? []).map((user, idx) => {
                      const planStyle = PLAN_STYLES[user.plan] ?? PLAN_STYLES["Free"];
                      const statusStyle = STATUS_STYLES[user.status] ?? STATUS_STYLES["Active"];
                      return (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, delay: idx * 0.03 }}
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                          className="border-b border-white/[0.04] last:border-0 group transition-colors"
                        >
                          {/* User */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar user={user} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-100 truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Plan */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${planStyle}`}
                            >
                              {user.plan === "Enterprise" && (
                                <Star className="w-2.5 h-2.5" />
                              )}
                              {user.plan}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.badge}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${
                                  user.status === "Active" ? "animate-pulse" : ""
                                }`}
                              />
                              {user.status}
                            </span>
                          </td>

                          {/* MRR */}
                          <td className="px-4 py-4">
                            <span className="text-sm font-semibold text-slate-200">
                              {user.mrr === 0
                                ? "—"
                                : `$${(user.mrr ?? 0).toLocaleString()}`}
                            </span>
                          </td>

                          {/* Joined */}
                          <td className="px-4 py-4">
                            <span className="text-sm text-slate-400">
                              {user.joinedAt}
                            </span>
                          </td>

                          {/* Last Active */}
                          <td className="px-4 py-4">
                            <span className="text-sm text-slate-400">
                              {user.lastSeen}
                            </span>
                          </td>

                          {/* Sparkline */}
                          <td className="px-4 py-4">
                            <Sparkline data={user.activity ?? []} />
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.93 }}
                                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-indigo-500/20 border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all"
                                aria-label="View user"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.93 }}
                                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all"
                                aria-label="More options"
                              >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3.5 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
            <p className="text-xs text-slate-600">
              Showing{" "}
              <span className="text-slate-400 font-medium">{filtered.length}</span>{" "}
              of{" "}
              <span className="text-slate-400 font-medium">{MOCK_USERS.length}</span>{" "}
              users
            </p>
            <div className="flex items-center gap-1">
              {["Free", "Pro", "Enterprise"].map((plan) => {
                const count = MOCK_USERS.filter((u) => u.plan === plan).length;
                const style = PLAN_STYLES[plan as Plan] ?? "";
                return (
                  <span
                    key={plan}
                    className={`text-xs px-2 py-0.5 rounded-full border ${style}`}
                  >
                    {plan}: {count}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Plan Distribution ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {(
            [
              { plan: "Free" as Plan, count: 5, pct: 25, color: "bg-slate-400", bar: "from-slate-400 to-slate-500" },
              { plan: "Pro" as Plan, count: 9, pct: 45, color: "bg-indigo-400", bar: "from-indigo-500 to-violet-500" },
              { plan: "Enterprise" as Plan, count: 6, pct: 30, color: "bg-violet-400", bar: "from-violet-500 to-purple-600" },
            ] as const
          ).map((item) => (
            <motion.div
              key={item.plan}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-semibold ${PLAN_STYLES[item.plan].split(" ")[1]}`}>
                  {item.plan}
                </span>
                <span className="text-xl font-bold text-white">{item.count}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.bar}`}
                />
              </div>
              <p className="text-xs text-slate-600 mt-2">{item.pct}% of total users</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}