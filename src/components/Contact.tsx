"use client";

import { Camera, Mail, MessageCircle, Send } from "lucide-react";
import { contact } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    accent: "from-neon-400/15 to-sky-500/15 text-neon-300",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: contact.whatsapp,
    accent: "from-emerald-400/15 to-teal-500/15 text-emerald-300",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "Join the channel",
    href: contact.telegram,
    accent: "from-sky-400/15 to-blue-500/15 text-sky-300",
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "Follow the journey",
    href: contact.instagram,
    accent: "from-pink-400/15 to-rose-500/15 text-pink-300",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Talk to the NEUROVIA team"
          description="Questions about a track, enrollment, or partnerships? We respond within 24–48 hours."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <Reveal key={channel.label} delay={i * 0.1}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="card-glow group flex h-full flex-col items-center gap-3 rounded-3xl p-7 text-center"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${channel.accent}`}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-base font-bold text-white">
                    {channel.label}
                  </span>
                  <span className="break-all text-sm text-slate-400 transition group-hover:text-slate-300">
                    {channel.value}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
