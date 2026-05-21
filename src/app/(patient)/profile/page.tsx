"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  User,
  Camera,
  LogOut,
  Bell,
  Moon,
  ShieldCheck,
  Heart,
  Save,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateProfile, logout } from "@/store/authSlice";
import { showToast } from "@/store/uiSlice";
import { roleLabel } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        on ? "bg-sky" : "bg-border"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function PatientProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "+234 803 555 0142",
  });
  const [prefs, setPrefs] = useState({
    reminders: true,
    results: true,
    promos: false,
  });

  const save = () => {
    dispatch(updateProfile({ name: form.name, email: form.email, phone: form.phone }));
    dispatch(
      showToast({ message: "Profile updated successfully", tone: "success" }),
    );
  };

  const signOut = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-extrabold">My profile</h1>

      {/* Identity */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-sky to-sky-600" />
        <div className="px-5 pb-5">
          <div className="-mt-11 flex items-end gap-3">
            <div className="relative">
              <Avatar
                src={user?.avatar}
                name={user?.name ?? "User"}
                size={88}
                className="rounded-2xl ring-4 ring-surface"
              />
              <button
                className="press absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-sky text-white ring-2 ring-surface"
                aria-label="Change photo"
                onClick={() =>
                  dispatch(
                    showToast({ message: "Photo upload coming soon", tone: "info" }),
                  )
                }
              >
                <Camera size={14} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <h2 className="font-display text-xl font-extrabold">
              {user?.name}
            </h2>
            <Badge tone="sky">{roleLabel(user?.role ?? "patient")}</Badge>
          </div>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </Card>

      {/* Personal information */}
      <Card className="space-y-4 p-4">
        <h3 className="flex items-center gap-2 font-bold">
          <User size={16} className="text-sky" /> Personal information
        </h3>
        <Input
          id="p-name"
          label="Full name"
          icon={<User size={17} />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          id="p-email"
          label="Email address"
          type="email"
          icon={<Mail size={17} />}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          id="p-phone"
          label="Phone number"
          type="tel"
          icon={<Phone size={17} />}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Button onClick={save} fullWidth>
          <Save size={16} /> Save changes
        </Button>
      </Card>

      {/* Medical info */}
      <Card className="space-y-3 p-4">
        <h3 className="flex items-center gap-2 font-bold">
          <Heart size={16} className="text-red" /> Medical information
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Blood group", value: "O+" },
            { label: "Allergies", value: "Penicillin" },
            { label: "Genotype", value: "AA" },
            { label: "Height", value: "1.68 m" },
            { label: "Weight", value: "68.4 kg" },
            { label: "Emergency contact", value: "+234 803 555 0190" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-surface-2 p-3">
              <p className="text-xs text-muted">{m.label}</p>
              <p className="text-sm font-bold">{m.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Preferences */}
      <Card className="divide-y divide-border p-0">
        <div className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
            <Moon size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Dark mode</p>
            <p className="text-xs text-muted">Switch the app theme</p>
          </div>
          <Toggle
            on={resolvedTheme === "dark"}
            onChange={(v) => setTheme(v ? "dark" : "light")}
          />
        </div>
        {[
          { key: "reminders", label: "Appointment reminders", desc: "Alerts before your visits" },
          { key: "results", label: "Test result alerts", desc: "When new results are ready" },
          { key: "promos", label: "Promotions", desc: "Offers and health tips" },
        ].map((p) => (
          <div key={p.key} className="flex items-center gap-3 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
              <Bell size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{p.label}</p>
              <p className="text-xs text-muted">{p.desc}</p>
            </div>
            <Toggle
              on={prefs[p.key as keyof typeof prefs]}
              onChange={(v) => setPrefs({ ...prefs, [p.key]: v })}
            />
          </div>
        ))}
      </Card>

      <Card className="flex items-center gap-3 p-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-online/10 text-online">
          <ShieldCheck size={18} />
        </div>
        <p className="flex-1 text-sm text-muted">
          Your data is encrypted and protected under our privacy policy.
        </p>
      </Card>

      <Button variant="outline" fullWidth onClick={signOut}>
        <LogOut size={16} /> Sign out
      </Button>
    </div>
  );
}
