"use client";

import { useState } from "react";
import {
  Pill,
  FileText,
  Download,
  Stethoscope,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { prescriptions, testResults } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const resultStatus = {
  normal: { tone: "online" as const, icon: CheckCircle2, label: "Normal" },
  review: { tone: "amber" as const, icon: AlertCircle, label: "Needs review" },
  pending: { tone: "neutral" as const, icon: Clock, label: "Pending" },
};

export default function PrescriptionsPage() {
  const [tab, setTab] = useState<"prescriptions" | "results">("prescriptions");
  const dispatch = useAppDispatch();

  const download = (name: string) =>
    dispatch(showToast({ message: `Downloading ${name}.pdf`, tone: "info" }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Prescriptions & results
        </h1>
        <p className="text-sm text-muted">
          Your medications and lab reports, all in one place.
        </p>
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {(
          [
            { id: "prescriptions", label: "Prescriptions", icon: Pill },
            { id: "results", label: "Test results", icon: FileText },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-bold transition ${
              tab === t.id
                ? "bg-sky text-white shadow-sm shadow-sky/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "prescriptions" && (
        <div className="space-y-3 fade-up">
          {prescriptions.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-sky/10 text-sky">
                    <Stethoscope size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{p.diagnosis}</p>
                    <p className="text-xs text-muted">
                      {p.doctorName} | {p.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => download(`prescription-${p.id}`)}
                  className="press grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-sky hover:text-sky"
                  aria-label="Download prescription"
                >
                  <Download size={16} />
                </button>
              </div>
              <div className="space-y-2 p-4">
                {p.medicines.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 rounded-xl bg-surface-2 p-3"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky/10 text-sky">
                      <Pill size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{m.name}</p>
                      <p className="text-xs text-muted">{m.dosage}</p>
                    </div>
                    <Badge tone="neutral">{m.duration}</Badge>
                  </div>
                ))}
                {p.notes && (
                  <p className="rounded-xl bg-sky/5 p-3 text-xs text-muted">
                    <span className="font-bold text-foreground">
                      Doctor&apos;s note:{" "}
                    </span>
                    {p.notes}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "results" && (
        <div className="space-y-3 fade-up">
          {testResults.map((r) => {
            const meta = resultStatus[r.status];
            const Icon = meta.icon;
            return (
              <Card key={r.id} className="flex items-center gap-3 p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red/10 text-red">
                  <FlaskConical size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{r.name}</p>
                  <p className="truncate text-xs text-muted">
                    {r.lab} | {r.date}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge tone={meta.tone}>
                      <Icon size={11} /> {meta.label}
                    </Badge>
                    <span className="text-[11px] text-muted">
                      {r.fileSize}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => download(r.name.replace(/\s+/g, "-"))}
                  disabled={r.status === "pending"}
                  className="press grid h-10 w-10 place-items-center rounded-xl border border-border text-muted transition hover:border-sky hover:text-sky disabled:opacity-40"
                  aria-label="Download result"
                >
                  <Download size={17} />
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
