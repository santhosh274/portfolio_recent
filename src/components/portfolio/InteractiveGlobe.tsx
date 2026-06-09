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

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let pingTimeoutId: ReturnType<typeof setTimeout>;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // --- GLOBE CONFIG ---
    const radius = Math.min(width, height) * 0.38;
    let centerX = width / 2;
    let centerY = height / 2;
    const angleX = 0.22;

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
      const theta = Math.random() * Math.PI * 2;
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

    // --- PRE-COMPUTE EDGES (3D proximity) ---
    const MAX_DIST_3D = radius * 0.72;
    const edges: [number, number][] = [];
    // Only network + outer nodes participate in edges/pings
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
    schedulePing();

    // --- PROJECTION ---
    let angleY = 0;
    let lastTime = performance.now();

    const project = (p: Point3D, ay: number): { x: number; y: number; z: number } => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = p.baseX * cosY - p.baseZ * sinY;
      const z1 = p.baseZ * cosY + p.baseX * sinY;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = p.baseY * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.baseY * sinX;
      const perspective = 1000;
      const scale = perspective / (perspective + z2);
      return { x: centerX + x1 * scale, y: centerY + y2 * scale, z: z2 };
    };

    // --- RENDER LOOP ---
    const render = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      angleY += 0.0022 * (dt / 16.67);

      ctx.clearRect(0, 0, width, height);

      // Project all points
      const projected: ProjectedPoint[] = points.map((p, i) => ({
        ...project(p, angleY),
        layer: p.layer,
        isHub: p.isHub,
        index: i,
      }));

      // --- STATIC EDGES ---
      const MAX_SCREEN = 90;
      ctx.lineWidth = 0.6;
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        if (Math.sqrt(dx * dx + dy * dy) > MAX_SCREEN) continue;
        const front = p1.z < 0 && p2.z < 0;
        const alpha = front ? 0.22 : 0.065;
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // --- PINGS ---
      for (let k = pings.length - 1; k >= 0; k--) {
        const pg = pings[k];
        const t = (now - pg.born) / pg.duration;
        if (t >= 1) {
          pings.splice(k, 1);
          continue;
        }

        const p1 = projected[pg.from];
        const p2 = projected[pg.to];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        if (Math.sqrt(dx * dx + dy * dy) > MAX_SCREEN * 1.5) continue;

        // Ease-in-out quadratic
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const px = p1.x + (p2.x - p1.x) * ease;
        const py = p1.y + (p2.y - p1.y) * ease;

        const front = (p1.z + p2.z) / 2 < 0;
        const lineAlpha = front ? 0.6 : 0.18;

        // Highlight edge while ping travels
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.lineWidth = 0.6;

        // Ping dot
        const dotSize = front ? 3.4 : 1.8;
        const dotAlpha = front ? 0.95 : 0.35;
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
        ctx.fill();

        // Expanding ring around dot (front only)
        if (front) {
          const ring = (t % 0.25) / 0.25;
          ctx.beginPath();
          ctx.arc(px, py, dotSize + ring * 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - ring) * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.lineWidth = 0.6;
        }

        // Arrival burst at destination
        if (t > 0.92) {
          const burst = (t - 0.92) / 0.08;
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, burst * 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - burst) * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.lineWidth = 0.6;
        }
      }

      // --- NODES (sorted back-to-front) ---
      const sorted = [...projected].sort((a, b) => b.z - a.z);

      for (const p of sorted) {
        const front = p.z < 0;

        if (p.layer === "core") {
          const size = front ? 1.4 : 0.7;
          const alpha = front ? 0.6 : 0.15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.fill();
        } else if (p.layer === "network") {
          if (p.isHub) {
            const size = front ? 3.2 : 1.4;
            const alpha = front ? 0.9 : 0.25;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.fill();
            if (front) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(34, 211, 238, 0.2)`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.lineWidth = 0.6;
            }
          } else {
            const size = front ? 2.2 : 1.1;
            const alpha = front ? 0.75 : 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.fill();
          }
        } else if (p.layer === "outer") {
          const size = front ? 3.0 : 1.0;
          const alpha = front ? 0.9 : 0.15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // --- RESIZE ---
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      centerX = width / 2;
      centerY = height / 2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(pingTimeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[500px] max-h-[500px] pointer-events-none flex items-center justify-center">
      {/* Ambient glow backing */}
      <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[80px]" />

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain mix-blend-screen opacity-90"
      />
    </div>
  );
}