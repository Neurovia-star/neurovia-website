"use client";

import { ArrowRight } from "lucide-react";
import { useAuthModal } from "./AuthModal";
import Reveal from "./Reveal";

export default function CtaBand() {
  const { openAuth } = useAuthModal();

  return (
    <section className="relative px-5 py-16 sm:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-night-800 via-night-900 to-night-950 px-8 py-14 text-center sm:px-14">
          {/* Glow accents */}
          <div className="pointer-events-none absolute -top-24 left-1/4 h-56 w-56 rounded-full bg-neon-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-pulse-500/25 blur-3xl" />

          <h2 className="relative font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your future doesn’t wait.
            <span className="text-gradient block">Neither should you.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate-400">
            Join NEUROVIA today and start building the skills that the next
            decade of tech is hiring for.
          </p>
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="btn-primary relative mt-8"
          >
            Start learning now
            <ArrowRight size={18} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
