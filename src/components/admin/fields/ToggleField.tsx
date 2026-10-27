import React, { useId } from 'react';

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}

export function ToggleField({ label, checked, onChange, hint }: ToggleFieldProps) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="block text-sm font-bold text-ink">
          {label}
        </label>
        {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-150 ease-out ${checked ? 'bg-primary' : 'bg-line'}`}>
        
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ease-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        
      </button>
    </div>);

}