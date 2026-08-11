import { useEffect, useMemo, useRef } from "react";

interface GridPoint {
  x: number;
  y: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  color: "cyan" | "ember";
}

export default function SentinelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const points = useMemo(() => {
    const pts: GridPoint[] = [];
    const cols = 24;
    const rows = 14;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Slight randomness to break the grid
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        pts.push({
          x: (c / (cols - 1)) * 100 + jitterX * 0.3,
          y: (r / (rows - 1)) * 100 + jitterY * 0.3,
          baseOpacity: 0.08 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.7,
          // Right side (city) is cyan, left side (hills) is ember
          color: c / cols > 0.55 ? "cyan" : Math.random() > 0.3 ? "ember" : "cyan",
        });
      }
    }
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const cyanColor = { r: 143, g: 217, b: 232 };
    const emberColor = { r: 201, g: 123, b: 74 };

    let startTime = performance.now();

    const draw = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      for (const pt of points) {
        const px = (pt.x / 100) * w;
        const py = (pt.y / 100) * h;

        let opacity: number;
        if (reducedMotion.current) {
          opacity = pt.baseOpacity * 0.6;
        } else {
          opacity =
            pt.baseOpacity *
            (0.3 + 0.7 * ((Math.sin(elapsed * pt.speed + pt.phase) + 1) / 2));
        }

        const c = pt.color === "cyan" ? cyanColor : emberColor;
        const radius = pt.color === "cyan" ? 1.2 : 1.5;

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
        ctx.fill();

        // Soft glow
        if (opacity > 0.3) {
          ctx.beginPath();
          ctx.arc(px, py, radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity * 0.12})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
