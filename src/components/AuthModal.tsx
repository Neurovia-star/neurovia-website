"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, X, Eye, EyeOff, ShieldCheck } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthMode = "signin" | "signup";

type AuthModalContextValue = {
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openAuth = useCallback((nextMode: AuthMode = "signin") => {
    setMode(nextMode);
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeAuth]);

  return (
    <AuthModalContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      <AuthDialog open={open} mode={mode} setMode={setMode} onClose={closeAuth} />
    </AuthModalContext.Provider>
  );
}

function AuthDialog({
  open,
  mode,
  setMode,
  onClose,
}: {
  open: boolean;
  mode: AuthMode;
  setMode: (m: AuthMode) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    tone: "info" | "error";
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setMessage({
        text: "Please enter both your email and password.",
        tone: "error",
      });
      return;
    }
    if (password.length < 6) {
      setMessage({
        text: "Your password should be at least 6 characters.",
        tone: "error",
      });
      return;
    }
    setMessage({
      text:
        mode === "signup"
          ? "Design preview — account creation connects to the backend in phase two."
          : "Design preview — sign-in connects to the backend in phase two.",
      tone: "info",
    });
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setMessage(null);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-night-950/70 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={mode === "signin" ? "Sign in" : "Create account"}
            className="glass-strong relative w-full max-w-md rounded-3xl p-8 shadow-[0_30px_80px_-20px_rgba(34,228,255,0.25)]"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-neon-400/20 to-pulse-500/20 text-neon-300">
                <ShieldCheck size={22} />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {mode === "signin" ? "Welcome back" : "Join NEUROVIA"}
                </h2>
                <p className="text-sm text-slate-400">
                  {mode === "signin"
                    ? "Sign in to continue learning."
                    : "Create your account in seconds."}
                </p>
              </div>
            </div>

            {/* Mode tabs */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-white/5 p-1">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    mode === m
                      ? "bg-gradient-to-r from-neon-400 to-pulse-400 text-night-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-night-950/50 px-4 py-3.5 transition focus-within:border-neon-400/60 focus-within:shadow-[0_0_0_3px_rgba(34,228,255,0.12)]">
                <Mail size={18} className="shrink-0 text-slate-500 transition group-focus-within:text-neon-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </label>

              <label className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-night-950/50 px-4 py-3.5 transition focus-within:border-neon-400/60 focus-within:shadow-[0_0_0_3px_rgba(34,228,255,0.12)]">
                <Lock size={18} className="shrink-0 text-slate-500 transition group-focus-within:text-neon-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-500 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </label>

              <button type="submit" className="btn-primary mt-2 w-full">
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="mt-4 min-h-[2.5rem]">
              <AnimatePresence mode="wait">
                {message ? (
                  <motion.p
                    key={message.text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl px-4 py-2.5 text-center text-sm ${
                      message.tone === "error"
                        ? "bg-rose-500/10 text-rose-300"
                        : "bg-neon-400/10 text-neon-300"
                    }`}
                  >
                    {message.text}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            <p className="mt-2 text-center text-xs text-slate-500">
              Protected by industry-standard encryption once live.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
