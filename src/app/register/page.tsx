"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { showToast } from "@/store/uiSlice";
import { homeFor } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AuthSidePanel from "@/components/AuthSidePanel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<Exclude<Role, "admin">>("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));
  const blur = (key: string) => () =>
    setTouched((t) => ({ ...t, [key]: true }));
  const show = (key: string) => submitted || touched[key];

  const errors = {
    name:
      form.name.trim().length < 3
        ? "Enter your full name (at least 3 characters)"
        : "",
    email: !EMAIL_RE.test(form.email) ? "Enter a valid email address" : "",
    phone:
      form.phone.replace(/\D/g, "").length < 7
        ? "Enter a valid phone number"
        : "",
    password:
      form.password.length < 6
        ? "Password must be at least 6 characters"
        : "",
    confirm:
      form.confirm !== form.password ? "Passwords do not match" : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    if (!agree) {
      dispatch(
        showToast({ message: "Please accept the terms to continue", tone: "error" }),
      );
      return;
    }
    dispatch(
      login({
        id: "new-user",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role,
      }),
    );
    dispatch(
      showToast({
        message:
          role === "doctor"
            ? "Account created. Verification is pending review."
            : "Account created. Welcome to MEDXPRESS!",
        tone: "success",
      }),
    );
    router.push(homeFor(role));
  };

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <AuthSidePanel />

      <div className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <div className="mx-auto w-full max-w-md">
            <h1 className="font-display text-3xl font-extrabold">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              It takes less than a minute to get started.
            </p>

            {/* Account type */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {(
                [
                  { id: "patient", label: "I need care", icon: User },
                  { id: "doctor", label: "I am a doctor", icon: Stethoscope },
                ] as const
              ).map((opt) => {
                const active = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`press flex items-center gap-2.5 rounded-xl border-2 p-3 text-sm font-bold transition ${
                      active
                        ? "border-sky bg-sky/10 text-sky"
                        : "border-border bg-surface text-muted hover:border-sky/40"
                    }`}
                  >
                    <opt.icon size={20} />
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
              <Input
                id="name"
                label="Full name"
                placeholder="Amara Nwosu"
                icon={<User size={18} />}
                value={form.name}
                onChange={set("name")}
                onBlur={blur("name")}
                error={show("name") ? errors.name : ""}
              />
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={form.email}
                onChange={set("email")}
                onBlur={blur("email")}
                error={show("email") ? errors.email : ""}
              />
              <Input
                id="phone"
                type="tel"
                label="Phone number"
                placeholder="+234 800 000 0000"
                icon={<Phone size={18} />}
                value={form.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
                error={show("phone") ? errors.phone : ""}
              />
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                label="Password"
                placeholder="Create a password"
                icon={<Lock size={18} />}
                value={form.password}
                onChange={set("password")}
                onBlur={blur("password")}
                error={show("password") ? errors.password : ""}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:text-sky"
                  >
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                }
              />
              <Input
                id="confirm"
                type={showPw ? "text" : "password"}
                label="Confirm password"
                placeholder="Re-enter your password"
                icon={<Lock size={18} />}
                value={form.confirm}
                onChange={set("confirm")}
                onBlur={blur("confirm")}
                error={show("confirm") ? errors.confirm : ""}
              />

              <label className="flex items-start gap-2.5 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-sky"
                />
                <span>
                  I agree to the MEDXPRESS{" "}
                  <span className="font-bold text-sky">Terms of Service</span>{" "}
                  and{" "}
                  <span className="font-bold text-sky">Privacy Policy</span>.
                </span>
              </label>

              <button
                type="submit"
                className="press flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky font-extrabold text-white shadow-sm shadow-sky/30 transition hover:bg-sky-600"
              >
                Create account <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-sky hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
