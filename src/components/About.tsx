"use client";

import { Award, Clock, GraduationCap, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const benefits = [
  {
    icon: GraduationCap,
    title: "Hands-on projects",
    text: "Build real portfolios, not just certificates.",
  },
  {
    icon: Users,
    title: "Career-focused mentorship",
    text: "Guidance from people working in the field.",
  },
  {
    icon: Clock,
    title: "Flexible online access",
    text: "Learn anywhere, anytime, at your own pace.",
  },
  {
    icon: Award,
    title: "Beginner-friendly paths",
    text: "Start from zero and ramp up with confidence.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Neurovia"
            title="Learning that connects directly to opportunity"
            description="NEUROVIA is a future-focused learning platform that helps students and professionals grow in cybersecurity, cloud, AI, automation, and digital skills."
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
              We believe learning should be practical, exciting, and directly
              connected to real-world opportunities. Our courses are designed
              to turn curiosity into confidence — and skills into career-ready
              results.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <div className="card-glow h-full rounded-3xl p-6">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-neon-400/15 to-pulse-500/15 text-neon-300">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-base font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {benefit.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
