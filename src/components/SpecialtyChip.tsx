import Link from "next/link";
import type { Specialty } from "@/lib/types";
import DynamicIcon from "@/components/ui/DynamicIcon";

export default function SpecialtyChip({ specialty }: { specialty: Specialty }) {
  return (
    <Link
      href={`/doctors?specialty=${specialty.id}`}
      className="press flex w-[88px] shrink-0 flex-col items-center gap-2"
    >
      <div className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-surface text-sky transition hover:border-sky hover:bg-sky/5">
        <DynamicIcon name={specialty.icon} size={26} strokeWidth={2.2} />
      </div>
      <div className="text-center">
        <p className="text-xs font-bold leading-tight text-foreground">
          {specialty.name}
        </p>
        <p className="text-[10px] text-muted">{specialty.count} doctors</p>
      </div>
    </Link>
  );
}
