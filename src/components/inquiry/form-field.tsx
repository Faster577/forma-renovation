import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-sm border border-ink/15 bg-ivory px-4 py-3.5 text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/35 focus:border-ink/40 focus:ring-1 focus:ring-ink/15 disabled:opacity-60";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FieldShell({
  id,
  label,
  required,
  optionalLabel,
  error,
  hint,
  children,
}: FieldShellProps) {
  const describedBy = [
    error ? `${id}-error` : null,
    hint ? `${id}-hint` : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-ink/80">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-2 text-[0.7rem] tracking-[0.12em] uppercase text-ink/35">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      {/* Clone describedBy onto child via wrapper data attribute usage in parents */}
      <div data-describedby={describedBy}>{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-ink/45">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm text-red-800/80"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optionalLabel?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  optionalLabel,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      optionalLabel={optionalLabel}
      error={error}
      hint={hint}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${fieldClass} ${error ? "border-red-800/40" : ""} ${className}`}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  className = "",
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${fieldClass} ${error ? "border-red-800/40" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optionalLabel?: string;
};

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  optionalLabel,
  className = "",
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      optionalLabel={optionalLabel}
      error={error}
      hint={hint}
    >
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${fieldClass} min-h-36 resize-y ${error ? "border-red-800/40" : ""} ${className}`}
        {...props}
      />
    </FieldShell>
  );
}
