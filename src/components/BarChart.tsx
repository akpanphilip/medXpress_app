import { cn } from "@/lib/utils";

interface Datum {
  label: string;
  value: number;
}

/** Lightweight CSS bar chart (no chart library needed). */
export default function BarChart({
  data,
  tone = "sky",
  unit = "",
  height = 170,
}: {
  data: Datum[];
  tone?: "sky" | "red";
  unit?: string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barColor =
    tone === "sky"
      ? "from-sky/60 to-sky"
      : "from-red/60 to-red";

  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height }}>
      {data.map((d) => {
        const pct = Math.max((d.value / max) * 100, 4);
        return (
          <div
            key={d.label}
            className="flex h-full flex-1 flex-col items-center gap-2"
          >
            <div className="flex w-full flex-1 items-end">
              <div
                className={cn(
                  "group relative w-full rounded-t-lg bg-gradient-to-t",
                  barColor,
                )}
                style={{ height: `${pct}%` }}
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-1.5 py-0.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                  {unit}
                  {d.value.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-muted">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
