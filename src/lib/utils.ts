// Small utilities shared across the app.

/** Join class names, keeping only non-empty strings. */
export function cn(...parts: unknown[]): string {
  return parts
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .join(" ");
}

/** Format a number as Nigerian Naira (the platform's default currency). */
export function formatMoney(amount: number): string {
  return "N" + amount.toLocaleString("en-NG");
}

/** Build initials from a full name, e.g. "Ada Obi" -> "AO". */
export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Deterministic warm gradient for an avatar fallback, seeded by a string. */
export function avatarGradient(seed: string): string {
  const palettes = [
    "from-sky to-sky-600",
    "from-[#5ec7ff] to-[#1f9fe8]",
    "from-[#7a8cff] to-[#4f63d8]",
    "from-amber to-red",
    "from-online to-[#16a34a]",
    "from-[#ff8a5b] to-red",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return palettes[Math.abs(h) % palettes.length];
}

/** Title-case a role for display. */
export function roleLabel(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

/** The landing route for each role after signing in. */
export function homeFor(role: string): string {
  if (role === "doctor") return "/doctor";
  if (role === "admin") return "/admin";
  return "/home";
}
