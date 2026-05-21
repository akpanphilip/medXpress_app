"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Users,
  Wallet,
  Star,
  Video,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  patientQueue,
  earningsTrend,
  doctorStats,
  getDoctor,
} from "@/lib/data";
import type { DoctorStatus } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import { StarRow } from "@/components/ui/Rating";

const statusOptions: { id: DoctorStatus; label: string; color: string }[] = [
  { id: "online", label: "Online", color: "bg-online" },
  { id: "busy", label: "Busy", color: "bg-red" },
  { id: "offline", label: "Offline", color: "bg-muted" },
];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function DoctorDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [status, setStatus] = useState<DoctorStatus>("online");
  const profile = getDoctor("d1");

  const waiting = patientQueue.filter((q) => q.status !== "done");
  const done = patientQueue.filter((q) => q.status === "done");

  return (
    <div className="space-y-6">
      {/* Header + status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            {greeting()}, {user?.name.split(" ")[1] ?? "Doctor"}
          </h1>
          <p className="text-sm text-muted">
            You have {waiting.length} consultations remaining today.
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
          {statusOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                status === s.id
                  ? "bg-surface-2 text-foreground"
                  : "text-muted"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${s.color}`} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={CalendarCheck}
          label="Today's consults"
          value={doctorStats.todayConsults.toString()}
          delta="2 more"
          deltaUp
          tone="sky"
        />
        <StatCard
          icon={Users}
          label="Total patients"
          value={doctorStats.totalPatients.toLocaleString()}
          delta="8%"
          deltaUp
          tone="online"
        />
        <StatCard
          icon={Wallet}
          label="This month"
          value={formatMoney(doctorStats.monthEarnings)}
          delta="12%"
          deltaUp
          tone="amber"
        />
        <StatCard
          icon={Star}
          label="Avg. rating"
          value={doctorStats.rating.toFixed(1)}
          delta="0.1"
          deltaUp
          tone="red"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's queue */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-extrabold">
              Today&apos;s schedule
            </h2>
            <Link
              href="/doctor/schedule"
              className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
            >
              Full schedule <ChevronRight size={15} />
            </Link>
          </div>
          <div className="space-y-3">
            {waiting.map((q) => (
              <Card key={q.id} className="p-4">
                <div className="flex gap-3">
                  <Avatar
                    src={q.avatar}
                    name={q.patient}
                    size={52}
                    className="rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold">{q.patient}</p>
                        <p className="text-xs text-muted">
                          {q.age} yrs |{" "}
                          {q.type === "video" ? "Video call" : "Chat"}
                        </p>
                      </div>
                      {q.status === "waiting" ? (
                        <Badge tone="red" dot pulse>
                          Waiting
                        </Badge>
                      ) : (
                        <Badge tone="sky">{q.time}</Badge>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-1 text-sm text-muted">
                      {q.reason}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-border pt-3">
                  <Button href="/consultation/d1" size="sm">
                    {q.type === "video" ? (
                      <Video size={15} />
                    ) : (
                      <MessageSquare size={15} />
                    )}
                    Start consultation
                  </Button>
                  <Button
                    href="/doctor/patients"
                    variant="outline"
                    size="sm"
                  >
                    Patient history
                  </Button>
                </div>
              </Card>
            ))}

            {done.map((q) => (
              <Card
                key={q.id}
                className="flex items-center gap-3 p-3.5 opacity-70"
              >
                <Avatar
                  src={q.avatar}
                  name={q.patient}
                  size={42}
                  className="rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{q.patient}</p>
                  <p className="text-xs text-muted">{q.time}</p>
                </div>
                <Badge tone="online">
                  <CheckCircle2 size={11} /> Completed
                </Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* Side column */}
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="font-display text-lg font-extrabold">
              Earnings this week
            </h2>
            <p className="text-sm text-muted">
              {formatMoney(earningsTrend.reduce((s, d) => s + d.value, 0))}{" "}
              total
            </p>
            <div className="mt-4">
              <BarChart data={earningsTrend} tone="sky" unit="N" height={150} />
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="font-display text-lg font-extrabold">
              Recent reviews
            </h2>
            <div className="mt-3 space-y-3">
              {profile?.reviews.slice(0, 2).map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl bg-surface-2 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{r.patient}</p>
                    <StarRow value={r.rating} size={12} />
                  </div>
                  <p className="mt-1 text-xs text-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
