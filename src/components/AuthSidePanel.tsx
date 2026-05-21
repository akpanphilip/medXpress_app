import { ShieldCheck, Star, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";

/** Decorative brand panel shown beside auth forms on large screens. */
export default function AuthSidePanel() {
  return (
    <div className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-red/15 blur-3xl" />

      <div className="relative">
        <Logo size="md" light />
      </div>

      <div className="relative space-y-6">
        <h2 className="font-display text-4xl font-extrabold leading-tight">
          Healthcare that
          <br />
          moves at your speed.
        </h2>
        <p className="max-w-sm text-white/70">
          Join thousands of patients consulting verified doctors by video and
          chat, with prescriptions and emergency care built in.
        </p>

        <div className="space-y-3">
          {[
            { icon: ShieldCheck, text: "Every doctor is verified before going live" },
            { icon: Star, text: "Rated 4.9 by patients across Africa" },
            { icon: Users, text: "12,000+ consultations completed this month" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                <item.icon size={18} className="text-sky" />
              </div>
              <p className="text-sm font-medium text-white/85">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex -space-x-2">
          {[44, 12, 32, 45].map((n) => (
            <img
              key={n}
              src={`https://i.pravatar.cc/80?img=${n}`}
              alt=""
              className="h-9 w-9 rounded-full border-2 border-navy object-cover"
            />
          ))}
        </div>
        <p className="text-sm font-medium text-white/80">
          Trusted by patients and doctors every day.
        </p>
      </div>
    </div>
  );
}
