import {
  HeartPulse,
  Sparkles,
  Baby,
  Brain,
  Stethoscope,
  Smile,
  Activity,
  Bone,
  Flower2,
  Eye,
  Scale,
  Droplet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  HeartPulse,
  Sparkles,
  Baby,
  Brain,
  Stethoscope,
  Smile,
  Activity,
  Bone,
  Flower2,
  Eye,
  Scale,
  Droplet,
};

/** Renders a lucide icon by its string name (used for data-driven icons). */
export default function DynamicIcon({
  name,
  size = 20,
  className,
  strokeWidth,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = map[name] ?? Stethoscope;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
