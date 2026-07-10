import Image from "next/image";
import { contact, courses, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-night-950/60 px-5 pb-10 pt-16 backdrop-blur sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <a href="#home" className="flex items-center gap-2.5">
            <span className="relative h-9 w-9 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
              <Image
                src="/logo-mark.png"
                alt="NEUROVIA logo"
                fill
                sizes="36px"
                className="object-contain"
              />
            </span>
            <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
              NEUROVIA
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
            A future-focused learning platform turning curiosity into
            confidence — and skills into career-ready results.
          </p>
        </div>

        {/* Navigate */}
        <nav aria-label="Footer navigation">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-slate-300">
            Navigate
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-500 transition hover:text-neon-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tracks */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-slate-300">
            Tracks
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {courses.slice(0, 5).map((course) => (
              <li key={course.title}>
                <a
                  href="#courses"
                  className="text-sm text-slate-500 transition hover:text-neon-300"
                >
                  {course.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-slate-300">
            Contact
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-slate-500">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition hover:text-neon-300"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neon-300"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neon-300"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neon-300"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} NEUROVIA. All rights reserved.
        </p>
        <p className="text-xs text-slate-600">
          Built for the next generation of builders.
        </p>
      </div>
    </footer>
  );
}
