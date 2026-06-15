"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Check, Bot, Brain, MessageSquare, Code2, Plug, ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Integrations Data ────────────────────────────────────────────────────────

const INTEGRATIONS = [
  {
    name: "Claude",
    provider: "Anthropic",
    description:
      "Harness Anthropic's Claude for intelligent data summarization, anomaly explanations, and natural-language querying of your analytics.",
    category: "AI Assistant",
    status: "Available",
    color: "from-orange-500 to-amber-600",
    glowColor: "shadow-orange-500/25",
    badge: "Popular",
    icon: MessageSquare,
    features: [
      "Natural language queries",
      "Anomaly explanations",
      "Automated report summaries",
      "Conversational insights",
    ],
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    description:
      "Connect OpenAI's GPT-4o to generate executive summaries, forecast narratives, and intelligent recommendations from your metrics.",
    category: "AI Assistant",
    status: "Available",
    color: "from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/25",
    badge: "New",
    icon: Bot,
    features: [
      "Executive summaries",
      "Forecast narratives",
      "Smart recommendations",
      "Custom prompt templates",
    ],
  },
  {
    name: "Gemini",
    provider: "Google",
    description:
      "Leverage Google Gemini's multimodal capabilities to analyze charts visually and generate rich, context-aware business insights.",
    category: "AI Assistant",
    status: "Available",
    color: "from-blue-500 to-indigo-600",
    glowColor: "shadow-blue-500/25",
    badge: null,
    icon: Brain,
    features: [
      "Multimodal chart analysis",
      "Context-aware insights",
      "Multi-language support",
      "Real-time streaming",
    ],
  },
  {
    name: "Mistral",
    provider: "Mistral AI",
    description:
      "Deploy Mistral's efficient open-weight models for on-premise or private-cloud analytics intelligence with full data sovereignty.",
    category: "AI Assistant",
    status: "Beta",
    color: "from-violet-500 to-purple-600",
    glowColor: "shadow-violet-500/25",
    badge: "Beta",
    icon: Zap,
    features: [
      "On-premise deployment",
      "Data sovereignty",
      "Low-latency inference",
      "Custom fine-tuning",
    ],
  },
  {
    name: "LangChain",
    provider: "LangChain",
    description:
      "Build custom AI pipelines and agents that interact with your Pulse Analytics data using LangChain's composable framework.",
    category: "AI Framework",
    status: "Available",
    color: "from-green-500 to-emerald-600",
    glowColor: "shadow-green-500/25",
    badge: null,
    icon: Code2,
    features: [
      "Custom AI agents",
      "Data pipeline automation",
      "Tool chaining",
      "Memory & context management",
    ],
  },
  {
    name: "Cohere",
    provider: "Cohere",
    description:
      "Integrate Cohere's enterprise-grade language models for semantic search, classification, and intelligent data extraction.",
    category: "AI Framework",
    status: "Coming Soon",
    color: "from-pink-500 to-rose-600",
    glowColor: "shadow-pink-500/25",
    badge: null,
    icon: Plug,
    features: [
      "Semantic search",
      "Text classification",
      "Data extraction",
      "Embeddings API",
    ],
  },
];

const CATEGORIES = ["All", "AI Assistant", "AI Framework"];

const STATS = [
  { value: "6", label: "AI Integrations" },
  { value: "1-Click", label: "Setup" },
  { value: "SOC 2", label: "Compliant" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "Available") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available
      </span>
    );
  }
  if (status === "Beta") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        Beta
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      Coming Soon
    </span>
  );
}

// ─── Integration Card ─────────────────────────────────────────────────────────

function IntegrationCard({
  integration,
  reduced,
}: {
  integration: (typeof INTEGRATIONS)[number];
  reduced: boolean | null;
}) {
  const Icon = integration.icon;
  const isComingSoon = integration.status === "Coming Soon";

  return (
    <motion.div
      variants={reduced ? undefined : fadeInUp}
      className="group relative flex flex-col bg-slate-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
    >
      {/* Top gradient icon area */}
      <div className={`relative p-6 bg-gradient-to-br ${integration.color} bg-opacity-10`}>
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="relative flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg ${integration.glowColor}`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-end gap-2">
            {integration.badge && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  integration.badge === "Popular"
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : integration.badge === "New"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                }`}
              >
                {integration.badge}
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium bg-slate-900/50 px-2 py-0.5 rounded-full border border-white/[0.06]">
              {integration.provider}
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">{integration.name}</h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <p className="text-slate-400 text-sm leading-relaxed">{integration.description}</p>

        {/* Features */}
        <ul className="space-y-2">
          {integration.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-indigo-400" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.06]">
          <StatusBadge status={integration.status} />
          <button
            disabled={isComingSoon}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isComingSoon
                ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                : `bg-gradient-to-r ${integration.color} text-white hover:opacity-90 hover:shadow-lg hover:shadow-black/20 active:scale-95`
            }`}
          >
            {isComingSoon ? "Coming Soon" : "Connect"}
            {!isComingSoon && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntegrationsPage() {
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? INTEGRATIONS
      : INTEGRATIONS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* ── Hero ── */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={reduced ? undefined : scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Integrations
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={reduced ? undefined : fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5"
          >
            Connect Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Favourite AI Models
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10"
          >
            Supercharge your analytics with Claude, GPT-4o, Gemini, and more. One-click setup,
            enterprise-grade security, and instant insights — all inside Pulse Analytics.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="inline-flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-slate-400 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          animate="show"
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-800/60 border border-white/[0.06]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          key={activeCategory}
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((integration) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              reduced={reduced}
            />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block w-full max-w-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 blur-xl" />
            <div className="relative rounded-2xl bg-slate-800/60 border border-white/[0.08] p-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <Plug className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Need a Custom Integration?</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Don't see the AI model you need? Our API is fully open. Browse the docs or reach out
                to our team and we'll build it together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
                >
                  View API Docs
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 font-semibold hover:bg-white/[0.10] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
