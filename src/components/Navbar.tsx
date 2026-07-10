"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { useAuthModal } from "./AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openAuth } = useAuthModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile links: the collapsing menu panel unmounts the clicked anchor,
  // which cancels the browser's native smooth scroll — so close the menu
  // first and drive the scroll ourselves once the panel is gone.
  const handleMobileNav =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMenuOpen(false);
      window.setTimeout(() => {
        const target = document.querySelector(href);
        if (!target) return;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", href);
      }, 350);
    };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-night-950/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative h-10 w-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.55)] transition group-hover:drop-shadow-[0_0_16px_rgba(139,92,246,0.85)]">
            <Image
              src="/logo-mark.png"
              alt="NEUROVIA logo"
              fill
              sizes="40px"
              priority
              className="object-contain"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
            NEUROVIA
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-slate-300 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-neon-400 after:to-pulse-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => openAuth("signin")}
            className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-neon-400/50 hover:text-white"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="btn-primary !px-5 !py-2.5 !text-sm"
          >
            Get started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden border-b border-white/[0.06] bg-night-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleMobileNav(link.href)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex gap-3 px-2 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openAuth("signin");
                  }}
                  className="flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openAuth("signup");
                  }}
                  className="btn-primary flex-1 !py-3 !text-sm"
                >
                  Get started
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
