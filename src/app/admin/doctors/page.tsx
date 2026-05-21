"use client";

import { useState } from "react";
import {
  BadgeCheck,
  FileText,
  Check,
  X,
  ShieldCheck,
  Star,
  Inbox,
} from "lucide-react";
import { pendingDoctors, doctors } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import StatusDot from "@/components/ui/StatusDot";

export default function AdminDoctorsPage() {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<"pending" | "verified">("pending");
  const [pending, setPending] = useState(pendingDoctors);

  const resolve = (id: string, approved: boolean) => {
    const doc = pending.find((d) => d.id === id);
    setPending((list) => list.filter((d) => d.id !== id));
    dispatch(
      showToast({
        message: `${doc?.name ?? "Doctor"} ${
          approved ? "approved and verified" : "application rejected"
        }`,
        tone: approved ? "success" : "info",
      }),
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Doctor verification
        </h1>
        <p className="text-sm text-muted">
          Review applications and manage verified doctors on the platform.
        </p>
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {(
          [
            { id: "pending", label: `Pending (${pending.length})` },
            { id: "verified", label: `Verified (${doctors.length})` },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
              tab === t.id
                ? "bg-sky text-white shadow-sm shadow-sky/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <div className="space-y-3 fade-up">
          {pending.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-online/10 text-online">
                <Inbox size={26} />
              </div>
              <p className="mt-3 font-bold">All caught up</p>
              <p className="text-sm text-muted">
                There are no pending applications to review.
              </p>
            </div>
          ) : (
            pending.map((d) => (
              <Card key={d.id} className="p-4">
                <div className="flex gap-3">
                  <Avatar
                    src={d.avatar}
                    name={d.name}
                    size={56}
                    className="rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{d.name}</p>
                    <p className="text-xs text-sky">{d.specialty}</p>
                    <p className="truncate text-xs text-muted">{d.email}</p>
                  </div>
                  <Badge tone="amber">{d.submitted}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-surface-2 p-3 text-xs">
                  <div>
                    <p className="text-muted">License number</p>
                    <p className="font-bold">{d.license}</p>
                  </div>
                  <div>
                    <p className="text-muted">Documents</p>
                    <p className="flex items-center gap-1 font-bold">
                      <FileText size={12} className="text-sky" />
                      {d.documents} files uploaded
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-border pt-3">
                  <button
                    onClick={() => resolve(d.id, true)}
                    className="press flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-online py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={() => resolve(d.id, false)}
                    className="press flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red/40 py-2.5 text-sm font-bold text-red transition hover:bg-red/10"
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {tab === "verified" && (
        <div className="space-y-3 fade-up">
          {doctors.map((d) => (
            <Card key={d.id} className="flex items-center gap-3 p-3.5">
              <Avatar
                src={d.avatar}
                name={d.name}
                size={48}
                className="rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-bold">
                  {d.name}
                  <BadgeCheck size={14} className="shrink-0 text-sky" />
                </p>
                <p className="truncate text-xs text-muted">
                  {d.specialty} | {d.hospital}
                </p>
              </div>
              <div className="hidden items-center gap-1 text-xs font-bold text-amber sm:flex">
                <Star size={13} className="fill-amber" />
                {d.rating.toFixed(1)}
              </div>
              <StatusDot status={d.status} />
            </Card>
          ))}
          <div className="flex items-center gap-2 rounded-xl bg-online/10 p-3 text-xs font-semibold text-online">
            <ShieldCheck size={15} />
            All listed doctors have passed identity and license verification.
          </div>
        </div>
      )}
    </div>
  );
}
