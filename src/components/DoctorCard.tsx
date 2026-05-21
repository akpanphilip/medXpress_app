import Link from "next/link";
import { MapPin, BadgeCheck, Video } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import StatusDot from "@/components/ui/StatusDot";
import Button from "@/components/ui/Button";

const statusBadge = {
  online: { tone: "online" as const, label: "Available now" },
  busy: { tone: "red" as const, label: "Busy" },
  offline: { tone: "neutral" as const, label: "Offline" },
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const status = statusBadge[doctor.status];

  return (
    <Card className="overflow-hidden">
      <Link href={`/doctors/${doctor.id}`} className="block p-4">
        <div className="flex gap-3.5">
          <div className="relative shrink-0">
            <Avatar
              src={doctor.avatar}
              name={doctor.name}
              size={68}
              className="rounded-2xl"
            />
            <StatusDot
              status={doctor.status}
              className="absolute -bottom-1 -right-1"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="flex items-center gap-1 truncate font-bold text-foreground">
                {doctor.name}
                {doctor.verified && (
                  <BadgeCheck size={15} className="shrink-0 text-sky" />
                )}
              </h3>
            </div>
            <p className="text-sm font-semibold text-sky">{doctor.specialty}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
              <MapPin size={12} className="shrink-0" />
              {doctor.hospital}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Rating value={doctor.rating} count={doctor.reviewCount} size={13} />
              <span className="text-xs text-muted">
                {doctor.experience} yrs exp
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Badge tone={status.tone} dot pulse={doctor.status === "online"}>
            {status.label}
          </Badge>
          <span className="text-xs text-muted">Next: {doctor.nextAvailable}</span>
        </div>
      </Link>

      {/* Footer: price + actions visible without any extra tap */}
      <div className="flex items-center justify-between gap-2 border-t border-border bg-surface-2/50 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Consultation
          </p>
          <p className="font-display text-lg font-extrabold text-foreground">
            {formatMoney(doctor.fee)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            href={`/doctors/${doctor.id}`}
            variant="outline"
            size="sm"
            aria-label="View profile"
          >
            <Video size={15} /> Profile
          </Button>
          <Button href={`/booking/${doctor.id}`} variant="primary" size="sm">
            Book now
          </Button>
        </div>
      </div>
    </Card>
  );
}
