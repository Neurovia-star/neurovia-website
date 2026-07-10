"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { marqueeItems } from "@/lib/data";
import { useAuthModal } from "./AuthModal";
import { useLoading } from "./LoadingScreen";

const stats = [
  { value: "6", label: "Career tracks" },
  { value: "24/7", label: "Online access" },
  { value: "100%", label: "Hands-on projects" },
  { value: "Cert.", label: "On completion" },
];

export default function Hero() {
  const { openAuth } = useAuthModal();
  const { done } = useLoading();
  const reduceMotion = useReducedMotion();

  // Entrance plays only once the loading screen starts revealing the site
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    animate: reduceMotion ? undefined : done ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-24 text-center sm:px-8"
    >
      {/* Badge */}
      <motion.div {...fadeUp(0.05)}>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-neon-300">
          <Sparkles size={14} className="text-neon-400" />
          Next-generation tech academy
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.15)}
        className="mt-7 max-w-5xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
      >
        <span className="text-gradient-soft block">Upgrade your skills.</span>
        <span className="text-gradient block">Engineer your future.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        {...fadeUp(0.3)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
      >
        Practical, career-ready training in cybersecurity, cloud engineering,
        AI automation, and digital skills — built to turn curiosity into
        confidence.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.45)}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a href="#courses" className="btn-primary">
          Explore courses
          <ArrowRight size={18} />
        </a>
        <button
          type="button"
          onClick={() => openAuth("signup")}
          className="btn-ghost"
        >
          Become a member
        </button>
      </motion.div>

      {/* Stats */}
      <motion.dl
        {...fadeUp(0.6)}
        className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl px-4 py-5 transition hover:border-neon-400/30"
          >
            <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
              {stat.value}
            </dd>
            <dt className="mt-1 text-xs uppercase tracking-widest text-slate-500">
              {stat.label}
            </dt>
          </div>
        ))}
      </motion.dl>

      {/* Skills marquee */}
      <motion.div
        {...fadeUp(0.75)}
        className="mt-16 w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap py-2">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-slate-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon-400 to-pulse-400" />
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#courses"
        aria-label="Scroll to courses"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: done ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-neon-300"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
