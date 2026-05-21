"use client";

import { useState } from "react";
import { Search, Video, FileText, Users } from "lucide-react";
import { doctorPatients } from "@/lib/data";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function DoctorPatientsPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = doctorPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">My patients</h1>
        <p className="text-sm text-muted">
          {doctorPatients.length} patients under your care.
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients by name or condition"
          className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/15"
        />
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-muted">
            <Users size={26} />
          </div>
          <p className="mt-3 font-bold">No patients found</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex gap-3">
                <Avatar
                  src={p.avatar}
                  name={p.name}
                  size={56}
                  className="rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.age} yrs | {p.gender}
                  </p>
                  <Badge tone="sky" className="mt-1.5">
                    {p.visits} visits
                  </Badge>
                </div>
              </div>
              <div className="mt-3 space-y-1 rounded-xl bg-surface-2 p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Condition</span>
                  <span className="font-bold">{p.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Last visit</span>
                  <span className="font-bold">{p.lastVisit}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button href="/consultation/d1" size="sm">
                  <Video size={15} /> Consult
                </Button>
                <Button href="/doctor/patients" variant="outline" size="sm">
                  <FileText size={15} /> Records
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
