"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Siren,
  ArrowRight,
  ShieldCheck,
  Video,
  Clock,
  Activity,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openEmergency } from "@/store/uiSlice";
import { homeFor } from "@/lib/utils";

export default function SplashPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, hydrated } = useAppSelector((s) => s.auth);
  const [ready, setReady] = useState(false);

  // Send already-signed-in users straight to their dashboard.
  useEffect(() => {
    if (hydrated && user) router.replace(homeFor(user.role));
  }, [hydrated, user, router]);

  // Reveal the call-to-action buttons after the intro animation.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-24 h-72 w-72 rounded-full bg-red/15 blur-3xl" />

      {/* Centerpiece */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-sky to-sky-600 shadow-2xl shadow-sky/40">
          <span className="pulse-ring absolute inset-0 rounded-3xl bg-sky" />
          <Activity size={46} strokeWidth={2.8} className="relative text-white" />
        </div>

        <h1 className="mt-7 font-display text-5xl font-extrabold tracking-tight">
          MED<span className="text-sky">XPRESS</span>
        </h1>
        <p className="mt-3 max-w-xs text-sm text-white/70">
          Trusted doctors, video consultations and prescriptions. Care that
          moves as fast as you do.
        </p>

        <div className="mt-8 grid w-full max-w-sm grid-cols-3 gap-3">
          {[
            { icon: ShieldCheck, label: "Verified doctors" },
            { icon: Video, label: "Video consults" },
            { icon: Clock, label: "Fast 1.5s loads" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <f.icon size={20} className="mx-auto text-sky" />
              <p className="mt-1.5 text-[11px] font-semibold text-white/75">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div
        className={`px-6 pb-10 transition-all duration-500 ${
          ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-sm space-y-3">
          <button
            onClick={() => router.push("/onboarding")}
            className="press flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-sky text-base font-extrabold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-600"
          >
            Get started <ArrowRight size={19} />
          </button>
          <button
            onClick={() => router.push("/login")}
            className="press h-12 w-full rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            I already have an account
          </button>
          <button
            onClick={() => dispatch(openEmergency())}
            className="press flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red/30 transition hover:bg-red-600"
          >
            <Siren size={18} /> Emergency care
          </button>
        </div>
      </div>
    </main>
  );
}
