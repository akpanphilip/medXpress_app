import { cn } from "@/lib/utils";
import type { DoctorStatus } from "@/lib/types";

const config: Record<DoctorStatus, { color: string; label: string }> = {
  online: { color: "bg-online", label: "Available now" },
  busy: { color: "bg-red", label: "In a consultation" },
  offline: { color: "bg-muted", label: "Offline" },
};

export default function StatusDot({
  status,
  withLabel,
  className,
}: {
  status: DoctorStatus;
  withLabel?: boolean;
  className?: string;
}) {
  const { color, label } = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {status === "online" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-70",
              color,
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-surface",
            color,
          )}
        />
      </span>
      {withLabel && (
        <span className="text-xs font-semibold text-muted">{label}</span>
      )}
    </span>
  );
}
