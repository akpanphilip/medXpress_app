import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

/** Compact "star + score" rating used on doctor cards. */
export default function Rating({
  value,
  count,
  size = 14,
  className,
}: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Star size={size} className="fill-amber text-amber" />
      <span className="font-bold text-foreground">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted">({count})</span>
      )}
    </span>
  );
}

/** Five-star row used on the doctor profile reviews section. */
export function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(value)
              ? "fill-amber text-amber"
              : "fill-border text-border"
          }
        />
      ))}
    </span>
  );
}
