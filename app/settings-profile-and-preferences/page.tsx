"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Eye, EyeOff, Shield, Palette, Globe, Smartphone, Check, AlertCircle, Save, Camera, Trash2, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  bio: string;
  timezone: string;
  language: string;
}

interface PasswordForm {
  current: string;
  next: string;
  confirm: string;
}

interface NotifSettings {
  emailDigest: boolean;
  mrrAlerts: boolean;
  churnAlerts: boolean;
  newUsers: boolean;
  weeklyReport: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  smsAlerts: boolean;
}

interface AppearanceSettings {
  theme: "dark" | "light" | "system";
  accentColor: string;
  compactMode: boolean;
  animationsEnabled: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TIMEZONES = [
  "UTC-08:00 Pacific Time",
  "UTC-07:00 Mountain Time",
  "UTC-06:00 Central Time",
  "UTC-05:00 Eastern Time",
  "UTC+00:00 London",
  "UTC+01:00 Paris / Berlin",
  "UTC+05:30 Mumbai",
  "UTC+08:00 Singapore",
  "UTC+09:00 Tokyo",
];

const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Portuguese",
];

const ACCENT_COLORS = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Sky", value: "#0ea5e9" },
  { label: "Emerald", value: "#10b981" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Amber", value: "#f59e0b" },
];

const SESSIONS = [
  { id: "s1", device: "MacBook Pro 16\"", browser: "Chrome 124", location: "San Francisco, CA", lastActive: "Active now", current: true },
  { id: "s2", device: "iPhone 15 Pro", browser: "Safari Mobile", location: "San Francisco, CA", lastActive: "2 hours ago", current: false },
  { id: "s3", device: "Windows PC", browser: "Firefox 125", location: "New York, NY", lastActive: "3 days ago", current: false },
];

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "sessions", label: "Sessions", icon: Shield },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <motion.button
        type="button"
        onClick={() => onChange(!checked)}
        whileTap={{ scale: 0.93 }}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
          checked ? "bg-indigo-500" : "bg-white/10"
        }`}
        aria-checked={checked}
        role="switch"
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        />
      </motion.button>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
      />
      {hint && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all pr-10"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900 text-slate-200">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────
function ProfileTab() {
  const [form, setForm] = useState<ProfileForm>({
    firstName: "Alexandra",
    lastName: "Chen",
    email: "alex.chen@pulseanalytics.io",
    phone: "+1 (415) 555-0192",
    jobTitle: "Head of Growth",
    company: "Pulse Analytics",
    bio: "Passionate about data-driven decision making and building products that scale. 8+ years in SaaS analytics.",
    timezone: "UTC-08:00 Pacific Time",
    language: "English (US)",
  });
  const [saved, setSaved] = useState(false);

  const set = (key: keyof ProfileForm) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Avatar */}
      <SectionCard title="Profile Photo" description="Your photo appears on your profile and in notifications.">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30">
              AC
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
            <p className="text-sm font-medium text-slate-200">Alexandra Chen</p>
            <p className="text-xs text-slate-500 mt-0.5">JPG, PNG or GIF · max 2 MB</p>
            <div className="flex gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
              >
                Upload new photo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors"
              >
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard title="Personal Information" description="Update your name, contact details, and professional info.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" value={form.firstName} onChange={set("firstName")} />
          <InputField label="Last Name" value={form.lastName} onChange={set("lastName")} />
          <InputField label="Email Address" value={form.email} onChange={set("email")} type="email" />
          <InputField label="Phone" value={form.phone} onChange={set("phone")} type="tel" />
          <InputField label="Job Title" value={form.jobTitle} onChange={set("jobTitle")} />
          <InputField label="Company" value={form.company} onChange={set("company")} />
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => set("bio")(e.target.value)}
            rows={3}
            className="mt-1.5 w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all resize-none"
          />
        </div>
      </SectionCard>

      {/* Localization */}
      <SectionCard title="Localization" description="Set your timezone and preferred language.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Timezone" value={form.timezone} onChange={set("timezone")} options={TIMEZONES} />
          <SelectField label="Language" value={form.language} onChange={set("language")} options={LANGUAGES} />
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/30"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function SecurityTab() {
  const [pwForm, setPwForm] = useState<PasswordForm>({ current: "", next: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [sessions, setSessions] = useState(SESSIONS);
  const [pwSaved, setPwSaved] = useState(false);

  const pwStrength = (() => {
    const p = pwForm.next;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"][pwStrength];

  const handlePwSave = () => {
    setPwSaved(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 2500);
  };

  const revokeSession = (id: string) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Change Password */}
      <SectionCard title="Change Password" description="Use a strong, unique password you don't use elsewhere.">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={pwForm.current}
                onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 pr-10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">New Password</label>
            <div className="relative">
              <input
                type={showNext ? "text" : "password"}
                value={pwForm.next}
                onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 pr-10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNext((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showNext ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwForm.next && (
              <div className="mt-1 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= pwStrength ? strengthColor : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Strength: <span className="text-slate-300">{strengthLabel}</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={pwForm.confirm}
                onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 pr-10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwForm.confirm && pwForm.next !== pwForm.confirm && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" /> Passwords do not match
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <motion.button
            onClick={handlePwSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!pwForm.current || !pwForm.next || pwForm.next !== pwForm.confirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {pwSaved ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {pwSaved ? "Updated!" : "Update Password"}
          </motion.button>
        </div>
      </SectionCard>

      {/* 2FA */}
      <SectionCard title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
        <Toggle
          checked={twoFAEnabled}
          onChange={setTwoFAEnabled}
          label="Enable 2FA via Authenticator App"
          description="Scan a QR code with your authenticator app each login."
        />
        {twoFAEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
          >
            <p className="text-sm text-indigo-300 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Two-factor authentication is active. Your account is protected.
            </p>
          </motion.div>
        )}
      </SectionCard>
    </motion.div>
  );
}

function NotificationsTab() {
  const [notif, setNotif] = useState<NotifSettings>({
    emailDigest: true,
    mrrAlerts: true,
    churnAlerts: true,
    newUsers: false,
    weeklyReport: true,
    productUpdates: false,
    securityAlerts: true,
    smsAlerts: false,
  });

  const toggle = (key: keyof NotifSettings) => (val: boolean) =>
    setNotif((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <SectionCard title="Email Notifications" description="Choose what you want to be notified about via email.">
        <Toggle checked={notif.emailDigest} onChange={toggle("emailDigest")} label="Daily Email Digest" description="A summary of your key metrics every morning." />
        <Toggle checked={notif.mrrAlerts} onChange={toggle("mrrAlerts")} label="MRR Change Alerts" description="Get notified when MRR changes by more than 5%." />
        <Toggle checked={notif.churnAlerts} onChange={toggle("churnAlerts")} label="Churn Risk Alerts" description="Alerts when high-value customers show churn signals." />
        <Toggle checked={notif.newUsers} onChange={toggle("newUsers")} label="New User Sign-ups" description="Notify me when a new user registers." />
        <Toggle checked={notif.weeklyReport} onChange={toggle("weeklyReport")} label="Weekly Performance Report" description="Full analytics report every Monday." />
      </SectionCard>

      <SectionCard title="System Notifications" description="Platform and security notifications.">
        <Toggle checked={notif.productUpdates} onChange={toggle("productUpdates")} label="Product Updates" description="New features and improvements." />
        <Toggle checked={notif.securityAlerts} onChange={toggle("securityAlerts")} label="Security Alerts" description="Unusual login attempts or security events." />
        <Toggle checked={notif.smsAlerts} onChange={toggle("smsAlerts")} label="SMS Alerts" description="Critical alerts sent to your phone via SMS." />
      </SectionCard>
    </motion.div>
  );
}

function AppearanceTab() {
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "dark",
    accentColor: "#6366f1",
    compactMode: false,
    animationsEnabled: true,
  });

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <SectionCard title="Theme" description="Choose how Pulse Analytics looks for you.">
        <div className="grid grid-cols-3 gap-3">
          {(["dark", "light", "system"] as const).map((t) => (
            <motion.button
              key={t}
              onClick={() => setAppearance((prev) => ({ ...prev, theme: t }))}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border transition-all ${
                appearance.theme === t
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >
              <div className={`w-full h-10 rounded-lg mb-2 ${
                t === "dark" ? "bg-slate-900" : t === "light" ? "bg-slate-100" : "bg-gradient-to-r from-slate-900 to-slate-100"
              }`} />
              <p className="text-xs font-medium text-slate-300 capitalize">{t}</p>
              {appearance.theme === t && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Accent Color" description="Personalize the highlight color used throughout the app.">
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <motion.button
              key={color.value}
              onClick={() => setAppearance((prev) => ({ ...prev, accentColor: color.value }))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-xl shadow-md"
              style={{ backgroundColor: color.value }}
              title={color.label}
            >
              {appearance.accentColor === color.value && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
              )}
            </motion.button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Interface" description="Customize your layout and animation preferences.">
        <Toggle
          checked={appearance.compactMode}
          onChange={(v) => setAppearance((prev) => ({ ...prev, compactMode: v }))}
          label="Compact Mode"
          description="Reduce spacing and padding throughout the interface."
        />
        <Toggle
          checked={appearance.animationsEnabled}
          onChange={(v) => setAppearance((prev) => ({ ...prev, animationsEnabled: v }))}
          label="Enable Animations"
          description="Motion effects and transitions across the app."
        />
      </SectionCard>
    </motion.div>
  );
}

function SessionsTab() {
  const [sessions, setSessions] = useState(SESSIONS);

  const revokeSession = (id: string) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <SectionCard title="Active Sessions" description="Devices currently logged into your account.">
        <div className="space-y-3">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              variants={fadeInUp}
              layout
              className={`flex items-center justify-between p-4 rounded-xl border ${
                session.current
                  ? "border-indigo-500/30 bg-indigo-500/[0.07]"
                  : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  session.current ? "bg-indigo-500/20" : "bg-white/[0.05]"
                }`}>
                  <Smartphone className={`w-4 h-4 ${session.current ? "text-indigo-400" : "text-slate-400"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{session.device}</p>
                  <p className="text-xs text-slate-500">
                    {session.browser} · {session.location}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{session.lastActive}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {session.current ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Current</span>
                ) : (
                  <motion.button
                    onClick={() => revokeSession(session.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Revoke
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {sessions.length > 1 && (
          <motion.button
            onClick={() => setSessions((prev) => prev.filter((s) => s.current))}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-4 w-full py-2.5 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
          >
            Revoke All Other Sessions
          </motion.button>
        )}
      </SectionCard>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabPanel: Record<string, React.ReactNode> = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
    appearance: <AppearanceTab />,
    sessions: <SessionsTab />,
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#080c14]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <p className="text-sm text-slate-400 mt-0.5">Manage your profile, security, and preferences.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:w-52 flex-shrink-0"
          >
            <div className="flex md:flex-col gap-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: active ? 0 : 2 }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                      active
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tabPanel[activeTab]}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
