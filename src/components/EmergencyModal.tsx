"use client";

import { useRouter } from "next/navigation";
import { Phone, Video, X, Siren, ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeEmergency } from "@/store/uiSlice";
import { doctors } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";

export default function EmergencyModal() {
  const open = useAppSelector((s) => s.ui.emergencyOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!open) return null;

  const onlineDoctors = doctors.filter((d) => d.status === "online").slice(0, 3);
  const close = () => dispatch(closeEmergency());

  const startConsult = (id: string) => {
    close();
    router.push(`/consultation/${id}?type=emergency`);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close emergency panel"
        onClick={close}
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md fade-up rounded-t-3xl border border-border bg-surface sm:rounded-3xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-red to-red-600 p-5 text-white">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Siren size={26} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Emergency Care</h2>
              <p className="text-sm text-white/85">
                Get urgent help in seconds. Choose an option below.
              </p>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5">
          <a
            href="tel:112"
            onClick={close}
            className="press flex items-center gap-3 rounded-2xl bg-red p-4 text-white shadow-sm shadow-red/30"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Call the emergency line</p>
              <p className="text-sm text-white/85">
                Dial 112 for an ambulance immediately
              </p>
            </div>
            <ChevronRight size={20} />
          </a>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Connect to a doctor now
            </p>
            <div className="space-y-2">
              {onlineDoctors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => startConsult(d.id)}
                  className="press flex w-full items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3 text-left transition hover:border-red/40"
                >
                  <div className="relative">
                    <Avatar src={d.avatar} name={d.name} size={44} />
                    <StatusDot
                      status={d.status}
                      className="absolute -bottom-0.5 -right-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{d.name}</p>
                    <p className="text-xs text-muted">{d.specialty}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-lg bg-red/10 px-2.5 py-1.5 text-xs font-bold text-red">
                    <Video size={14} /> Consult
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted">
            If this is a life-threatening emergency, call your local emergency
            number right away.
          </p>
        </div>
      </div>
    </div>
  );
}
