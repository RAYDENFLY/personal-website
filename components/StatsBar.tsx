import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <div className="stats-bar reveal" aria-label="Statistik Raydenfly">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <div className={`stat-num ${stat.value === "\u221e" ? "stat-num-infinity" : ""}`}>
            {stat.value}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
