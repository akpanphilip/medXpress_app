"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Video, Siren, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface Slide {
  icon: LucideIcon;
  tone: string;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    icon: Search,
    tone: "from-sky to-sky-600",
    title: "Find trusted doctors fast",
    body: "Browse verified specialists like a marketplace. See ratings, the consultation fee and availability before you tap.",
  },
  {
    icon: Video,
    tone: "from-[#7a8cff] to-[#4f63d8]",
    title: "Consult by video or chat",
    body: "Talk to a doctor from anywhere, share your symptoms and receive a digital prescription right away.",
  },
  {
    icon: Siren,
    tone: "from-red to-red-600",
    title: "Emergency help, one tap away",
    body: "A red emergency button is always within reach, so urgent care is never more than a single tap.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;
  const Icon = slide.icon;

  const next = () => {
    if (last) router.push("/login");
    else setIndex((i) => i + 1);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background px-6 py-8">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <button
          onClick={() => router.push("/login")}
          className="text-sm font-bold text-muted transition hover:text-sky"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div
          key={index}
          className="fade-up flex flex-col items-center"
        >
          <div
            className={`grid h-32 w-32 place-items-center rounded-[2rem] bg-gradient-to-br ${slide.tone} shadow-xl shadow-navy/15`}
          >
            <Icon size={56} strokeWidth={2.2} className="text-white" />
          </div>
          <h1 className="mt-8 max-w-sm font-display text-2xl font-extrabold">
            {slide.title}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {slide.body}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-sky" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        <div className="mx-auto max-w-sm">
          <button
            onClick={next}
            className="press flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-sky text-base font-extrabold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-600"
          >
            {last ? "Get started" : "Next"}
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </main>
  );
}
