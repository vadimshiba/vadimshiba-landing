"use client";

import { motion } from "framer-motion";

type IconProps = {
  className?: string;
};

const transition = {
  duration: 2.4,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
} as const;

export function ShieldPulseIcon({ className }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -2, 0] }}
      transition={transition}
    >
      <motion.path
        d="M32 6 50 12v16c0 12-7.8 22.4-18 26-10.2-3.6-18-14-18-26V12L32 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <motion.path
        d="m23 31 6.2 6.4L41.8 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.8 }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>
  );
}

export function OrbitCodeIcon({ className }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <path d="M23 23 14 32l9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m41 23 9 9-9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m36 18-8 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="32"
        cy="32"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeDasharray="3 5"
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      />
    </motion.svg>
  );
}

export function RocketLaunchIcon({ className }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <path d="M38.5 11.5c5.5 5.3 8.3 12.6 8 20l-9 9c-7.4.3-14.7-2.5-20-8l21-21Z" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="m28.7 43.7-7.7 8.8 8.8-7.7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20 36c-3.8.8-7.3 2.8-10 5.6l6.4 6.4c2.8-2.7 4.8-6.2 5.6-10Z" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
      <motion.path
        d="M40 47c2 1.7 3.7 3.8 5 6.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>
  );
}

export function BotWaveIcon({ className }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -2, 0] }}
      transition={transition}
    >
      <rect x="14" y="18" width="36" height="30" rx="10" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M25 18v-4.5c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6V18" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <motion.circle cx="26" cy="31" r="3" fill="currentColor" animate={{ scale: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }} />
      <motion.circle cx="38" cy="31" r="3" fill="currentColor" animate={{ scale: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }} />
      <motion.path
        d="M24 40c2.2 2 4.8 3 8 3s5.8-1 8-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        animate={{ pathLength: [0.1, 1, 0.1] }}
        transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>
  );
}
