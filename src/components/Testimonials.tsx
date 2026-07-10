"use client";

import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Success stories"
          title="Learners who leveled up"
          description="Real feedback from people who turned NEUROVIA tracks into confidence and career momentum."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="card-glow flex h-full flex-col rounded-3xl p-7">
                <Quote size={26} className="mb-5 text-neon-400/60" />
                <blockquote className="flex-1 leading-relaxed text-slate-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-300">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
