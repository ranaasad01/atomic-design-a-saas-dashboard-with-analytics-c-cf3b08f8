"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Eye, Camera, Mail, FileText, Check, Palette, Moon, Sun, Monitor, Save, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, APP_NAME } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "profile" | "notifications" | "appearance";
type ThemeMode = "dark" | "light" | "system";

interface ProfileState {
  name: string;
  email: string;
  bio: string;
  role: string;
  company: string;
  website: string;
}

interface NotificationState {
  emailAlerts: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  monthlyReport: boolean;
  churnAlerts: boolean;
  mrrMilestones: boolean;
  newSignups: boolean;
  securityAlerts: boolean;
}

interface AppearanceState {
  theme: ThemeMode;
  accentColor: string;
  compactMode: boolean;
  animationsEnabled: boolean;
  sidebarCollapsed: boolean;
}

// ─── Accent Colors ────────────────────────────────────────────────────────────

const ACCENT_COLORS = [
  { label: "Indigo", value: "#6366f1", ring: "ring-indigo-500" },
  { label: "Violet", value: "#8b5cf6", ring: "ring-violet-500" },
  { label: "Sky", value: "#0ea5e9", ring: "ring-sky-500" },
  { label: "Emerald", value: "#10b981", ring: "ring-emerald-500" },
  { label: "Rose", value: "#f43f5e", ring: "ring-rose-500" },
  { label: "Amber", value: "#f59e0b", ring: "ring-amber-500" },
  { label: "Fuchsia", value: "#d946ef", ring: "ring-fuchsia-500" },
  { label: "Cyan", value: "#06b6d4", ring: "ring-cyan-500" },
];

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function ToggleSwitch({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] ${
        enabled ? "bg-indigo-500" : "bg-slate-700"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-md ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all py-2.5 pr-4 ${
            Icon ? "pl-10" : "pl-4"
          }`}
        />
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

// ─── Save Toast ───────────────────────────────────────────────────────────────

function SaveToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-xl shadow-xl backdrop-blur-md"
        >
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Changes saved successfully</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saveVisible, setSaveVisible] = useState(false);

  // Profile state
  const [profile, setProfile] = useState<ProfileState>({
    name: "Jordan Rivera",
    email: "jordan.rivera@pulseanalytics.io",
    bio: "Product-led growth enthusiast. Building data-driven SaaS at scale.",
    role: "Head of Growth",
    company: "Pulse Analytics",
    website: "https://pulseanalytics.io",
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationState>({
    emailAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,
    monthlyReport: true,
    churnAlerts: true,
    mrrMilestones: true,
    newSignups: false,
    securityAlerts: true,
  });

  // Appearance state
  const [appearance, setAppearance] = useState<AppearanceState>({
    theme: "dark",
    accentColor: BRAND_COLORS.primary,
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,
  });

  const handleSave = () => {
    setSaveVisible(true);
    setTimeout(() => setSaveVisible(false), 2800);
  };

  const updateProfile = (key: keyof ProfileState, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const updateNotification = (key: keyof NotificationState, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const updateAppearance = <K extends keyof AppearanceState>(
    key: K,
    value: AppearanceState[K]
  ) => {
    setAppearance((prev) => ({ ...prev, [key]: value }));
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Eye },
  ];

  const THEME_OPTIONS: { id: ThemeMode; label: string; icon: React.ElementType }[] = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  const NOTIFICATION_GROUPS = [
    {
      title: "Email Notifications",
      items: [
        { key: "emailAlerts" as keyof NotificationState, label: "Email Alerts", description: "Receive important alerts via email" },
        { key: "weeklyDigest" as keyof NotificationState, label: "Weekly Digest", description: "A summary of your key metrics every Monday" },
        { key: "monthlyReport" as keyof NotificationState, label: "Monthly Report", description: "Full analytics report at the end of each month" },
      ],
    },
    {
      title: "Push Notifications",
      items: [
        { key: "pushNotifications" as keyof NotificationState, label: "Push Notifications", description: "Browser push notifications for real-time alerts" },
        { key: "newSignups" as keyof NotificationState, label: "New Signups", description: "Get notified when a new user signs up" },
      ],
    },
    {
      title: "Business Alerts",
      items: [
        { key: "churnAlerts" as keyof NotificationState, label: "Churn Alerts", description: "Early warning when accounts show churn signals" },
        { key: "mrrMilestones" as keyof NotificationState, label: "MRR Milestones", description: "Celebrate when you hit revenue milestones" },
        { key: "securityAlerts" as keyof NotificationState, label: "Security Alerts", description: "Critical alerts for account security events" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
            <p className="mt-1 text-slate-400 text-sm">
              Manage your profile, notifications, and appearance preferences.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Tab Bar ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1 mb-8 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="settings-tab"
                    className="absolute inset-0 rounded-lg bg-indigo-500/20 border border-indigo-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative w-4 h-4" />
                <span className="relative">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {/* ─ Profile Tab ─ */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Avatar */}
              <SectionCard
                title="Profile Photo"
                description="Your photo appears across the platform and in emails."
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30">
                      JR
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg"
                    >
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Jordan Rivera</p>
                    <p className="text-xs text-slate-500 mt-0.5">Head of Growth · Pulse Analytics</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Upload new photo
                    </motion.button>
                  </div>
                </div>
              </SectionCard>

              {/* Personal Info */}
              <SectionCard
                title="Personal Information"
                description="Update your name, email, and professional details."
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Full Name"
                    value={profile.name}
                    onChange={(v) => updateProfile("name", v)}
                    icon={User}
                    placeholder="Your full name"
                  />
                  <InputField
                    label="Email Address"
                    value={profile.email}
                    onChange={(v) => updateProfile("email", v)}
                    type="email"
                    icon={Mail}
                    placeholder="you@example.com"
                  />
                  <InputField
                    label="Job Title"
                    value={profile.role}
                    onChange={(v) => updateProfile("role", v)}
                    placeholder="e.g. Head of Growth"
                  />
                  <InputField
                    label="Company"
                    value={profile.company}
                    onChange={(v) => updateProfile("company", v)}
                    placeholder="Your company name"
                  />
                  <InputField
                    label="Website"
                    value={profile.website}
                    onChange={(v) => updateProfile("website", v)}
                    placeholder="https://yoursite.com"
                  />
                </div>
                <div className="mt-5">
                  <label className="text-sm font-medium text-slate-300 block mb-1.5">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => updateProfile("bio", e.target.value)}
                    rows={3}
                    placeholder="Tell your team a bit about yourself"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all py-2.5 px-4 resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">{profile.bio.length}/200 characters</p>
                </div>
              </SectionCard>

              {/* Save */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─ Notifications Tab ─ */}
          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {NOTIFICATION_GROUPS.map((group) => (
                <SectionCard key={group.title} title={group.title}>
                  <div className="space-y-0 divide-y divide-white/[0.05]">
                    {group.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-200">{item.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                        <ToggleSwitch
                          enabled={notifications[item.key]}
                          onChange={(v) => updateNotification(item.key, v)}
                          label={item.label}
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              ))}

              {/* Alert Banner */}
              <motion.div
                variants={fadeInUp}
                className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
              >
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-300">Security alerts are always on</p>
                  <p className="text-xs text-amber-400/70 mt-0.5">
                    Critical security notifications cannot be disabled for your account safety.
                  </p>
                </div>
              </motion.div>

              {/* Save */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─ Appearance Tab ─ */}
          {activeTab === "appearance" && (
            <motion.div
              key="appearance"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Theme */}
              <SectionCard
                title="Theme"
                description="Choose how Pulse Analytics looks on your device."
              >
                <div className="grid grid-cols-3 gap-3">
                  {THEME_OPTIONS.map((theme) => {
                    const Icon = theme.icon;
                    const isSelected = appearance.theme === theme.id;
                    return (
                      <motion.button
                        key={theme.id}
                        onClick={() => updateAppearance("theme", theme.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                            : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{theme.label}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Accent Color */}
              <SectionCard
                title="Accent Color"
                description="Pick your preferred accent color for the interface."
              >
                <div className="flex flex-wrap gap-3">
                  {ACCENT_COLORS.map((color) => {
                    const isSelected = appearance.accentColor === color.value;
                    return (
                      <motion.button
                        key={color.value}
                        onClick={() => updateAppearance("accentColor", color.value)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={color.label}
                        className={`w-8 h-8 rounded-full transition-all ${
                          isSelected
                            ? "ring-2 ring-offset-2 ring-offset-[#0f172a] scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: color.value,
                          boxShadow: isSelected ? `0 0 0 2px ${color.value}` : undefined,
                        }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white mx-auto" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Selected: <span className="text-slate-300 font-medium">{ACCENT_COLORS.find(c => c.value === appearance.accentColor)?.label ?? "Custom"}</span>
                </p>
              </SectionCard>

              {/* Display Options */}
              <SectionCard
                title="Display Options"
                description="Adjust layout and animation preferences."
              >
                <div className="space-y-0 divide-y divide-white/[0.05]">
                  {[
                    { key: "compactMode" as keyof AppearanceState, label: "Compact Mode", description: "Reduce spacing and padding for a denser layout" },
                    { key: "animationsEnabled" as keyof AppearanceState, label: "Animations", description: "Enable motion animations throughout the interface" },
                    { key: "sidebarCollapsed" as keyof AppearanceState, label: "Collapse Sidebar", description: "Start with the sidebar collapsed by default" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      <ToggleSwitch
                        enabled={appearance[item.key] as boolean}
                        onChange={(v) => updateAppearance(item.key, v as AppearanceState[typeof item.key])}
                        label={item.label}
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Save */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SaveToast visible={saveVisible} />
    </main>
  );
}
