"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BotWaveIcon,
  OrbitCodeIcon,
  RocketLaunchIcon,
  ShieldPulseIcon,
} from "@/components/animated-icons";

type Theme = "light" | "dark";
type Locale = "ru" | "en";
type SensorState = "idle" | "granted" | "denied" | "unsupported";

type StateItem = {
  id: string;
  label: string;
  summary: string;
  tone: "ok" | "warn" | "accent";
};

type RepoItem = {
  name: string;
  url: string;
  text: string;
  tags: string[];
};

type DeviceInfo = {
  os: string;
  device: string;
  input: string;
  vibration: boolean;
  haptics: string;
  hapticsAvailable: boolean;
};

type Content = {
  loadingTitle: string;
  loadingSubtitle: string;
  switchLang: string;
  switchTheme: string;
  lightMode: string;
  darkMode: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  email: string;
  website: string;
  metrics: Array<{ label: string; value: string }>;
  telemetryTitle: string;
  telemetrySubtitle: string;
  stackTitle: string;
  highlights: string[];
  projectsTitle: string;
  viewAll: string;
  navHome: string;
  navProjects: string;
  navServices: string;
  modulesTitle: string;
  modulesSubtitle: string;
  moduleCards: Array<{ title: string; text: string; href: string; hrefLabel: string }>;
  deviceTitle: string;
  deviceSubtitle: string;
  sensorButton: string;
  vibrationButton: string;
  sensorIdle: string;
  sensorReady: string;
  sensorDenied: string;
  sensorUnsupported: string;
  osLabel: string;
  deviceLabel: string;
  inputLabel: string;
  orientationLabel: string;
  tiltLabel: string;
  hapticLabel: string;
  portrait: string;
  landscape: string;
  footer: string;
  states: StateItem[];
  repos: RepoItem[];
};

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const stackItems = [
  "Python",
  "FastAPI",
  "Flask",
  "SQLAlchemy",
  "Redis",
  "React",
  "JavaScript",
  "TypeScript",
  "Docker",
  "Linux",
  "Nginx",
  "Telegram Bots",
  "Mini Apps",
  "CI/CD",
];

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 17) % 88)}%`,
  top: `${8 + ((i * 23) % 74)}%`,
  size: 3 + (i % 5),
  delay: i * 0.35,
  duration: 8 + (i % 6),
}));

const detectOs = (ua: string, platform: string): string => {
  const fingerprint = `${ua} ${platform}`.toLowerCase();
  if (fingerprint.includes("android")) return "Android";
  if (fingerprint.includes("iphone") || fingerprint.includes("ipad") || fingerprint.includes("ipod")) return "iOS";
  if (fingerprint.includes("mac")) return "macOS";
  if (fingerprint.includes("win")) return "Windows";
  if (fingerprint.includes("linux")) return "Linux";
  return "Unknown";
};

const detectDevice = (ua: string, maxTouchPoints: number): string => {
  const fingerprint = ua.toLowerCase();
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(fingerprint);
  if (isTablet) return "Tablet";

  const isMobile = /(mobile|iphone|ipod|android.*mobile|windows phone)/i.test(fingerprint);
  if (isMobile) return "Mobile";

  if (maxTouchPoints > 0) return "Touch device";
  return "Desktop";
};

const readOrientationMode = (): string => {
  if (typeof window === "undefined") {
    return "landscape-primary";
  }

  const orientationType = window.screen?.orientation?.type;
  if (orientationType) {
    return orientationType;
  }

  return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
};

const hasTelegramHaptics = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const telegram = (window as unknown as {
    Telegram?: {
      WebApp?: {
        HapticFeedback?: {
          impactOccurred?: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
          selectionChanged?: () => void;
        };
      };
    };
  }).Telegram;

  return Boolean(telegram?.WebApp?.HapticFeedback);
};

const triggerHaptic = (kind: "light" | "medium" | "heavy" = "light") => {
  if (typeof window === "undefined") {
    return;
  }

  const telegram = (window as unknown as {
    Telegram?: {
      WebApp?: {
        HapticFeedback?: {
          impactOccurred?: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
          selectionChanged?: () => void;
        };
      };
    };
  }).Telegram;

  const tgHaptics = telegram?.WebApp?.HapticFeedback;
  if (tgHaptics?.impactOccurred) {
    tgHaptics.impactOccurred(kind);
    return;
  }

  if (!("vibrate" in navigator)) {
    return;
  }

  const pattern = kind === "heavy" ? [20, 12, 18] : kind === "medium" ? [14] : [9];
  navigator.vibrate(pattern);
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

const content: Record<Locale, Content> = {
  en: {
    loadingTitle: "Booting interface",
    loadingSubtitle: "Preparing visuals, telemetry and interaction layer",
    switchLang: "RU",
    switchTheme: "Theme",
    lightMode: "Light",
    darkMode: "Dark",
    heroEyebrow: "VADIM SHIBA / FULLSTACK ENGINEER",
    heroTitle: "Shipping products that survive real traffic.",
    heroLead:
      "I design and build backend APIs, frontend UX, Telegram-first products and production workflows.",
    email: "Email",
    website: "Website",
    metrics: [
      { label: "Location", value: "Astana, Kazakhstan" },
      { label: "Public repositories", value: "5" },
      { label: "Current mode", value: "Product engineering" },
    ],
    telemetryTitle: "Live delivery states",
    telemetrySubtitle: "pipeline: discover -> design -> ship -> scale",
    stackTitle: "Tech matrix",
    highlights: [
      "Backend APIs + Frontend UX + DevOps delivery",
      "Telegram-native products for real users",
      "Security and performance for production workloads",
    ],
    projectsTitle: "Featured repositories",
    viewAll: "View all",
    navHome: "Home",
    navProjects: "Projects",
    navServices: "Services",
    modulesTitle: "Engineering modules",
    modulesSubtitle: "Reusable vectors and interaction blocks for product surfaces",
    moduleCards: [
      {
        title: "Security topology",
        text: "Protection layers and anti-bot strategy flows for production APIs.",
        href: "/services",
        hrefLabel: "Open services page",
      },
      {
        title: "Product architecture",
        text: "Design, development and delivery patterns for shipped products.",
        href: "/projects",
        hrefLabel: "Open projects page",
      },
      {
        title: "Release workflow",
        text: "Readiness checks, observability and scaling plans for growth phases.",
        href: "/services",
        hrefLabel: "View release services",
      },
      {
        title: "Telegram ecosystem",
        text: "Bots, mini apps and automation patterns for real user traffic.",
        href: "/projects",
        hrefLabel: "View Telegram projects",
      },
    ],
    deviceTitle: "Device interaction lab",
    deviceSubtitle: "OS-aware behavior, haptic hooks, tilt and orientation telemetry",
    sensorButton: "Enable motion sensors",
    vibrationButton: "Trigger haptic pulse",
    sensorIdle: "Sensors: awaiting access",
    sensorReady: "Sensors: active",
    sensorDenied: "Sensors: access denied",
    sensorUnsupported: "Sensors: unsupported",
    osLabel: "Operating system",
    deviceLabel: "Device class",
    inputLabel: "Primary input",
    orientationLabel: "Screen orientation",
    tiltLabel: "Tilt reading",
    hapticLabel: "Haptic channel",
    portrait: "Portrait",
    landscape: "Landscape",
    footer:
      "Open to collaboration on product engineering, backend systems and Telegram ecosystems.",
    states: [
      {
        id: "discover",
        label: "Discover",
        summary: "Map abuse vectors, requirements and architecture limits before coding.",
        tone: "ok",
      },
      {
        id: "design",
        label: "Design",
        summary: "Define API contracts, UX states, telemetry points and fallback plans.",
        tone: "accent",
      },
      {
        id: "ship",
        label: "Ship",
        summary: "Deliver in iterations with observability and controlled risk.",
        tone: "warn",
      },
      {
        id: "scale",
        label: "Scale",
        summary: "Harden reliability, rate limits and infra for sustained growth.",
        tone: "ok",
      },
    ],
    repos: [
      {
        name: "antibot-shield",
        url: "https://github.com/vadimshiba/antibot-shield",
        text: "Adaptive L7 anti-bot middleware with JS challenge, PoW and replay hardening.",
        tags: ["Python", "FastAPI", "Security"],
      },
      {
        name: "dot_daily",
        url: "https://github.com/vadimshiba/dot_daily",
        text: "iOS planning app focused on a clean and fast daily flow.",
        tags: ["Swift", "iOS"],
      },
      {
        name: "telegram_file_bot",
        url: "https://github.com/vadimshiba/telegram_file_bot",
        text: "Telegram automation bot with anti-spam verification logic.",
        tags: ["Python", "Telegram"],
      },
    ],
  },
  ru: {
    loadingTitle: "Загрузка интерфейса",
    loadingSubtitle: "Подготавливаю визуал, телеметрию и слой взаимодействий",
    switchLang: "EN",
    switchTheme: "Тема",
    lightMode: "Светлая",
    darkMode: "Тёмная",
    heroEyebrow: "VADIM SHIBA / FULLSTACK ENGINEER",
    heroTitle: "Запускаю продукты, которые держат реальный трафик.",
    heroLead:
      "Проектирую и разрабатываю backend API, frontend UX, Telegram-first решения и production-процессы.",
    email: "Почта",
    website: "Сайт",
    metrics: [
      { label: "Локация", value: "Астана, Казахстан" },
      { label: "Публичные репозитории", value: "5" },
      { label: "Фокус", value: "Product engineering" },
    ],
    telemetryTitle: "Состояния доставки",
    telemetrySubtitle: "pipeline: discover -> design -> ship -> scale",
    stackTitle: "Технологический стек",
    highlights: [
      "Backend API + Frontend UX + DevOps delivery",
      "Telegram-native продукты для реальных пользователей",
      "Безопасность и производительность под прод-нагрузку",
    ],
    projectsTitle: "Избранные репозитории",
    viewAll: "Смотреть все",
    navHome: "Главная",
    navProjects: "Проекты",
    navServices: "Сервисы",
    modulesTitle: "Инженерные модули",
    modulesSubtitle: "Переиспользуемые векторные и интерактивные блоки для продуктовых поверхностей",
    moduleCards: [
      {
        title: "Security topology",
        text: "Слои защиты и anti-bot сценарии для production API.",
        href: "/services",
        hrefLabel: "Открыть страницу сервисов",
      },
      {
        title: "Product architecture",
        text: "Проектирование, разработка и delivery-паттерны для реальных продуктов.",
        href: "/projects",
        hrefLabel: "Открыть страницу проектов",
      },
      {
        title: "Release workflow",
        text: "Проверка готовности к релизу, наблюдаемость и планы масштабирования.",
        href: "/services",
        hrefLabel: "Смотреть release-сервисы",
      },
      {
        title: "Telegram ecosystem",
        text: "Боты, мини-аппы и автоматизации для реальной пользовательской нагрузки.",
        href: "/projects",
        hrefLabel: "Смотреть Telegram-проекты",
      },
    ],
    deviceTitle: "Лаборатория взаимодействий",
    deviceSubtitle: "Поведение под ОС/устройство, haptic hooks, наклон и ориентация",
    sensorButton: "Включить motion-сенсоры",
    vibrationButton: "Выполнить haptic-пульс",
    sensorIdle: "Сенсоры: ожидают доступ",
    sensorReady: "Сенсоры: активны",
    sensorDenied: "Сенсоры: доступ отклонён",
    sensorUnsupported: "Сенсоры: не поддерживаются",
    osLabel: "Операционная система",
    deviceLabel: "Класс устройства",
    inputLabel: "Основной ввод",
    orientationLabel: "Ориентация экрана",
    tiltLabel: "Показания наклона",
    hapticLabel: "Haptic-канал",
    portrait: "Портрет",
    landscape: "Ландшафт",
    footer:
      "Открыт к сотрудничеству: product engineering, backend-системы и Telegram-экосистема.",
    states: [
      {
        id: "discover",
        label: "Исследование",
        summary: "Фиксирую риски, требования и границы архитектуры до начала кода.",
        tone: "ok",
      },
      {
        id: "design",
        label: "Проектирование",
        summary: "Определяю API-контракты, UX-состояния и точки телеметрии.",
        tone: "accent",
      },
      {
        id: "ship",
        label: "Релиз",
        summary: "Выпускаю итеративно с мониторингом и контролем рисков.",
        tone: "warn",
      },
      {
        id: "scale",
        label: "Масштаб",
        summary: "Укрепляю стабильность, лимиты и инфраструктуру под рост.",
        tone: "ok",
      },
    ],
    repos: [
      {
        name: "antibot-shield",
        url: "https://github.com/vadimshiba/antibot-shield",
        text: "L7 anti-bot middleware с JS-челленджем, PoW и защитой от replay.",
        tags: ["Python", "FastAPI", "Security"],
      },
      {
        name: "dot_daily",
        url: "https://github.com/vadimshiba/dot_daily",
        text: "iOS-приложение для планирования дня с фокусом на простой flow.",
        tags: ["Swift", "iOS"],
      },
      {
        name: "telegram_file_bot",
        url: "https://github.com/vadimshiba/telegram_file_bot",
        text: "Telegram-бот автоматизации с антиспам-верификацией пользователей.",
        tags: ["Python", "Telegram"],
      },
    ],
  },
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }
    return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [deviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === "undefined") {
      return {
        os: "Unknown",
        device: "Unknown",
        input: "Pointer",
        vibration: false,
        haptics: "Unavailable",
        hapticsAvailable: false,
      };
    }

    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const maxTouchPoints = navigator.maxTouchPoints ?? 0;
    const hasTouch = maxTouchPoints > 0 || "ontouchstart" in window;
    const os = detectOs(ua, platform);
    const device = detectDevice(ua, maxTouchPoints);
    const vibration = "vibrate" in navigator;
    const tgHaptics = hasTelegramHaptics();

    return {
      os,
      device,
      input: hasTouch ? "Touch" : "Pointer",
      vibration,
      haptics: tgHaptics ? "Telegram WebApp" : vibration ? "Vibration API" : "Unavailable",
      hapticsAvailable: tgHaptics || vibration,
    };
  });

  const [preloading, setPreloading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStateId, setActiveStateId] = useState("discover");
  const [sensorState, setSensorState] = useState<SensorState>(() => {
    if (typeof window === "undefined") {
      return "idle";
    }
    return "DeviceOrientationEvent" in window ? "idle" : "unsupported";
  });
  const [screenMode, setScreenMode] = useState(() => readOrientationMode());
  const [tiltReadout, setTiltReadout] = useState({ x: 0, y: 0 });

  const { scrollY, scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 18, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 18, mass: 0.5 });

  const meshAX = useTransform(smoothX, (v) => v * 44);
  const meshAY = useTransform(() => smoothY.get() * 34 - scrollY.get() * 0.12);
  const meshBX = useTransform(smoothX, (v) => v * -34);
  const meshBY = useTransform(() => smoothY.get() * -28 - scrollY.get() * 0.08);
  const heroY = useTransform(scrollY, [0, 800], [0, -72]);
  const gridDrift = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const glowShift = useTransform(() => smoothX.get() * 24 + smoothY.get() * 16);
  const tiltDotX = useTransform(smoothX, (v) => v * 45);
  const tiltDotY = useTransform(smoothY, (v) => v * 30);

  const copy = content[locale];
  const activeState = copy.states.find((item) => item.id === activeStateId) ?? copy.states[0];

  const orientationLabel =
    screenMode.includes("portrait")
      ? copy.portrait
      : screenMode.includes("landscape")
        ? copy.landscape
        : screenMode;

  const sensorStatusText =
    sensorState === "granted"
      ? copy.sensorReady
      : sensorState === "denied"
        ? copy.sensorDenied
        : sensorState === "unsupported"
          ? copy.sensorUnsupported
          : copy.sensorIdle;

  const requestDeviceSensors = async () => {
    if (sensorState === "unsupported") {
      return;
    }

    try {
      const orientationApi = DeviceOrientationEvent as DeviceOrientationEventWithPermission;
      if (typeof orientationApi.requestPermission === "function") {
        const permission = await orientationApi.requestPermission();
        if (permission !== "granted") {
          setSensorState("denied");
          triggerHaptic("heavy");
          return;
        }
      }

      setSensorState("granted");
      triggerHaptic("medium");
    } catch {
      setSensorState("denied");
      triggerHaptic("heavy");
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = preloading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preloading]);

  useEffect(() => {
    const onResize = () => {
      setScreenMode(readOrientationMode());
    };

    const onOrientation = () => {
      setScreenMode(readOrientationMode());
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientation);

    const screenOrientation = window.screen?.orientation;
    const onScreenOrientationChange = () => {
      setScreenMode(readOrientationMode());
    };
    screenOrientation?.addEventListener?.("change", onScreenOrientationChange);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      screenOrientation?.removeEventListener?.("change", onScreenOrientationChange);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    let doneTimer = 0;
    const duration = reduceMotion ? 500 : 1800;
    const start = performance.now();

    const frame = (now: number) => {
      const linear = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - linear) ** 3;
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      doneTimer = window.setTimeout(() => {
        setPreloading(false);
      }, reduceMotion ? 80 : 260);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(doneTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || sensorState === "granted") {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, reduceMotion, sensorState]);

  useEffect(() => {
    if (reduceMotion || sensorState !== "granted") {
      return;
    }

    const onDeviceTilt = (event: DeviceOrientationEvent) => {
      const gamma = Math.max(-45, Math.min(45, event.gamma ?? 0));
      const beta = Math.max(-45, Math.min(45, event.beta ?? 0));

      mouseX.set(gamma / 45);
      mouseY.set(beta / 45);
      setTiltReadout({ x: Math.round(gamma), y: Math.round(beta) });
    };

    window.addEventListener("deviceorientation", onDeviceTilt, true);
    return () => {
      window.removeEventListener("deviceorientation", onDeviceTilt, true);
    };
  }, [mouseX, mouseY, reduceMotion, sensorState]);

  return (
    <>
      <AnimatePresence>
        {preloading ? (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
          >
            <motion.div
              className="preloader-inner"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="preloader-ring"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <p>{copy.loadingTitle}</p>
              <span>{copy.loadingSubtitle}</span>
              <div
                className="preloader-bar"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.i
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              <strong>{progress}%</strong>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.main
        className="landing"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: preloading ? 0 : 1, filter: preloading ? "blur(10px)" : "blur(0px)" }}
        transition={{ duration: 0.75 }}
      >
        <div className="ambient" aria-hidden="true">
          <motion.div
            className="mesh mesh-a"
            style={{ x: meshAX, y: meshAY }}
            animate={reduceMotion ? undefined : { rotate: [0, 8, -6, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="mesh mesh-b"
            style={{ x: meshBX, y: meshBY }}
            animate={reduceMotion ? undefined : { rotate: [0, -12, 6, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 17, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div className="grid-layer" style={{ y: gridDrift }} />
          <motion.div className="glow-layer" style={{ x: glowShift }} />
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -16, 0],
                      opacity: [0.1, 0.55, 0.15],
                      scale: [0.9, 1.3, 1],
                    }
              }
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.header
          className="top-bar"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
        >
          <div className="signature">VS</div>
          <nav className="page-nav" aria-label="Primary navigation">
            <Link href="/" className="nav-link active" onPointerDown={() => triggerHaptic("light")}>
              {copy.navHome}
            </Link>
            <Link href="/projects" className="nav-link" onPointerDown={() => triggerHaptic("light")}>
              {copy.navProjects}
            </Link>
            <Link href="/services" className="nav-link" onPointerDown={() => triggerHaptic("light")}>
              {copy.navServices}
            </Link>
          </nav>
          <div className="bar-controls">
            <button
              type="button"
              className="control-btn"
              onClick={() => {
                const nextLocale: Locale = locale === "en" ? "ru" : "en";
                setLocale(nextLocale);
                triggerHaptic("light");
              }}
              aria-label="Switch language"
            >
              {copy.switchLang}
            </button>
            <button
              type="button"
              className="control-btn"
              onClick={() => {
                const nextTheme: Theme = theme === "dark" ? "light" : "dark";
                setTheme(nextTheme);
                triggerHaptic("light");
              }}
              aria-label={copy.switchTheme}
            >
              {theme === "dark" ? copy.lightMode : copy.darkMode}
            </button>
          </div>
        </motion.header>

        <motion.section
          className="hero panel"
          style={{ y: heroY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <motion.h1
            animate={reduceMotion ? undefined : { backgroundPositionX: ["0%", "100%", "0%"] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {copy.heroTitle}
          </motion.h1>
          <p className="lead">{copy.heroLead}</p>

          <div className="actions">
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn primary"
              href="mailto:vadimshiba@duck.com"
              onPointerDown={() => triggerHaptic("light")}
            >
              {copy.email}
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn ghost"
              href="https://github.com/vadimshiba"
              target="_blank"
              rel="noreferrer"
              onPointerDown={() => triggerHaptic("light")}
            >
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn ghost"
              href="https://bitsquad.team"
              target="_blank"
              rel="noreferrer"
              onPointerDown={() => triggerHaptic("light")}
            >
              {copy.website}
            </motion.a>
          </div>

          <div className="metrics">
            {copy.metrics.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <section className="grid-row">
          <motion.section
            className="panel states"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <h2>{copy.telemetryTitle}</h2>
            <p className="section-text">{copy.telemetrySubtitle}</p>
            <div className="state-list" role="tablist" aria-label="Delivery states">
              {copy.states.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeState.id === item.id}
                  className={`state-pill ${activeState.id === item.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveStateId(item.id);
                    triggerHaptic("light");
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${locale}-${activeState.id}`}
                className={`state-card tone-${activeState.tone}`}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.24 }}
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
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.06 }}
          >
            <h2>{copy.stackTitle}</h2>
            <div className="chip-grid">
              {stackItems.map((item, index) => (
                <motion.span
                  key={item}
                  className="chip"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, delay: index * 0.03 }}
                  whileHover={{ y: -1, scale: 1.06 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <ul className="highlights">
              {copy.highlights.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </section>

        <motion.section
          className="panel projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62 }}
        >
          <div className="projects-head">
            <h2>{copy.projectsTitle}</h2>
            <motion.a
              whileHover={{ x: 4 }}
              href="https://github.com/vadimshiba?tab=repositories"
              target="_blank"
              rel="noreferrer"
              onPointerDown={() => triggerHaptic("light")}
            >
              {copy.viewAll}
            </motion.a>
          </div>

          <div className="project-grid">
            {copy.repos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="repo-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.012 }}
                onPointerDown={() => triggerHaptic("light")}
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

        <motion.section
          className="panel icon-lab"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="icons-head">
            <h2>{copy.modulesTitle}</h2>
            <p>{copy.modulesSubtitle}</p>
          </div>
          <div className="icon-grid">
            {copy.moduleCards.map((card, index) => {
              const iconMap = [ShieldPulseIcon, OrbitCodeIcon, RocketLaunchIcon, BotWaveIcon];
              const Icon = iconMap[index % iconMap.length];

              return (
                <motion.article
                  key={card.title}
                  className="icon-card"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <Icon className="feature-icon" />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <Link href={card.href} onPointerDown={() => triggerHaptic("light")}>
                    {card.hrefLabel}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="panel device-lab"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.62 }}
        >
          <div className="device-head">
            <h2>{copy.deviceTitle}</h2>
            <p>{copy.deviceSubtitle}</p>
          </div>

          <div className="device-grid">
            <article className="device-card">
              <span>{copy.osLabel}</span>
              <strong>{deviceInfo.os}</strong>
            </article>
            <article className="device-card">
              <span>{copy.deviceLabel}</span>
              <strong>{deviceInfo.device}</strong>
            </article>
            <article className="device-card">
              <span>{copy.inputLabel}</span>
              <strong>{deviceInfo.input}</strong>
            </article>
            <article className="device-card">
              <span>{copy.orientationLabel}</span>
              <strong>{orientationLabel}</strong>
            </article>
            <article className="device-card">
              <span>{copy.tiltLabel}</span>
              <strong>{`${tiltReadout.x} / ${tiltReadout.y}`}</strong>
            </article>
            <article className="device-card">
              <span>{copy.hapticLabel}</span>
              <strong>{deviceInfo.haptics}</strong>
            </article>
          </div>

          <div className="sensor-actions">
            <button
              type="button"
              className="tiny-btn"
              onClick={requestDeviceSensors}
              disabled={sensorState === "unsupported" || sensorState === "granted"}
            >
              {copy.sensorButton}
            </button>
            <button
              type="button"
              className="tiny-btn"
              onClick={() => triggerHaptic("heavy")}
              disabled={!deviceInfo.hapticsAvailable}
            >
              {copy.vibrationButton}
            </button>
            <span className={`sensor-badge sensor-${sensorState}`}>{sensorStatusText}</span>
          </div>

          <div className="tilt-stage" aria-hidden="true">
            <div className="tilt-center" />
            <motion.div className="tilt-dot" style={{ x: tiltDotX, y: tiltDotY }} />
          </div>
        </motion.section>

        <motion.footer
          className="footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55 }}
        >
          <p>{copy.footer}</p>
        </motion.footer>
      </motion.main>
    </>
  );
}
