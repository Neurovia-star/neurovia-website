"use client";

import { ArrowUpRight } from "lucide-react";
import { courses } from "@/lib/data";
import { useAuthModal } from "./AuthModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Courses() {
  const { openAuth } = useAuthModal();

  return (
    <section id="courses" className="relative scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Career tracks"
          title="Courses engineered for the real world"
          description="Six focused tracks that take you from fundamentals to job-ready skills — every one built around hands-on projects, not slideshows."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => {
            const Icon = course.icon;
            return (
              <Reveal key={course.title} delay={(i % 3) * 0.12}>
                <article className="card-glow group flex h-full flex-col rounded-3xl p-7">
                  <div className="mb-6 flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${course.gradient} text-night-950 shadow-lg`}
                    >
                      <Icon size={24} strokeWidth={2.2} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white">
                    {course.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[0.68rem] font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-neon-400/25 bg-neon-400/[0.06] px-5 py-3 text-sm font-semibold text-neon-300 transition group-hover:border-neon-400/60 group-hover:bg-neon-400/15 group-hover:text-white"
                  >
                    Enroll now
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
