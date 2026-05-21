import { cn } from "@/lib/utils";

type Tone = "sky" | "red" | "online" | "amber" | "neutral" | "navy";

const tones: Record<Tone, string> = {
  sky: "bg-sky/12 text-sky",
  red: "bg-red/12 text-red",
  online: "bg-online/15 text-online",
  amber: "bg-amber/15 text-[#b27a14] dark:text-amber",
  neutral: "bg-surface-2 text-muted",
  navy: "bg-navy/10 text-navy dark:bg-white/10 dark:text-foreground",
};

const dots: Record<Tone, string> = {
  sky: "bg-sky",
  red: "bg-red",
  online: "bg-online",
  amber: "bg-amber",
  neutral: "bg-muted",
  navy: "bg-navy dark:bg-foreground",
};

interface BadgeProps {
  tone?: Tone;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Badge({
  tone = "neutral",
  dot,
  pulse,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dots[tone],
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dots[tone],
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
