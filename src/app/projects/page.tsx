"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./projects.module.css";
import {
  BotWaveIcon,
  OrbitCodeIcon,
  RocketLaunchIcon,
  ShieldPulseIcon,
} from "@/components/animated-icons";

type ProjectCard = {
  title: string;
  description: string;
  href: string;
  stack: string[];
};

const projects: ProjectCard[] = [
  {
    title: "antibot-shield",
    description:
      "Adaptive L7 anti-bot middleware with progressive penalties, challenge flow and replay hardening.",
    href: "https://github.com/vadimshiba/antibot-shield",
    stack: ["Python", "FastAPI", "Security"],
  },
  {
    title: "dot_daily",
    description:
      "iOS planning app focused on fast daily routines and clean interaction states.",
    href: "https://github.com/vadimshiba/dot_daily",
    stack: ["Swift", "iOS"],
  },
  {
    title: "telegram_file_bot",
    description:
      "Telegram automation bot with verification mechanics to prevent spam and unsafe retrieval requests.",
    href: "https://github.com/vadimshiba/telegram_file_bot",
    stack: ["Python", "Telegram"],
  },
  {
    title: "delivery patterns",
    description:
      "Reusable product engineering patterns for deploy, monitor, rollback and scale loops.",
    href: "https://github.com/vadimshiba",
    stack: ["Architecture", "DevOps"],
  },
];

const projectIcons = [ShieldPulseIcon, OrbitCodeIcon, BotWaveIcon, RocketLaunchIcon];

export default function ProjectsPage() {
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
          <Link href="/services" className={styles.back}>
            Services
          </Link>
        </div>
        <h1>Project Atlas</h1>
        <p>Repository map with animated SVG icons and live interaction states.</p>
      </motion.div>

      <section className={styles.grid}>
        {projects.map((project, index) => {
          const Icon = projectIcons[index % projectIcons.length];

          return (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              whileHover={{ y: -6, scale: 1.01, rotateX: 2, rotateY: -2 }}
            >
              <Icon className={styles.icon} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.stack.map((item) => (
                  <span key={`${project.title}-${item}`}>{item}</span>
                ))}
              </div>
            </motion.a>
          );
        })}
      </section>
    </main>
  );
}
