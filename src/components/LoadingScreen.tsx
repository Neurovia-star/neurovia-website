"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type LoadingContextValue = {
  done: boolean;
};

const LoadingContext = createContext<LoadingContextValue>({ done: true });

export function useLoading() {
  return useContext(LoadingContext);
}

const SEEN_KEY = "neurovia-loader-seen";

// localStorage (not sessionStorage): the boot intro plays once per browser,
// ever — reloads, new tabs, and return visits all skip it, Gmail-style.
let seenCache: boolean | null = null;
const subscribeNoop = () => () => {};
const getSeenSnapshot = () => {
  if (seenCache === null) {
    try {
      seenCache = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seenCache = true;
    }
  }
  return seenCache;
};
const getSeenServerSnapshot = () => false;

const STATUS_MESSAGES: Array<{ threshold: number; text: string }> = [
  { threshold: 0, text: "Initializing neural interface" },
  { threshold: 32, text: "Calibrating synaptic links" },
  { threshold: 62, text: "Establishing secure uplink" },
  { threshold: 88, text: "Reality sync complete" },
];

type Star = { top: number; left: number; size: number; delay: number };

// Seeded PRNG so the starfield is identical on server and client (hydration-safe)
function generateStars(count: number): Star[] {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    top: rand() * 100,
    left: rand() * 100,
    size: 0.8 + rand() * 1.8,
    delay: rand() * 3,
  }));
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const alreadySeen = useSyncExternalStore(
    subscribeNoop,
    getSeenSnapshot,
    getSeenServerSnapshot
  );
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const reduceMotion = useReducedMotion();
  const stars = useMemo(() => generateStars(90), []);

  const visible = !alreadySeen && !finished;
  const done = alreadySeen || finished;

  useEffect(() => {
    if (alreadySeen) return;
    const interval = setInterval(
      () => {
        setProgress((prev) => {
          const step = reduceMotion
            ? 25
            : prev > 82
              ? 1 + Math.random() * 2
              : 2 + Math.random() * 4;
          return Math.min(100, prev + step);
        });
      },
      reduceMotion ? 60 : 95
    );

    return () => clearInterval(interval);
  }, [alreadySeen, reduceMotion]);

  useEffect(() => {
    if (progress < 100 || finished) return;
    // Hold "sync complete" on screen for a beat, then reveal the site
    const t = setTimeout(() => {
      setFinished(true);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // storage unavailable — loader will simply replay next time
      }
    }, 650);
    return () => clearTimeout(t);
  }, [progress, finished]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const status =
    [...STATUS_MESSAGES].reverse().find((m) => progress >= m.threshold) ??
    STATUS_MESSAGES[0];

  return (
    <LoadingContext.Provider value={{ done }}>
      {children}
      {/* Rendered only when this session hasn't seen the loader yet, so
          returning visitors skip it instantly with no exit animation */}
      {!alreadySeen ? (
        <AnimatePresence>
          {!finished ? (
            <motion.div
              key="loader"
              data-boot-loader=""
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#01020a]"
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              aria-label="Loading NEUROVIA"
              role="status"
            >
              {/* Starfield */}
              <div className="absolute inset-0" aria-hidden="true">
                {stars.map((star, i) => (
                  <span
                    key={i}
                    className="absolute animate-twinkle rounded-full bg-white"
                    style={{
                      top: `${star.top}%`,
                      left: `${star.left}%`,
                      width: star.size,
                      height: star.size,
                      animationDelay: `${star.delay}s`,
                    }}
                  />
                ))}
              </div>

              {/* Nebula glows */}
              <div
                className="absolute h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(109,60,246,0.26),rgba(59,20,130,0.08)_55%,transparent_72%)] blur-2xl"
                aria-hidden="true"
              />
              <div
                className="absolute -translate-x-40 translate-y-24 h-[22rem] w-[22rem] animate-pulse-slow rounded-full bg-[radial-gradient(circle,rgba(34,228,255,0.1),transparent_70%)] blur-3xl"
                aria-hidden="true"
              />

              {/* HUD corner brackets */}
              <div className="absolute left-6 top-6 h-12 w-12 border-l-2 border-t-2 border-white/10" aria-hidden="true" />
              <div className="absolute right-6 top-6 h-12 w-12 border-r-2 border-t-2 border-white/10" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 h-12 w-12 border-b-2 border-l-2 border-white/10" aria-hidden="true" />
              <div className="absolute bottom-6 right-6 h-12 w-12 border-b-2 border-r-2 border-white/10" aria-hidden="true" />
              <p className="absolute left-12 top-10 text-[10px] font-medium uppercase tracking-[0.45em] text-slate-600">
                Neurovia // OS
              </p>
              <p className="absolute bottom-10 right-12 text-[10px] font-medium uppercase tracking-[0.45em] text-slate-600">
                Boot v2.0
              </p>

              {/* Emblem cluster */}
              <div className="relative grid h-80 w-80 place-items-center sm:h-96 sm:w-96">
                {/* Outer segmented arc — violet, clockwise */}
                <svg
                  className="absolute inset-0 animate-orbit"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48.5"
                    stroke="rgba(139,92,246,0.8)"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="22 8 4 8 14 8 4 32"
                  />
                </svg>

                {/* Second arc — cyan, counter-clockwise */}
                <svg
                  className="absolute inset-[7%] animate-orbit-rev"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48.5"
                    stroke="rgba(34,228,255,0.55)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="10 14 28 14 10 24"
                  />
                </svg>

                {/* Energy trail bloom — soft blurred layer under the crisp trail */}
                <div
                  className="absolute inset-[13%] animate-orbit rounded-full blur-[6px]"
                  style={{
                    background:
                      "conic-gradient(from 20deg, transparent 0%, rgba(139,92,246,0.95) 12%, rgba(255,255,255,1) 19%, rgba(167,139,250,0.6) 27%, transparent 44%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 11px), black calc(100% - 10px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 11px), black calc(100% - 10px))",
                  }}
                  aria-hidden="true"
                />

                {/* Crisp energy trail — violet/white, clockwise */}
                <div
                  className="absolute inset-[13%] animate-orbit rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 20deg, transparent 0%, rgba(139,92,246,0.9) 12%, rgba(255,255,255,0.98) 19%, rgba(167,139,250,0.55) 27%, transparent 44%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 5px), black calc(100% - 4px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), black calc(100% - 4px))",
                  }}
                  aria-hidden="true"
                />

                {/* Inner energy trail — cyan, counter-clockwise */}
                <div
                  className="absolute inset-[17%] animate-orbit-rev rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 200deg, transparent 0%, rgba(34,228,255,0.75) 12%, rgba(255,255,255,0.85) 18%, transparent 36%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                  }}
                  aria-hidden="true"
                />

                {/* Fine tick ring */}
                <svg
                  className="absolute inset-[22%] animate-orbit-slow"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.3"
                    pathLength={100}
                    strokeDasharray="0.4 2.72"
                  />
                </svg>

                {/* The real emblem, pulsing */}
                <div className="relative h-44 w-44 animate-logo-pulse sm:h-52 sm:w-52">
                  <Image
                    src="/logo-mark.png"
                    alt="NEUROVIA"
                    fill
                    sizes="208px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Status + progress */}
              <div className="relative mt-8 flex w-72 flex-col items-center gap-4 sm:w-80">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={status.text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.45em] text-slate-300"
                  >
                    {status.text}
                  </motion.p>
                </AnimatePresence>

                <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pulse-500 via-neon-400 to-pulse-400 shadow-[0_0_14px_rgba(34,228,255,0.75)] transition-[width] duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex w-full items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-slate-600">
                    Sys.link
                  </span>
                  <span className="font-display text-sm font-semibold tracking-[0.25em] text-white">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </LoadingContext.Provider>
  );
}
