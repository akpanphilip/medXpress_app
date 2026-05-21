import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  trailing,
  className,
  id,
  ...rest
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "h-12 w-full rounded-xl border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:ring-4 focus:ring-sky/15",
            icon && "pl-11",
            trailing && "pr-11",
            error ? "border-red focus:border-red" : "border-border focus:border-sky",
            className,
          )}
          {...rest}
        />
        {trailing && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>
      {error ? (
        <p className="text-xs font-semibold text-red">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({
  label,
  error,
  className,
  id,
  ...rest
}: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:ring-4 focus:ring-sky/15",
          error ? "border-red focus:border-red" : "border-border focus:border-sky",
          className,
        )}
        {...rest}
      />
      {error && <p className="text-xs font-semibold text-red">{error}</p>}
    </div>
  );
}
