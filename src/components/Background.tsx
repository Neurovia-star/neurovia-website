import NeuralField from "./NeuralField";

export default function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night-950"
      aria-hidden="true"
    >
      {/* Base depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,#0b1730_0%,#060a14_45%,#030509_100%)]" />

      {/* Aurora blobs */}
      <div className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vw] animate-aurora-a rounded-full bg-[radial-gradient(circle,rgba(34,228,255,0.14),transparent_65%)] blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 h-[75vh] w-[70vw] animate-aurora-b rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_65%)] blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-[40vh] w-[40vw] -translate-x-1/2 animate-pulse-slow rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.06),transparent_70%)] blur-3xl" />

      {/* Neural particle network */}
      <NeuralField />

      {/* Fine grid overlay, faded toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,244,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(125,244,255,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
        }}
      />

      {/* Vignette to keep text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_40%,rgba(3,5,9,0.55)_100%)]" />
    </div>
  );
}
