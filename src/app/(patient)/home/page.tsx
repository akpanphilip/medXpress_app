"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Siren,
  Video,
  ShieldPlus,
  ArrowRight,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openEmergency } from "@/store/uiSlice";
import { doctors, specialties, appointments } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import SpecialtyChip from "@/components/SpecialtyChip";
import DoctorCard from "@/components/DoctorCard";
import { DoctorCardSkeleton } from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-display text-lg font-extrabold">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
        >
          See all <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Brief skeleton state to demonstrate the sky-blue shimmer loaders.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const firstName = user?.name.split(" ")[0] ?? "there";
  const onlineDoctors = doctors.filter((d) => d.status === "online");
  const topRated = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const nextVisit = appointments.find((a) => a.status === "upcoming");

  return (
    <div className="space-y-7">
      {/* Hero + search */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-700 p-5 text-white sm:p-7">
        <p className="text-sm font-medium text-white/70">
          {greeting()}, {firstName}
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
          How can we help you
          <br className="hidden sm:block" /> feel better today?
        </h1>
        <div className="mt-5">
          <SearchBar />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/70">
          <span>{doctors.length * 27}+ verified doctors</span>
          <span className="hidden sm:inline">|</span>
          <span>Avg. wait under 5 minutes</span>
          <span className="hidden sm:inline">|</span>
          <span>Available 24 / 7</span>
        </div>
      </section>

      {/* Next appointment reminder */}
      {nextVisit && (
        <Card className="flex items-center gap-3 p-3.5">
          <Avatar
            src={nextVisit.doctorAvatar}
            name={nextVisit.doctorName}
            size={52}
            className="rounded-xl"
          />
          <div className="min-w-0 flex-1">
            <Badge tone="sky" dot pulse>
              Upcoming visit
            </Badge>
            <p className="mt-1 truncate text-sm font-bold">
              {nextVisit.doctorName}
            </p>
            <p className="truncate text-xs text-muted">
              {nextVisit.date} at {nextVisit.time} | {nextVisit.specialty}
            </p>
          </div>
          <Button
            href={`/consultation/${nextVisit.doctorId}`}
            size="sm"
            aria-label="Join consultation"
          >
            <Video size={15} /> Join
          </Button>
        </Card>
      )}

      {/* Specialties */}
      <section>
        <SectionHeader title="Browse by specialty" href="/doctors" />
        <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {specialties.map((s) => (
            <SpecialtyChip key={s.id} specialty={s} />
          ))}
        </div>
      </section>

      {/* Emergency banner */}
      <button
        onClick={() => dispatch(openEmergency())}
        className="press relative block w-full overflow-hidden rounded-3xl bg-gradient-to-br from-red to-red-600 p-5 text-left text-white"
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 right-12 h-28 w-28 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
            <Siren size={28} />
          </div>
          <div className="flex-1">
            <p className="font-display text-lg font-extrabold">
              Need urgent care right now?
            </p>
            <p className="text-sm text-white/85">
              Connect to an emergency doctor in seconds.
            </p>
          </div>
          <ArrowRight size={22} className="shrink-0" />
        </div>
      </button>

      {/* Available now */}
      <section>
        <SectionHeader title="Available now" href="/doctors" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <DoctorCardSkeleton key={i} />
              ))
            : onlineDoctors.map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </section>

      {/* Top rated */}
      <section>
        <SectionHeader title="Top rated doctors" href="/doctors" />
        <div className="grid gap-3 sm:grid-cols-2">
          {topRated.map((d) => (
            <Link key={d.id} href={`/doctors/${d.id}`}>
              <Card interactive className="flex items-center gap-3 p-3">
                <Avatar
                  src={d.avatar}
                  name={d.name}
                  size={56}
                  className="rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{d.name}</p>
                  <p className="truncate text-xs text-sky">{d.specialty}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <ShieldPlus size={12} className="text-online" />
                    {d.experience} yrs | {d.rating.toFixed(1)} rating
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted">from</p>
                  <p className="font-display font-extrabold text-foreground">
                    {formatMoney(d.fee)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
