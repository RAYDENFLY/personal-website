"use client";

import { useEffect, useState } from "react";

type LiveProgressProps = {
  timestamps?: {
    start: number;
    end?: number;
  };
};

export function LiveProgress({ timestamps }: LiveProgressProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!timestamps) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamps]);

  if (!timestamps) {
    return null;
  }

  const { start, end } = timestamps;
  const elapsedRaw = now - start;
  const elapsed = Math.max(0, elapsedRaw);

  const hasEnd = typeof end === "number" && end > start;
  const total = hasEnd ? end - start : 0;
  
  const percent = hasEnd ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 100;

  return (
    <div className="h-[3px] overflow-hidden rounded-full bg-[var(--pink-light)]">
      <div
        className="h-full rounded-full bg-[var(--pink-dark)] transition-all duration-1000 ease-linear"
        style={{ width: hasEnd ? `${percent}%` : "100%" }}
      />
    </div>
  );
}
