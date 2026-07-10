"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseOffset: number;
};

// rgb triplets: mostly cyan, some violet, a hint of pink
const PALETTE = [
  "34, 228, 255",
  "34, 228, 255",
  "125, 244, 255",
  "139, 92, 246",
  "167, 139, 250",
  "244, 114, 182",
];

const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 220;

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const spawnParticles = () => {
      const target = Math.min(
        130,
        Math.max(45, Math.floor((width * height) / 16000))
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1 + Math.random() * 1.8,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnParticles();
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle pull toward the cursor
          const dxm = mouse.x - p.x;
          const dym = mouse.y - p.y;
          const mDist = Math.hypot(dxm, dym);
          if (mDist < MOUSE_DISTANCE && mDist > 0.001) {
            const force = ((MOUSE_DISTANCE - mDist) / MOUSE_DISTANCE) * 0.012;
            p.vx += (dxm / mDist) * force;
            p.vy += (dym / mDist) * force;
          }

          // Keep velocities calm
          const speed = Math.hypot(p.vx, p.vy);
          const maxSpeed = 0.6;
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }

          // Wrap around the edges
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        const pulse = reduceMotion
          ? 1
          : 0.75 + 0.25 * Math.sin(time * 0.0012 + p.pulseOffset);

        // Node glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.2 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.05)`;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.85)`;
        ctx.fill();
      }

      // Synapse links between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE) {
            continue;
          }
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Brighter links toward the cursor
        if (!reduceMotion) {
          const dxm = a.x - mouse.x;
          const dym = a.y - mouse.y;
          const mDist = Math.hypot(dxm, dym);
          if (mDist < MOUSE_DISTANCE) {
            const alpha = (1 - mDist / MOUSE_DISTANCE) * 0.38;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(125, 244, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      drawFrame(time);
      rafId = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Static constellation for users who prefer reduced motion
      drawFrame(0);
    } else {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("visibilitychange", onVisibility);
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
