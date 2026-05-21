"use client";

import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CalendarDays,
  Pill,
  FileText,
  Video,
  ChevronRight,
  Droplet,
  Ruler,
  Weight,
  HeartPulse,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { healthMetrics, appointments, prescriptions, testResults } from "@/lib/data";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DynamicIcon from "@/components/ui/DynamicIcon";

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const statusColor = {
  good: "text-online",
  watch: "text-amber",
  alert: "text-red",
};

const bodyInfo = [
  { icon: Droplet, label: "Blood group", value: "O+" },
  { icon: Ruler, label: "Height", value: "1.68 m" },
  { icon: Weight, label: "Weight", value: "68.4 kg" },
  { icon: HeartPulse, label: "Allergies", value: "Penicillin" },
];

export default function PatientDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const nextVisit = upcoming[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Health overview
        </h1>
        <p className="text-sm text-muted">
          A snapshot of your wellbeing, {user?.name.split(" ")[0]}.
        </p>
      </div>

      {/* Health metrics */}
      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">
          Health metrics
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {healthMetrics.map((m) => {
            const Trend = trendIcon[m.trend];
            return (
              <Card key={m.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
                    <DynamicIcon name={m.icon} size={19} />
                  </div>
                  <Trend size={16} className={statusColor[m.status]} />
                </div>
                <p className="mt-3 font-display text-xl font-extrabold">
                  {m.value}
                  <span className="ml-1 text-xs font-semibold text-muted">
                    {m.unit}
                  </span>
                </p>
                <p className="text-xs text-muted">{m.label}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Next appointment */}
      {nextVisit && (
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 bg-gradient-to-br from-sky to-sky-600 p-4 text-white">
            <Avatar
              src={nextVisit.doctorAvatar}
              name={nextVisit.doctorName}
              size={54}
              className="rounded-xl ring-2 ring-white/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                Next consultation
              </p>
              <p className="truncate font-bold">{nextVisit.doctorName}</p>
              <p className="truncate text-sm text-white/85">
                {nextVisit.date} at {nextVisit.time}
              </p>
            </div>
            <Link
              href={`/consultation/${nextVisit.doctorId}`}
              className="press flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-sky"
            >
              <Video size={16} /> Join
            </Link>
          </div>
        </Card>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: "/appointments", label: "Appointments", icon: CalendarDays, count: upcoming.length },
          { href: "/prescriptions", label: "Prescriptions", icon: Pill, count: prescriptions.length },
          { href: "/prescriptions", label: "Test results", icon: FileText, count: testResults.length },
        ].map((q) => (
          <Link key={q.label} href={q.href}>
            <Card interactive className="p-4 text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-sky/10 text-sky">
                <q.icon size={20} />
              </div>
              <p className="mt-2 font-display text-lg font-extrabold">
                {q.count}
              </p>
              <p className="text-xs font-semibold text-muted">{q.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Body profile */}
      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">
          Medical profile
        </h2>
        <Card className="grid grid-cols-2 gap-px overflow-hidden bg-border lg:grid-cols-4">
          {bodyInfo.map((b) => (
            <div key={b.label} className="bg-surface p-4">
              <b.icon size={18} className="text-sky" />
              <p className="mt-2 font-bold">{b.value}</p>
              <p className="text-xs text-muted">{b.label}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Recent prescriptions */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold">
            Recent prescriptions
          </h2>
          <Link
            href="/prescriptions"
            className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
          >
            See all <ChevronRight size={15} />
          </Link>
        </div>
        <div className="space-y-3">
          {prescriptions.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{p.diagnosis}</p>
                  <p className="text-xs text-muted">
                    {p.doctorName} | {p.date}
                  </p>
                </div>
                <Badge tone="sky">{p.medicines.length} meds</Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.medicines.map((m) => (
                  <span
                    key={m.name}
                    className="rounded-md bg-surface-2 px-2 py-1 text-xs font-semibold text-muted"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:text-left">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red/10 text-red">
          <HeartPulse size={24} />
        </div>
        <div className="flex-1">
          <p className="font-bold">Feeling unwell?</p>
          <p className="text-sm text-muted">
            Book a consultation with a verified doctor in minutes.
          </p>
        </div>
        <Button href="/doctors">Find a doctor</Button>
      </Card>
    </div>
  );
}
