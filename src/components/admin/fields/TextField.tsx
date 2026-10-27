import React, { useId } from 'react';

export const adminInput =
'block w-full rounded-xl border border-line bg-bg px-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 ease-out focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: 'text' | 'url' | 'email' | 'number' | 'password';
  placeholder?: string;
  hint?: string;
  error?: string;
  autoComplete?: string;
}

export function TextField({ label, value, onChange, multiline, rows = 3, type = 'text', placeholder, hint, error, autoComplete }: TextFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const cls = `${adminInput} ${error ? '!border-danger' : ''}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
      </label>
      {multiline ?
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${cls} resize-y py-2.5 leading-relaxed`} /> :


      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${cls} min-h-[44px]`} />

      }
      {error ?
      <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p> :

      hint &&
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
            {hint}
          </p>

      }
    </div>);

}