"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { showToast } from "@/store/uiSlice";
import { demoAccounts } from "@/lib/data";
import { homeFor } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AuthSidePanel from "@/components/AuthSidePanel";

const roleOptions: { id: Role; label: string; icon: LucideIcon }[] = [
  { id: "patient", label: "Patient", icon: User },
  { id: "doctor", label: "Doctor", icon: Stethoscope },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);

  const emailErr =
    emailTouched && !EMAIL_RE.test(email)
      ? "Enter a valid email address"
      : "";
  const pwErr =
    pwTouched && password.length < 6
      ? "Password must be at least 6 characters"
      : "";

  const signInAs = (asRole: Role, useTypedEmail = false) => {
    const account = demoAccounts[asRole];
    dispatch(
      login({
        ...account,
        email: useTypedEmail && email ? email : account.email,
      }),
    );
    dispatch(
      showToast({ message: `Welcome back, ${account.name.split(" ")[0]}`, tone: "success" }),
    );
    router.push(homeFor(asRole));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPwTouched(true);
    if (!EMAIL_RE.test(email) || password.length < 6) return;
    signInAs(role, true);
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
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              Sign in to consult doctors, manage appointments and more.
            </p>

            {/* Role selector */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">I am signing in as a</p>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((opt) => {
                  const active = role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`press flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-xs font-bold transition ${
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
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                error={emailErr}
              />
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                icon={<Lock size={18} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPwTouched(true)}
                error={pwErr}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border accent-sky"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      showToast({
                        message: "Password reset link sent to your email",
                        tone: "info",
                      }),
                    )
                  }
                  className="text-sm font-bold text-sky hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="press flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky font-extrabold text-white shadow-sm shadow-sky/30 transition hover:bg-sky-600"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>

            {/* Demo quick access */}
            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold text-muted">
                or explore a demo account
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => signInAs(opt.id)}
                  className="press rounded-xl border border-border bg-surface py-2.5 text-xs font-bold text-foreground transition hover:border-sky hover:text-sky"
                >
                  {opt.label} demo
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted">
              New to MEDXPRESS?{" "}
              <Link href="/register" className="font-bold text-sky hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
