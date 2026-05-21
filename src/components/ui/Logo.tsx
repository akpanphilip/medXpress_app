import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  /** Use on dark backgrounds so the "MED" part stays readable. */
  light?: boolean;
  className?: string;
}

const markSize = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-14 w-14" };
const iconSize = { sm: 16, md: 20, lg: 28 };
const textSize = { sm: "text-base", md: "text-xl", lg: "text-3xl" };

export default function Logo({
  size = "md",
  withText = true,
  light = false,
  className,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl bg-gradient-to-br from-sky to-sky-600 shadow-sm shadow-sky/40",
          markSize[size],
        )}
      >
        <Activity size={iconSize[size]} strokeWidth={2.8} className="text-white" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-red" />
      </div>
      {withText && (
        <span className={cn("font-display font-extrabold tracking-tight", textSize[size])}>
          <span className={light ? "text-white" : "text-foreground"}>MED</span>
          <span className="text-sky">XPRESS</span>
        </span>
      )}
    </div>
  );
}
