"use client";

import { Siren } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { openEmergency } from "@/store/uiSlice";

/**
 * Persistent red emergency button. Always one tap from any in-app screen.
 * Sits above the mobile bottom navigation and lower-right on desktop.
 */
export default function EmergencyFab() {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(openEmergency())}
      aria-label="Open emergency care"
      className="press fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-red py-3.5 pl-3.5 pr-4 text-white shadow-lg shadow-red/40 md:bottom-7 md:right-7"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <Siren size={20} className="relative" />
      </span>
      <span className="text-sm font-extrabold uppercase tracking-wide">
        Emergency
      </span>
    </button>
  );
}
