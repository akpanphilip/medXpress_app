import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "danger" | "outline" | "ghost" | "navy" | "subtle";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-sky text-white hover:bg-sky-600 shadow-sm shadow-sky/30",
  danger: "bg-red text-white hover:bg-red-600 shadow-sm shadow-red/30",
  navy: "bg-navy text-white hover:bg-navy-700 dark:bg-surface-2 dark:hover:bg-surface",
  outline:
    "border border-border bg-surface text-foreground hover:border-sky hover:text-sky",
  ghost: "text-foreground hover:bg-surface-2",
  subtle: "bg-sky/10 text-sky hover:bg-sky/20",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-6 text-base gap-2",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ActionProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  "aria-label"?: string;
}

interface NavProps extends BaseProps {
  href: string;
  title?: string;
  "aria-label"?: string;
}

export default function Button(props: ActionProps | NavProps) {
  const { variant = "primary", size = "md", fullWidth, className, children } =
    props;
  const classes = cn(
    "press inline-flex items-center justify-center rounded-xl font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={classes}
        title={props.title}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
