"use client";

import { useMemo, useState } from "react";
import { Search, Ban, RotateCcw, Users as UsersIcon } from "lucide-react";
import type { ManagedUser, Role } from "@/lib/types";
import { managedUsers } from "@/lib/data";
import { cn, roleLabel } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

const filters: { id: Role | "all"; label: string }[] = [
  { id: "all", label: "All users" },
  { id: "patient", label: "Patients" },
  { id: "doctor", label: "Doctors" },
];

export default function AdminUsersPage() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<ManagedUser[]>(managedUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (
        q &&
        !u.name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [users, query, roleFilter]);

  const toggle = (u: ManagedUser) => {
    const next = u.status === "active" ? "suspended" : "active";
    setUsers((list) =>
      list.map((x) => (x.id === u.id ? { ...x, status: next } : x)),
    );
    dispatch(
      showToast({
        message: `${u.name} ${next === "active" ? "reactivated" : "suspended"}`,
        tone: next === "active" ? "success" : "info",
      }),
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          User management
        </h1>
        <p className="text-sm text-muted">
          {users.length} registered users on the platform.
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/15"
        />
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setRoleFilter(f.id)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-xs font-bold transition",
              roleFilter === f.id
                ? "border-sky bg-sky text-white"
                : "border-border bg-surface text-muted hover:border-sky/50",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-muted">
            <UsersIcon size={26} />
          </div>
          <p className="mt-3 font-bold">No users found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {list.map((u) => (
            <Card key={u.id} className="flex items-center gap-3 p-3.5">
              <Avatar src={u.avatar} name={u.name} size={46} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{u.name}</p>
                <p className="truncate text-xs text-muted">{u.email}</p>
              </div>
              <div className="hidden flex-col items-end gap-1 sm:flex">
                <Badge tone={u.role === "doctor" ? "sky" : "neutral"}>
                  {roleLabel(u.role)}
                </Badge>
                <span className="text-[11px] text-muted">
                  Joined {u.joined}
                </span>
              </div>
              <Badge tone={u.status === "active" ? "online" : "red"} dot>
                {u.status}
              </Badge>
              <button
                onClick={() => toggle(u)}
                aria-label={
                  u.status === "active" ? "Suspend user" : "Reactivate user"
                }
                className={cn(
                  "press grid h-9 w-9 place-items-center rounded-lg border transition",
                  u.status === "active"
                    ? "border-red/40 text-red hover:bg-red/10"
                    : "border-online/40 text-online hover:bg-online/10",
                )}
              >
                {u.status === "active" ? (
                  <Ban size={16} />
                ) : (
                  <RotateCcw size={16} />
                )}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
