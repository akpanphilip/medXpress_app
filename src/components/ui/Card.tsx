import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}

export default function Card({ className, children, interactive }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface",
        interactive &&
          "press cursor-pointer transition hover:border-sky/40 hover:shadow-lg hover:shadow-navy/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
