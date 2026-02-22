"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type DeliveryState = {
  id: string;
  label: string;
  summary: string;
  tone: "ok" | "warn" | "accent";
};

const deliveryStates: DeliveryState[] = [
  {
    id: "discover",
    label: "Discover",
    summary: "Map product constraints, abuse vectors, and architecture boundaries.",
    tone: "ok",
  },
  {
    id: "design",
    label: "Design",
    summary: "Define API contracts, UX flows, and infrastructure plans before implementation.",
    tone: "accent",
  },
  {
    id: "ship",
    label: "Ship",
    summary: "Deploy incrementally with telemetry, rollback paths, and measurable goals.",
    tone: "warn",
  },
  {
    id: "scale",
    label: "Scale",
    summary: "Harden reliability with observability, rate-limits, and resilient workflows.",
    tone: "ok",
  },
];

const stack = [
  "Python",
  "FastAPI",
  "Flask",
  "SQLAlchemy",
  "Redis",
  "React",
  "JavaScript",
  "Docker",
  "Linux",
  "Nginx",
  "Telegram Bots",
  "Mini Apps",
];

const featuredRepos = [
  {
    name: "antibot-shield",
    url: "https://github.com/vadimshiba/antibot-shield",
    text: "Adaptive L7 anti-bot middleware for FastAPI/Starlette with JS challenge, PoW, and replay hardening.",
    tags: ["Python", "FastAPI", "Security"],
  },
  {
    name: "dot_daily",
    url: "https://github.com/vadimshiba/dot_daily",
    text: "iOS app for daily planning with a clean, focused workflow.",
    tags: ["Swift", "iOS"],
  },
  {
    name: "telegram_file_bot",
    url: "https://github.com/vadimshiba/telegram_file_bot",
    text: "Telegram bot that delivers files while enforcing anti-spam verification flows.",
    tags: ["Python", "Telegram"],
  },
];

const highlights = [
  "Backend APIs + Frontend UX + DevOps delivery",
  "Telegram-first products for real users",
  "Production systems built for real traffic",
];

export default function Home() {
  const [activeState, setActiveState] = useState<DeliveryState>(deliveryStates[0]);

  return (
    <main className="landing">
      <div className="ambient" aria-hidden="true">
        <motion.span
          className="orb orb-a"
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
        />
        <motion.span
          className="orb orb-b"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="hero panel"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="eyebrow">VADIM SHIBA / FULLSTACK ENGINEER</p>
        <h1>Designing real products, not toy apps.</h1>
        <p className="lead">
          Building backend APIs, web frontends, Telegram-native flows, and delivery pipelines
          that can survive real traffic.
        </p>

        <div className="actions">
          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn primary" href="mailto:vadimshiba@duck.com">
            Email
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn ghost"
            href="https://github.com/vadimshiba"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn ghost"
            href="https://bitsquad.team"
            target="_blank"
            rel="noreferrer"
          >
            bitsquad.team
          </motion.a>
        </div>

        <div className="metrics">
          <article>
            <span>Location</span>
            <strong>Astana, Kazakhstan</strong>
          </article>
          <article>
            <span>Public repositories</span>
            <strong>5</strong>
          </article>
          <article>
            <span>Current focus</span>
            <strong>Product engineering</strong>
          </article>
        </div>
      </motion.section>

      <section className="grid-row">
        <motion.section
          className="panel states"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Live telemetry</h2>
          <p className="section-text">pipeline: build -&gt; ship -&gt; iterate</p>
          <div className="state-list" role="tablist" aria-label="Delivery states">
            {deliveryStates.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeState.id === item.id}
                className={`state-pill ${activeState.id === item.id ? "active" : ""}`}
                onClick={() => setActiveState(item)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeState.id}
              className={`state-card tone-${activeState.tone}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <h3>{activeState.label}</h3>
              <p>{activeState.summary}</p>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <motion.section
          className="panel stack"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <h2>Tech matrix</h2>
          <div className="chip-grid">
            {stack.map((item, i) => (
              <motion.span
                key={item}
                className="chip"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ scale: 1.06 }}
              >
                {item}
              </motion.span>
            ))}
          </div>

          <ul className="highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>
      </section>

      <motion.section
        className="panel projects"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        <div className="projects-head">
          <h2>Featured repositories</h2>
          <a href="https://github.com/vadimshiba?tab=repositories" target="_blank" rel="noreferrer">
            View all
          </a>
        </div>

        <div className="project-grid">
          {featuredRepos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <h3>{repo.name}</h3>
              <p>{repo.text}</p>
              <div className="repo-tags">
                {repo.tags.map((tag) => (
                  <span key={`${repo.name}-${tag}`}>{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
