import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }

        return current + Math.floor(Math.random() * 8) + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-night text-paper">
      <div className="w-full max-w-sm px-6 text-center">

        {/* Small identifier */}
        <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-cyan-steel/60 uppercase">
          California · 2113
        </p>

        {/* Title */}
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          The Last
          <span className="block text-ember">
            Empiricists
          </span>
        </h1>

        {/* Divider */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-ember/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
          <span className="h-px w-12 bg-cyan-steel/40" />
        </div>

        {/* Status */}
        <div className="mt-10">
          <div className="mb-2 flex justify-between font-mono text-[10px] tracking-[0.15em] text-paper-faint/50 uppercase">
            <span>Initializing</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>

          <div className="h-px w-full bg-paper/10">
            <div
              className="h-px bg-ember transition-all duration-100"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-5 font-mono text-[9px] tracking-[0.2em] text-paper-faint/30 uppercase">
          Observe · Test · Decide for yourself
        </p>
      </div>
    </div>
  );
}