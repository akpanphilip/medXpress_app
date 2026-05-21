"use client";

import { useEffect } from "react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearToast } from "@/store/uiSlice";

const icons = {
  success: <CheckCircle2 size={18} className="text-online" />,
  info: <Info size={18} className="text-sky" />,
  error: <AlertCircle size={18} className="text-red" />,
};

export default function Toaster() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), 2800);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className="fixed left-1/2 top-5 z-[120] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 fade-up">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-xl shadow-navy/10">
        {icons[toast.tone]}
        <p className="text-sm font-semibold text-foreground">{toast.message}</p>
      </div>
    </div>
  );
}
