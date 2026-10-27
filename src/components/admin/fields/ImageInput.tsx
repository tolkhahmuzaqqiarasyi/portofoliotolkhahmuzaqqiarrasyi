import React, { useId, useRef, useState } from 'react';
import { ImageIcon, Loader2Icon, Trash2Icon, UploadIcon } from 'lucide-react';
import { adminInput } from './TextField';
import { compressImage } from '../../../utils/image';

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  aspect?: 'aspect-[16/10]' | 'aspect-[4/5]' | 'aspect-square';
  hint?: string;
}

export function ImageInput({ label, value, onChange, aspect = 'aspect-[16/10]', hint }: ImageInputProps) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      onChange(await compressImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mengunggah gambar.');
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const isDataUrl = value.startsWith('data:');

  return (
    <div>
      <p className="mb-1.5 text-sm font-bold text-ink">{label}</p>
      <div className={`relative grid ${aspect} w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-line bg-surface-2`}>
        {value ?
        <img src={value} alt="" className="h-full w-full object-cover" /> :

        <span className="flex flex-col items-center gap-1 text-sm text-muted">
            <ImageIcon className="h-6 w-6" aria-hidden /> Belum ada gambar
          </span>
        }
        {loading &&
        <span className="absolute inset-0 grid place-items-center bg-bg/70">
            <Loader2Icon className="h-6 w-6 animate-spin text-primary" aria-label="Memproses gambar" />
          </span>
        }
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input ref={fileRef} id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => handleFile(e.target.files?.[0])} />
        <label
          htmlFor={id}
          className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-white focus-within:ring-4">
          
          <UploadIcon className="h-4 w-4" aria-hidden /> Unggah gambar
        </label>
        {value &&
        <button
          type="button"
          onClick={() => onChange('')}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink hover:border-danger hover:text-danger">
          
            <Trash2Icon className="h-4 w-4" aria-hidden /> Hapus
          </button>
        }
      </div>
      <input
        type="url"
        value={isDataUrl ? '' : value}
        placeholder={isDataUrl ? 'Gambar dari unggahan' : 'atau tempel URL gambar (https://...)'}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} — URL gambar`}
        className={`${adminInput} mt-2 min-h-[40px] text-sm`} />
      
      {error ? <p className="mt-1.5 text-sm text-danger">{error}</p> : hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>);

}