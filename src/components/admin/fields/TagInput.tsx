import React, { useId, useState } from 'react';
import { XIcon } from 'lucide-react';

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  hint?: string;
}

export function TagInput({ label, value, onChange, placeholder = 'Ketik lalu tekan Enter', hint }: TagInputProps) {
  const id = useId();
  const [text, setText] = useState('');

  const add = () => {
    const parts = text.split(',').map((t) => t.trim()).filter((t) => t && !value.includes(t));
    if (parts.length) onChange([...value, ...parts]);
    setText('');
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
      </label>
      <div className="flex min-h-[44px] flex-wrap items-center gap-1.5 rounded-xl border border-line bg-bg px-2 py-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
        {value.map((tag, i) =>
        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-surface-2 py-1 pl-3 pr-1 text-sm font-semibold text-ink">
            {i === 0 && hint?.includes('pertama') ? <strong>{tag}</strong> : tag}
            <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            aria-label={`Hapus ${tag}`}
            className="grid h-6 w-6 place-items-center rounded-full hover:bg-line">
            
              <XIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
        <input
          id={id}
          value={text}
          placeholder={value.length ? '' : placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            } else if (e.key === 'Backspace' && !text && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={add}
          className="min-w-[140px] flex-1 bg-transparent px-1.5 py-1 text-[15px] text-ink placeholder:text-muted/70 focus:outline-none" />
        
      </div>
      <p className="mt-1.5 text-xs text-muted">{hint ?? 'Tekan Enter atau koma untuk menambah.'}</p>
    </div>);

}