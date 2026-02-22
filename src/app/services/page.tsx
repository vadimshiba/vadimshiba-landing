"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./services.module.css";
import {
  BotWaveIcon,
  OrbitCodeIcon,
  RocketLaunchIcon,
  ShieldPulseIcon,
} from "@/components/animated-icons";

type Service = {
  title: string;
  summary: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "Security hardening",
    summary: "Layered anti-abuse and anti-bot mechanics for backend entry points.",
    points: ["Challenge flows", "Replay protection", "Rate-limit strategy"],
  },
  {
    title: "API architecture",
    summary: "Contract-first APIs with observability and clean release boundaries.",
    points: ["FastAPI/Flask patterns", "Telemetry", "Error budgets"],
  },
  {
    title: "Telegram products",
    summary: "Bots and mini apps with production-grade routing and reliability.",
    points: ["Webhook pipelines", "Session states", "Role controls"],
  },
  {
    title: "Delivery loops",
    summary: "Build -> ship -> monitor loops tuned for faster and safer iteration.",
    points: ["CI/CD", "Blue/green rollout", "Rollback plans"],
  },
];

const serviceIcons = [ShieldPulseIcon, OrbitCodeIcon, BotWaveIcon, RocketLaunchIcon];

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.topline}>
          <Link href="/" className={styles.back}>
            Home
          </Link>
          <Link href="/projects" className={styles.back}>
            Projects
          </Link>
        </div>
        <h1>Services Grid</h1>
        <p>Service modules with clear execution states and delivery-focused structure.</p>
      </motion.div>

      <section className={styles.grid}>
        {services.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];

          return (
            <motion.article
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <Icon className={styles.icon} />
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <ul>
                {service.points.map((item) => (
                  <li key={`${service.title}-${item}`}>{item}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </section>
    </main>
  );
}
