"use client";

import { useState } from "react";
import {
  Video,
  MessageSquare,
  Siren,
  CalendarDays,
  Clock,
  RotateCcw,
} from "lucide-react";
import type { Appointment, AppointmentStatus } from "@/lib/types";
import { appointments } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const typeMeta = {
  video: { icon: Video, label: "Video call" },
  chat: { icon: MessageSquare, label: "Chat" },
  emergency: { icon: Siren, label: "Emergency" },
};

const tabs: { id: AppointmentStatus; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function AppointmentsPage() {
  const [tab, setTab] = useState<AppointmentStatus>("upcoming");
  const dispatch = useAppDispatch();
  const list = appointments.filter((a) => a.status === tab);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          My appointments
        </h1>
        <p className="text-sm text-muted">
          Track upcoming visits and your consultation history.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {tabs.map((t) => {
          const count = appointments.filter((a) => a.status === t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-bold transition ${
                tab === t.id
                  ? "bg-sky text-white shadow-sm shadow-sky/30"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.label}
              <span
                className={`rounded-md px-1.5 text-xs ${
                  tab === t.id ? "bg-white/20" : "bg-surface-2"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-muted">
            <CalendarDays size={26} />
          </div>
          <p className="mt-3 font-bold">No {tab} appointments</p>
          <p className="text-sm text-muted">
            Your {tab} consultations will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              onCancel={() =>
                dispatch(
                  showToast({
                    message: "Appointment cancelled",
                    tone: "info",
                  }),
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({
  appointment: a,
  onCancel,
}: {
  appointment: Appointment;
  onCancel: () => void;
}) {
  const meta = typeMeta[a.type];
  const Icon = meta.icon;

  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Avatar
          src={a.doctorAvatar}
          name={a.doctorName}
          size={56}
          className="rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold">{a.doctorName}</p>
              <p className="text-xs text-sky">{a.specialty}</p>
            </div>
            <Badge
              tone={
                a.status === "upcoming"
                  ? "sky"
                  : a.status === "completed"
                    ? "online"
                    : "red"
              }
            >
              {a.status}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <CalendarDays size={13} /> {a.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {a.time}
            </span>
            <span className="flex items-center gap-1">
              <Icon size={13} /> {meta.label}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
        {a.status === "upcoming" && (
          <>
            <Button href={`/consultation/${a.doctorId}`} size="sm">
              <Video size={15} /> Join now
            </Button>
            <Button
              href={`/booking/${a.doctorId}`}
              variant="outline"
              size="sm"
            >
              <RotateCcw size={15} /> Reschedule
            </Button>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </>
        )}
        {a.status === "completed" && (
          <>
            <Button href="/prescriptions" variant="outline" size="sm">
              View prescription
            </Button>
            <Button href={`/booking/${a.doctorId}`} size="sm">
              Book again
            </Button>
          </>
        )}
        {a.status === "cancelled" && (
          <Button href={`/booking/${a.doctorId}`} size="sm">
            Book again
          </Button>
        )}
      </div>
    </Card>
  );
}
