"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  FileText,
  PhoneOff,
  Send,
  X,
  Maximize2,
  Signal,
  Siren,
} from "lucide-react";
import type { Doctor, ChatMessage } from "@/lib/types";
import { chatThread } from "@/lib/data";
import { homeFor } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Avatar from "@/components/ui/Avatar";

export default function ConsultationRoom({ doctor }: { doctor: Doctor }) {
  return (
    <Suspense fallback={<div className="h-screen bg-navy" />}>
      <Room doctor={doctor} />
    </Suspense>
  );
}

function format(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const RX_TEMPLATE = `Diagnosis:
-

Medication:
1.
2.

Advice:
-

Follow-up: `;

function Room({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const isEmergency = params.get("type") === "emergency";

  const [state, setState] = useState<"connecting" | "connected">("connecting");
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [panelTab, setPanelTab] = useState<"chat" | "prescription">("chat");
  const [sheetOpen, setSheetOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(chatThread);
  const [draft, setDraft] = useState("");
  const [rx, setRx] = useState(RX_TEMPLATE);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Simulate connecting, then start the call timer.
  useEffect(() => {
    const t = setTimeout(() => setState("connected"), 1800);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (state !== "connected") return;
    const i = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(i);
  }, [state]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m${m.length}`,
        sender: "patient",
        text: draft.trim(),
        time: "Now",
      },
    ]);
    setDraft("");
  };

  const endCall = () => {
    dispatch(
      showToast({ message: "Consultation ended", tone: "info" }),
    );
    router.push(user ? homeFor(user.role) : "/home");
  };

  const openSheet = (tab: "chat" | "prescription") => {
    setPanelTab(tab);
    setSheetOpen(true);
  };

  const Panel = (
    <div className="flex h-full flex-col">
      {/* Panel tabs */}
      <div className="flex gap-1 border-b border-white/10 p-2">
        {(
          [
            { id: "chat", label: "Chat", icon: MessageSquare },
            { id: "prescription", label: "Prescription", icon: FileText },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setPanelTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
              panelTab === t.id
                ? "bg-sky text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
        <button
          onClick={() => setSheetOpen(false)}
          className="grid h-9 w-9 place-items-center rounded-lg text-white/55 transition hover:text-white lg:hidden"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </div>

      {panelTab === "chat" ? (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "patient" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.sender === "patient"
                      ? "rounded-br-sm bg-sky text-white"
                      : "rounded-bl-sm bg-white/10 text-white"
                  }`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`mt-0.5 text-[10px] ${
                      m.sender === "patient"
                        ? "text-white/70"
                        : "text-white/45"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message"
              className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky"
            />
            <button
              onClick={send}
              aria-label="Send message"
              className="press grid h-11 w-11 place-items-center rounded-xl bg-sky text-white"
            >
              <Send size={17} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col gap-3 p-3">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70">
            <FileText size={14} className="text-sky" />
            Prescription notepad for {doctor.name}
          </div>
          <textarea
            value={rx}
            onChange={(e) => setRx(e.target.value)}
            className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-white outline-none focus:border-sky"
          />
          <button
            onClick={() =>
              dispatch(
                showToast({
                  message: "Prescription sent to the patient",
                  tone: "success",
                }),
              )
            }
            className="press h-11 rounded-xl bg-sky text-sm font-bold text-white"
          >
            Send prescription to patient
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-navy text-white">
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <Avatar
          src={doctor.avatar}
          name={doctor.name}
          size={40}
          className="rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{doctor.name}</p>
          <p className="truncate text-xs text-white/55">{doctor.specialty}</p>
        </div>
        {isEmergency && (
          <span className="flex items-center gap-1 rounded-full bg-red px-2.5 py-1 text-[11px] font-extrabold uppercase">
            <Siren size={12} /> Emergency
          </span>
        )}
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold">
          <Signal size={13} className="text-online" />
          {state === "connecting" ? "Connecting" : format(elapsed)}
        </span>
      </header>

      {/* Stage */}
      <div className="flex flex-1 overflow-hidden">
        <main className="relative flex-1 bg-gradient-to-br from-navy via-navy-700 to-navy">
          {/* Doctor video tile */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              {state === "connecting" && (
                <span className="pulse-ring absolute inset-0 rounded-[2rem] bg-sky" />
              )}
              <Avatar
                src={doctor.avatar}
                name={doctor.name}
                size={132}
                className="relative rounded-[2rem]"
              />
            </div>
            <p className="mt-4 font-display text-lg font-extrabold">
              {doctor.name}
            </p>
            <p className="text-sm text-white/55">
              {state === "connecting"
                ? "Connecting you securely..."
                : "Consultation in progress"}
            </p>
          </div>

          {/* Patient picture-in-picture overlay */}
          <div className="absolute bottom-4 right-4 w-28 overflow-hidden rounded-2xl border border-white/15 bg-navy-700 shadow-xl sm:w-36">
            <div className="flex aspect-[3/4] flex-col items-center justify-center gap-1.5">
              {cameraOff ? (
                <>
                  <VideoOff size={22} className="text-white/40" />
                  <span className="text-[10px] text-white/40">Camera off</span>
                </>
              ) : (
                <Avatar
                  src={user?.avatar}
                  name={user?.name ?? "You"}
                  size={48}
                  className="rounded-xl"
                />
              )}
              <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-bold">
                You {muted && <MicOff size={9} className="inline" />}
              </span>
            </div>
          </div>

          <button
            onClick={() => openSheet("chat")}
            className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            aria-label="Open chat"
          >
            <Maximize2 size={17} />
          </button>
        </main>

        {/* Desktop side panel */}
        <aside className="hidden w-[340px] shrink-0 border-l border-white/10 bg-navy-700 lg:flex">
          {Panel}
        </aside>
      </div>

      {/* Controls */}
      <footer className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-md items-center justify-center gap-2.5 sm:gap-3">
          <Control
            on={!muted}
            onClick={() => setMuted((v) => !v)}
            label="Mute"
            icon={muted ? <MicOff size={20} /> : <Mic size={20} />}
          />
          <Control
            on={!cameraOff}
            onClick={() => setCameraOff((v) => !v)}
            label="Camera"
            icon={cameraOff ? <VideoOff size={20} /> : <Video size={20} />}
          />
          <Control
            on
            onClick={() => openSheet("chat")}
            label="Chat"
            icon={<MessageSquare size={20} />}
            className="lg:hidden"
          />
          <Control
            on
            onClick={() => openSheet("prescription")}
            label="Rx"
            icon={<FileText size={20} />}
            className="lg:hidden"
          />
          <button
            onClick={endCall}
            className="press flex h-14 items-center gap-2 rounded-2xl bg-red px-6 font-extrabold text-white shadow-lg shadow-red/30 transition hover:bg-red-600"
          >
            <PhoneOff size={20} /> End
          </button>
        </div>
      </footer>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <button
            aria-label="Close"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative h-[72vh] rounded-t-3xl border-t border-white/10 bg-navy-700 fade-up">
            {Panel}
          </div>
        </div>
      )}
    </div>
  );
}

function Control({
  on,
  onClick,
  label,
  icon,
  className,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`press grid h-14 w-14 place-items-center rounded-2xl border transition ${
        on
          ? "border-white/10 bg-white/10 text-white hover:bg-white/20"
          : "border-red/40 bg-red/20 text-red"
      } ${className ?? ""}`}
    >
      {icon}
    </button>
  );
}
