"use client";

import { useState } from "react";
import { CalendarDays, Clock, Video, MessageSquare, Save } from "lucide-react";
import { getDoctor, patientQueue } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function DoctorSchedulePage() {
  const dispatch = useAppDispatch();
  const doctor = getDoctor("d1");
  const [blocked, setBlocked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setBlocked((b) => ({ ...b, [key]: !b[key] }));

  const availability = doctor?.availability ?? [];
  const openCount = availability.reduce(
    (sum, d) =>
      sum + d.slots.filter((s) => !blocked[`${d.date}-${s}`]).length,
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Manage schedule
        </h1>
        <p className="text-sm text-muted">
          Tap a time slot to open or block it. Patients can only book open
          slots.
        </p>
      </div>

      {/* Today's consultations */}
      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">
          Today&apos;s consultations
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {patientQueue
            .filter((q) => q.status !== "done")
            .map((q) => (
              <Card key={q.id} className="flex items-center gap-3 p-3.5">
                <Avatar
                  src={q.avatar}
                  name={q.patient}
                  size={46}
                  className="rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{q.patient}</p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    {q.type === "video" ? (
                      <Video size={12} />
                    ) : (
                      <MessageSquare size={12} />
                    )}
                    {q.time}
                  </p>
                </div>
                {q.status === "waiting" ? (
                  <Badge tone="red" dot pulse>
                    Waiting
                  </Badge>
                ) : (
                  <Badge tone="sky">Scheduled</Badge>
                )}
              </Card>
            ))}
        </div>
      </section>

      {/* Availability editor */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold">
            Weekly availability
          </h2>
          <Badge tone="online">{openCount} open slots</Badge>
        </div>
        <div className="space-y-3">
          {availability.map((d) => (
            <Card key={d.date} className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="font-bold">{d.day}</p>
                  <p className="text-xs text-muted">{d.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {d.slots.map((s) => {
                  const key = `${d.date}-${s}`;
                  const isBlocked = blocked[key];
                  return (
                    <button
                      key={s}
                      onClick={() => toggle(key)}
                      className={`flex items-center justify-center gap-1 rounded-lg border py-2 text-xs font-bold transition ${
                        isBlocked
                          ? "border-border bg-surface-2 text-muted line-through"
                          : "border-sky/40 bg-sky/10 text-sky"
                      }`}
                    >
                      <Clock size={11} /> {s}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
        <Button
          fullWidth
          size="lg"
          className="mt-4"
          onClick={() =>
            dispatch(
              showToast({
                message: "Availability saved",
                tone: "success",
              }),
            )
          }
        >
          <Save size={17} /> Save availability
        </Button>
      </section>
    </div>
  );
}
