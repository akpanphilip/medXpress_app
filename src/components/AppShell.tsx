"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Stethoscope,
  CalendarDays,
  HeartPulse,
  User,
  LayoutDashboard,
  Users,
  BadgeCheck,
  ChartColumn,
  Bell,
  LogOut,
  ChevronDown,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/lib/types";
import { cn, roleLabel } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import Logo from "@/components/ui/Logo";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import EmergencyFab from "@/components/EmergencyFab";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: Record<Role, NavItem[]> = {
  patient: [
    { href: "/home", label: "Home", icon: Home, exact: true },
    { href: "/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/appointments", label: "Visits", icon: CalendarDays },
    { href: "/dashboard", label: "Health", icon: HeartPulse },
    { href: "/profile", label: "Profile", icon: User },
  ],
  doctor: [
    { href: "/doctor", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/doctor/schedule", label: "Schedule", icon: CalendarDays },
    { href: "/doctor/patients", label: "Patients", icon: Users },
    { href: "/doctor/profile", label: "Profile", icon: User },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/doctors", label: "Verify", icon: BadgeCheck },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: ChartColumn },
  ],
};

const NOTIFICATIONS = [
  {
    title: "Appointment reminder",
    body: "Your video consult with Dr. Adaeze Okonkwo starts at 2:00 PM.",
    time: "10m ago",
    tone: "sky" as const,
  },
  {
    title: "New prescription",
    body: "Dr. Daniel Mensah issued a prescription from your last visit.",
    time: "1h ago",
    tone: "online" as const,
  },
  {
    title: "Test result ready",
    body: "Your Lipid Profile result is available to view.",
    time: "3h ago",
    tone: "amber" as const,
  },
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function FullScreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky to-sky-600">
        <span className="pulse-ring absolute inset-0 rounded-2xl bg-sky" />
        <Activity size={30} strokeWidth={2.8} className="relative text-white" />
      </div>
    </div>
  );
}

export default function AppShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  const items = NAV[role];
  const isSidebar = role !== "patient";

  // Soft client-side guard: send signed-out visitors to the login screen.
  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  // Close popovers on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setBellOpen(false);
  }, [pathname]);

  if (!hydrated) return <FullScreenLoader />;
  if (!user) return null;

  const signOut = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const HeaderActions = (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      {/* Notifications */}
      <div className="relative">
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => {
            setBellOpen((v) => !v);
            setMenuOpen(false);
          }}
          className="press relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-foreground transition hover:border-sky hover:text-sky"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-surface bg-red" />
        </button>
        {bellOpen && (
          <div className="fade-up absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-navy/10">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-bold">Notifications</p>
              <span className="rounded-full bg-red/10 px-2 py-0.5 text-[11px] font-bold text-red">
                3 new
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.title}
                  className="flex gap-3 border-b border-border px-4 py-3 last:border-0"
                >
                  <span
                    className={cn(
                      "mt-1 h-2 w-2 shrink-0 rounded-full",
                      n.tone === "sky" && "bg-sky",
                      n.tone === "online" && "bg-online",
                      n.tone === "amber" && "bg-amber",
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-xs text-muted">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setMenuOpen((v) => !v);
            setBellOpen(false);
          }}
          className="press flex items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pl-1.5 pr-2.5 transition hover:border-sky"
        >
          <Avatar src={user.avatar} name={user.name} size={30} />
          <span className="hidden text-sm font-bold sm:block">
            {user.name.split(" ")[0]}
          </span>
          <ChevronDown size={15} className="text-muted" />
        </button>
        {menuOpen && (
          <div className="fade-up absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-navy/10">
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Avatar src={user.avatar} name={user.name} size={42} />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <div className="p-2">
              <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                <span className="text-muted">Role</span>
                <span className="rounded-md bg-sky/10 px-2 py-0.5 text-xs font-bold text-sky">
                  {roleLabel(user.role)}
                </span>
              </span>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-surface-2"
              >
                <Users size={16} className="text-muted" /> Switch account
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red transition hover:bg-red/10"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Click-away layer for popovers */}
      {(menuOpen || bellOpen) && (
        <button
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => {
            setMenuOpen(false);
            setBellOpen(false);
          }}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      {/* Desktop sidebar (doctor + admin) */}
      {isSidebar && (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface md:flex">
          <div className="px-5 py-5">
            <Logo size="sm" />
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {items.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-sky text-white shadow-sm shadow-sky/30"
                      : "text-muted hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
              <Avatar src={user.avatar} name={user.name} size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted">
                  {roleLabel(user.role)}
                </p>
              </div>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                className="press grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-red/10 hover:text-red"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>
      )}

      <div className={cn(isSidebar && "md:pl-60")}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
          <div
            className={cn(
              "flex h-16 items-center gap-4 px-4 sm:px-6",
              !isSidebar && "mx-auto max-w-6xl",
            )}
          >
            {/* Logo: always on patient, mobile-only when a sidebar exists */}
            <Link href={items[0].href} className={cn(isSidebar && "md:hidden")}>
              <Logo size="sm" withText={!isSidebar} />
            </Link>

            {/* Patient: inline desktop nav */}
            {!isSidebar && (
              <nav className="ml-2 hidden items-center gap-1 md:flex">
                {items.map((item) => {
                  const active = isActive(pathname, item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-sky/10 text-sky"
                          : "text-muted hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            <div className="ml-auto">{HeaderActions}</div>
          </div>
        </header>

        {/* Page content */}
        <main
          className={cn(
            "px-4 pb-28 pt-5 sm:px-6 md:pb-12",
            !isSidebar && "mx-auto max-w-6xl",
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
        <div className="flex items-stretch">
          {items.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
              >
                {active && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-sky" />
                )}
                <Icon
                  size={21}
                  className={cn(
                    "transition",
                    active ? "text-sky" : "text-muted",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-bold",
                    active ? "text-sky" : "text-muted",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <EmergencyFab />
    </div>
  );
}
