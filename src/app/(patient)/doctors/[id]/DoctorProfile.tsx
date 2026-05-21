"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Star,
  Users,
  Award,
  Languages,
  Siren,
  CalendarDays,
  Clock,
  Building2,
} from "lucide-react";
import type { Doctor } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import StatusDot from "@/components/ui/StatusDot";
import { StarRow } from "@/components/ui/Rating";

type Tab = "about" | "reviews" | "schedule";

export default function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("about");
  const [activeDay, setActiveDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);

  const day = doctor.availability[activeDay];

  const stats = [
    { icon: Star, label: "Rating", value: doctor.rating.toFixed(1) },
    {
      icon: Users,
      label: "Patients",
      value: doctor.patients.toLocaleString(),
    },
    { icon: Award, label: "Experience", value: `${doctor.experience} yrs` },
    {
      icon: Star,
      label: "Reviews",
      value: doctor.reviewCount.toString(),
    },
  ];

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.back()}
        className="press flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-sky"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header card */}
      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-br from-sky to-sky-600 sm:h-32" />
        <div className="px-5 pb-5">
          <div className="-mt-12 flex items-end gap-4">
            <div className="relative">
              <Avatar
                src={doctor.avatar}
                name={doctor.name}
                size={92}
                className="rounded-2xl ring-4 ring-surface"
              />
              <StatusDot
                status={doctor.status}
                className="absolute -bottom-1 -right-1"
              />
            </div>
            <div className="hidden flex-1 sm:block" />
          </div>

          <div className="mt-3">
            <h1 className="flex items-center gap-1.5 font-display text-xl font-extrabold">
              {doctor.name}
              {doctor.verified && (
                <BadgeCheck size={18} className="text-sky" />
              )}
            </h1>
            <p className="font-semibold text-sky">{doctor.specialty}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Building2 size={14} /> {doctor.hospital}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {doctor.location}
              </span>
              <StatusDot status={doctor.status} withLabel />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-3.5 text-center">
            <s.icon size={18} className="mx-auto text-sky" />
            <p className="mt-1.5 font-display text-lg font-extrabold">
              {s.value}
            </p>
            <p className="text-xs text-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Booking CTA */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Consultation fee
            </p>
            <p className="font-display text-2xl font-extrabold">
              {formatMoney(doctor.fee)}
            </p>
          </div>
          <span className="rounded-lg bg-sky/10 px-3 py-1.5 text-xs font-bold text-sky">
            Next: {doctor.nextAvailable}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button href={`/booking/${doctor.id}`} size="lg">
            <CalendarDays size={18} /> Book Consultation
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={() =>
              router.push(`/consultation/${doctor.id}?type=emergency`)
            }
          >
            <Siren size={18} /> Emergency Consult
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {(
          [
            { id: "about", label: "About" },
            { id: "reviews", label: "Reviews" },
            { id: "schedule", label: "Schedule" },
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

      {/* Tab content */}
      {tab === "about" && (
        <div className="space-y-4 fade-up">
          <Card className="p-4">
            <h3 className="font-bold">About</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {doctor.about}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="flex items-center gap-2 font-bold">
              <Award size={16} className="text-sky" /> Credentials
            </h3>
            <ul className="mt-2 space-y-2">
              {doctor.credentials.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <BadgeCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-online"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <h3 className="flex items-center gap-2 font-bold">
              <Languages size={16} className="text-sky" /> Languages spoken
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {doctor.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {l}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-3 fade-up">
          <Card className="flex items-center gap-4 p-4">
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-sky">
                {doctor.rating.toFixed(1)}
              </p>
              <StarRow value={doctor.rating} />
            </div>
            <div className="flex-1 border-l border-border pl-4">
              <p className="text-sm font-bold">
                {doctor.reviewCount} verified reviews
              </p>
              <p className="text-xs text-muted">
                From patients who completed a consultation with{" "}
                {doctor.name.split(" ")[1]}.
              </p>
            </div>
          </Card>
          {doctor.reviews.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar src={r.avatar} name={r.patient} size={40} />
                <div className="flex-1">
                  <p className="text-sm font-bold">{r.patient}</p>
                  <p className="text-xs text-muted">{r.date}</p>
                </div>
                <StarRow value={r.rating} size={13} />
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {r.comment}
              </p>
            </Card>
          ))}
        </div>
      )}

      {tab === "schedule" && (
        <Card className="space-y-4 p-4 fade-up">
          <h3 className="flex items-center gap-2 font-bold">
            <CalendarDays size={16} className="text-sky" /> Real-time
            availability
          </h3>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {doctor.availability.map((d, i) => (
              <button
                key={d.date}
                onClick={() => {
                  setActiveDay(i);
                  setSlot(null);
                }}
                className={`flex shrink-0 flex-col items-center rounded-xl border-2 px-4 py-2.5 transition ${
                  activeDay === i
                    ? "border-sky bg-sky/10"
                    : "border-border bg-surface hover:border-sky/40"
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    activeDay === i ? "text-sky" : "text-muted"
                  }`}
                >
                  {d.day}
                </span>
                <span className="text-sm font-extrabold">
                  {d.date.split(" ")[1]}
                </span>
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
              <Clock size={13} /> {day.slots.length} slots on {day.day},{" "}
              {day.date}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {day.slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-lg border py-2 text-sm font-bold transition ${
                    slot === s
                      ? "border-sky bg-sky text-white"
                      : "border-border bg-surface text-foreground hover:border-sky"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            href={
              slot
                ? `/booking/${doctor.id}?day=${activeDay}&slot=${slot}`
                : `/booking/${doctor.id}`
            }
            fullWidth
            size="lg"
          >
            {slot ? `Book ${day.day} at ${slot}` : "Choose a time to book"}
          </Button>
        </Card>
      )}
    </div>
  );
}
