"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  layer: "core" | "network" | "outer";
  isHub: boolean;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  layer: "core" | "network" | "outer";
  isHub: boolean;
  index: number;
}

interface Ping {
  from: number;
  to: number;
  born: number;
  duration: number;
}

const TAU = Math.PI * 2;
const MAX_SCREEN = 90;

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let pingTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let running = false;

    // Cap DPR: this is a decorative canvas with sub-pixel strokes, so >1.5x
    // costs a lot of fill-rate for no perceptible gain.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = canvas.offsetWidth || 1;
    let height = canvas.offsetHeight || 1;

    const applyCanvasSize = () => {
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // setTransform (not scale) so repeated resizes never accumulate.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    applyCanvasSize();

    // --- GLOBE CONFIG ---
    const radius = Math.min(width, height) * 0.38;
    let centerX = width / 2;
    let centerY = height / 2;
    const angleX = 0.22;
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    // --- NODES ---
    const points: Point3D[] = [];

    // Core surface points
    const coreCount = 350;
    for (let i = 0; i < coreCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / coreCount);
      const theta = Math.sqrt(coreCount * Math.PI) * phi;
      points.push({
        baseX: radius * Math.sin(phi) * Math.cos(theta),
        baseY: radius * Math.sin(phi) * Math.sin(theta),
        baseZ: radius * Math.cos(phi),
        layer: "core",
        isHub: false,
      });
    }

    // Network nodes (pingable)
    const networkCount = 90;
    for (let i = 0; i < networkCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / networkCount);
      const theta = Math.sqrt(networkCount * Math.PI) * phi;
      const rVariance = radius * (0.95 + Math.random() * 0.15);
      points.push({
        baseX: rVariance * Math.sin(phi) * Math.cos(theta),
        baseY: rVariance * Math.sin(phi) * Math.sin(theta),
        baseZ: rVariance * Math.cos(phi),
        layer: "network",
        isHub: Math.random() < 0.18,
      });
    }

    // Outer atmosphere points
    const outerCount = 40;
    for (let i = 0; i < outerCount; i++) {
      const theta = Math.random() * TAU;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rVariance = radius * (1.1 + Math.random() * 0.15);
      points.push({
        baseX: rVariance * Math.sin(phi) * Math.cos(theta),
        baseY: rVariance * Math.sin(phi) * Math.sin(theta),
        baseZ: rVariance * Math.cos(phi),
        layer: "outer",
        isHub: false,
      });
    }

    // Reused projection buffer — no per-frame object allocation.
    const projected: ProjectedPoint[] = points.map((p) => ({
      x: 0,
      y: 0,
      z: 0,
      layer: p.layer,
      isHub: p.isHub,
      index: 0,
    }));

    // --- PRE-COMPUTE EDGES (3D proximity) ---
    const MAX_DIST_3D = radius * 0.72;
    const edges: [number, number][] = [];
    const pingableStart = coreCount;
    for (let i = pingableStart; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].baseX - points[j].baseX;
        const dy = points[i].baseY - points[j].baseY;
        const dz = points[i].baseZ - points[j].baseZ;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < MAX_DIST_3D) {
          edges.push([i, j]);
        }
      }
    }

    // --- PING STATE ---
    const pings: Ping[] = [];

    const schedulePing = () => {
      if (!running) return;
      if (edges.length > 0) {
        const edgeIdx = Math.floor(Math.random() * edges.length);
        const [a, b] = edges[edgeIdx];
        const reverse = Math.random() < 0.5;
        pings.push({
          from: reverse ? b : a,
          to: reverse ? a : b,
          born: performance.now(),
          duration: 900 + Math.random() * 700,
        });
      }
      pingTimeoutId = setTimeout(schedulePing, 120 + Math.random() * 280);
    };

    // --- PROJECTION ---
    let angleY = 0;
    let lastTime = 0;
    const PERSPECTIVE = 1000;

    // --- RENDER LOOP ---
    const render = (now: number) => {
      if (!running) return;
      animationFrameId = requestAnimationFrame(render);

      // Clamp delta so a stalled frame does not spin the globe.
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      angleY += 0.0022 * (dt / 16.67);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      ctx.clearRect(0, 0, width, height);

      // Project all points into the reused buffer
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;
        const scale = PERSPECTIVE / (PERSPECTIVE + z2);
        const out = projected[i];
        out.x = centerX + x1 * scale;
        out.y = centerY + y2 * scale;
        out.z = z2;
        out.layer = p.layer;
        out.isHub = p.isHub;
        out.index = i;
      }

      // --- STATIC EDGES (Pure White Connections) ---
      ctx.lineWidth = 0.8;
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        if (Math.sqrt(dx * dx + dy * dy) > MAX_SCREEN) continue;
        const front = p1.z < 0 && p2.z < 0;

        const alpha = front ? 0.45 : 0.15;
        ctx.strokeStyle = `rgba(42, 42, 42, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // --- PINGS (Electric Purple Paths & Nodes #a855f7) ---
      for (let k = pings.length - 1; k >= 0; k--) {
        const pg = pings[k];
        const t = (now - pg.born) / pg.duration;
        if (t >= 1 || t < 0) {
          if (t >= 1) pings.splice(k, 1);
          continue;
        }

        const p1 = projected[pg.from];
        const p2 = projected[pg.to];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        if (Math.sqrt(dx * dx + dy * dy) > MAX_SCREEN * 1.5) continue;

        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const px = p1.x + (p2.x - p1.x) * ease;
        const py = p1.y + (p2.y - p1.y) * ease;

        const front = (p1.z + p2.z) / 2 < 0;
        const lineAlpha = front ? 0.7 : 0.25;

        // Highlight line path while packet travels
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(220, 20, 60, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.lineWidth = 0.6;

        // Active Purple Ping dot
        const dotSize = front ? 3.6 : 1.8;
        const dotAlpha = front ? 1.0 : 0.5;
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, TAU);
        ctx.fillStyle = `rgba(220, 20, 60, ${dotAlpha})`;
        ctx.fill();

        // Expanding shockwave ring around the packet dot (front only)
        if (front) {
          const ring = Math.max(0, (t % 0.25) / 0.25);
          ctx.beginPath();
          ctx.arc(px, py, dotSize + ring * 8, 0, TAU);
          ctx.strokeStyle = `rgba(220, 20, 60, ${(1 - ring) * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.lineWidth = 0.6;
        }

        // Target arrival burst animation
        if (t > 0.92) {
          const burst = (t - 0.92) / 0.08;
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, burst * 12, 0, TAU);
          ctx.strokeStyle = `rgba(220, 20, 60, ${(1 - burst) * 0.8})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.lineWidth = 0.6;
        }
      }

      // --- GLOBE BODY NODES (Flat Black Elements) ---
      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const front = p.z < 0;

        if (p.layer === "core") {
          const size = front ? 1.5 : 0.8;
          const alpha = front ? 0.8 : 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, TAU);
          // Pure solid flat black tracking nodes
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.fill();
        } else if (p.layer === "network") {
          if (p.isHub) {
            const size = front ? 3.8 : 1.8;
            const alpha = front ? 1.0 : 0.4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, TAU);
            // Core Interactive Hub Centers set to Purple
            ctx.fillStyle = `rgba(220, 20, 60, ${alpha})`;
            ctx.fill();

            if (front) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.2, 0, TAU);
              ctx.strokeStyle = `rgba(255, 0, 51, 0.3)`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.lineWidth = 0.6;
            }
          } else {
            // Normal network edges are mapped as prominent structural black points
            const size = front ? 2.4 : 1.2;
            const alpha = front ? 0.75 : 0.25;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, TAU);
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.fill();
          }
        } else if (p.layer === "outer") {
          const size = front ? 3.0 : 1.2;
          const alpha = front ? 0.4 : 0.15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, TAU);
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.fill();
        }
      }
    };

    let onScreen = true;
    let tabVisible = document.visibilityState !== "hidden";

    const canRun = () => onScreen && tabVisible;

    const start = () => {
      if (running || !canRun()) return;
      running = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
      schedulePing();
    };

    const stop = () => {
      running = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      if (pingTimeoutId !== undefined) clearTimeout(pingTimeoutId);
      pingTimeoutId = undefined;
    };

    // --- RESIZE ---
    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      applyCanvasSize();
      centerX = width / 2;
      centerY = height / 2;
    };

    const handleVisibility = () => {
      tabVisible = document.visibilityState !== "hidden";
      if (canRun()) start();
      else stop();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    // Stop rendering entirely (not just skip) when scrolled offscreen.
    const obs = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (canRun()) start();
        else stop();
      },
      { threshold: 0 }
    );
    obs.observe(canvas);

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] pointer-events-none hidden md:flex items-center justify-center">
      {/* Soft dark purple aura to complement the white grid paths */}

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain opacity-[0.95]"
      />
    </div>
  );
}
