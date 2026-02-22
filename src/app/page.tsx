"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Years shipping", value: "9+" },
  { label: "Launched products", value: "34" },
  { label: "Global clients", value: "22" },
];

const highlights = [
  {
    title: "Design systems",
    text: "Build and scale premium interfaces with clear tokens, motion language, and resilient components.",
  },
  {
    title: "Product strategy",
    text: "Turn raw ideas into sharp roadmaps and measurable releases with focused execution.",
  },
  {
    title: "Engineering",
    text: "Deliver clean, reliable web products with modern tooling, CI, and performance budgets.",
  },
];

const states = ["Discovery", "Design", "Build", "Launch", "Growth"];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="noise" aria-hidden="true" />
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="eyebrow">VADIM SHIBA</p>
        <h1>Digital визитка в Apple-style с живой анимацией.</h1>
        <p className="lead">
          Product designer & frontend engineer. Помогаю запускать аккуратные продукты:
          от идеи до продакшна.
        </p>
        <div className="cta-row">
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary"
            href="mailto:vadim@example.com"
          >
            Написать
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-ghost"
            href="https://github.com/vadimshiba"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </motion.a>
        </div>
      </motion.section>

      <section className="metrics" aria-label="Key metrics">
        {metrics.map((item, index) => (
          <motion.article
            className="metric-card"
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
            whileHover={{ y: -4 }}
          >
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </motion.article>
        ))}
      </section>

      <section className="cards" aria-label="Core services">
        {highlights.map((card, index) => (
          <motion.article
            className="glass-card"
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.015 }}
          >
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <motion.span whileHover={{ x: 6 }} className="card-link">
              Explore →
            </motion.span>
          </motion.article>
        ))}
      </section>

      <motion.section
        className="timeline"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7 }}
      >
        <h3>States of delivery</h3>
        <div className="state-row">
          {states.map((state, i) => (
            <motion.button
              key={state}
              type="button"
              className="state-pill"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * i, duration: 0.45 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {state}
            </motion.button>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
