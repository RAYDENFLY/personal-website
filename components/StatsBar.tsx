import { stats } from "@/lib/content";
import { renderIcon } from "@/lib/icons";

export function StatsBar() {
  return (
    <div className="stats-bar reveal" aria-label="Statistik Raydenfly">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <div className={`stat-num ${typeof stat.value === "string" && stat.value.includes("Infinity") ? "stat-num-infinity" : ""}`}>
            {typeof stat.value === "string" ? stat.value : renderIcon(stat.value)}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
