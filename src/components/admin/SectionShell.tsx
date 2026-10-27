import React from 'react';
import { toast } from 'sonner';
import { CheckIcon } from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../utils/styles';

interface SectionShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  dirty?: boolean;
  /** Mengembalikan false bila gagal tersimpan. */
  onSave?: () => boolean;
  onDiscard?: () => void;
}

export const STORAGE_FULL_MSG = 'Penyimpanan browser penuh. Kecilkan gambar atau gunakan URL gambar.';

export function SectionShell({ title, description, children, dirty = false, onSave, onDiscard }: SectionShellProps) {
  const handleSave = () => {
    if (!onSave) return;
    if (onSave()) toast.success('Perubahan disimpan dan langsung tampil di website.');else
    toast.error(STORAGE_FULL_MSG);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h1>
        <p className="mt-1.5 text-muted">{description}</p>
      </header>
      <div className="space-y-6">{children}</div>
      {onSave &&
      <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted">
            {dirty ?
          <>
                <span className="h-2 w-2 rounded-full bg-pink" aria-hidden /> Ada perubahan yang belum disimpan
              </> :

          <>
                <CheckIcon className="h-4 w-4 text-success" aria-hidden /> Semua perubahan tersimpan
              </>
          }
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={onDiscard} disabled={!dirty} className={`${btnSecondary} !min-h-[44px]`}>
              Batalkan
            </button>
            <button type="button" onClick={handleSave} disabled={!dirty} className={`${btnPrimary} !min-h-[44px]`}>
              Simpan
            </button>
          </div>
        </div>
      }
    </div>);

}

export function Panel({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 md:p-7">
      <h2 className="mb-5 text-lg font-extrabold text-ink">{title}</h2>
      <div className="grid gap-5">{children}</div>
    </section>);

}