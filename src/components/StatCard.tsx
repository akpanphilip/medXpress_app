import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

type Tone = "sky" | "red" | "online" | "amber";

const toneRing: Record<Tone, string> = {
  sky: "bg-sky/12 text-sky",
  red: "bg-red/12 text-red",
  online: "bg-online/15 text-online",
  amber: "bg-amber/15 text-amber",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaUp,
  tone = "sky",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  tone?: Tone;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl",
            toneRing[tone],
          )}
        >
          <Icon size={20} />
        </div>
        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
              deltaUp
                ? "bg-online/12 text-online"
                : "bg-red/12 text-red",
            )}
          >
            {deltaUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold text-foreground">
        {value}
      </p>
      <p className="text-sm text-muted">{label}</p>
    </Card>
  );
}
