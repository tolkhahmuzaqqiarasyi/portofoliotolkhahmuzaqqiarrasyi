import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { DownloadIcon, InfoIcon, RotateCcwIcon, UploadIcon } from 'lucide-react';
import { Panel, STORAGE_FULL_MSG } from '../SectionShell';
import { TextField } from '../fields/TextField';
import { useAuth } from '../../../contexts/AuthContext';
import { usePortfolio } from '../../../contexts/PortfolioContext';
import { btnPrimary, btnSecondary } from '../../../utils/styles';
import type { PortfolioData } from '../../../types/portfolio';

export function SettingsEditor() {
  const { changePassword } = useAuth();
  const { data, replaceAll, reset } = usePortfolio();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pw.next !== pw.confirm) {
      setPwError('Konfirmasi kata sandi tidak sama.');
      return;
    }
    setSaving(true);
    const res = await changePassword(pw.current, pw.next);
    setSaving(false);
    if (!res.ok) {
      setPwError(res.error ?? 'Gagal mengubah kata sandi.');
      return;
    }
    setPw({ current: '', next: '', confirm: '' });
    toast.success('Kata sandi berhasil diubah.');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portofolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importData = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as PortfolioData;
      if (!parsed.profile || !Array.isArray(parsed.projects)) throw new Error();
      if (!window.confirm('Ganti seluruh isi website dengan data dari file ini?')) return;
      if (replaceAll(parsed)) toast.success('Data berhasil dipulihkan.');else
      toast.error(STORAGE_FULL_MSG);
    } catch {
      toast.error('File tidak valid. Gunakan file backup dari dashboard ini.');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Pengaturan</h1>
        <p className="mt-1.5 text-muted">Keamanan akun dan cadangan data.</p>
      </header>
      <div className="space-y-6">
        <p className="flex gap-3 rounded-2xl bg-primary/10 p-4 text-sm leading-relaxed text-ink">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" aria-hidden />
          Perubahan tersimpan di browser ini. Agar perubahan tampil untuk semua pengunjung, website perlu dihubungkan ke database
          (misalnya Supabase). Gunakan backup untuk memindahkan data.
        </p>

        <Panel title="Ubah kata sandi">
          <form onSubmit={handlePassword} className="grid gap-4">
            <TextField label="Kata sandi saat ini" type="password" autoComplete="current-password" value={pw.current} onChange={(v) => setPw({ ...pw, current: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Kata sandi baru" type="password" autoComplete="new-password" value={pw.next} onChange={(v) => setPw({ ...pw, next: v })} hint="Minimal 8 karakter." />
              <TextField label="Ulangi kata sandi baru" type="password" autoComplete="new-password" value={pw.confirm} onChange={(v) => setPw({ ...pw, confirm: v })} />
            </div>
            {pwError &&
            <p role="alert" className="text-sm font-semibold text-danger">
                {pwError}
              </p>
            }
            <button type="submit" disabled={saving || !pw.current || !pw.next} className={`${btnPrimary} !min-h-[44px] w-fit`}>
              {saving ? 'Menyimpan…' : 'Ubah kata sandi'}
            </button>
          </form>
        </Panel>

        <Panel title="Cadangan data">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={exportData} className={`${btnSecondary} !min-h-[44px]`}>
              <DownloadIcon className="h-4 w-4" aria-hidden /> Unduh backup (JSON)
            </button>
            <input ref={fileRef} id="import-backup" type="file" accept="application/json" className="sr-only" onChange={(e) => importData(e.target.files?.[0])} />
            <label htmlFor="import-backup" className={`${btnSecondary} !min-h-[44px] cursor-pointer`}>
              <UploadIcon className="h-4 w-4" aria-hidden /> Pulihkan dari backup
            </label>
          </div>
        </Panel>

        <Panel title="Kembalikan ke awal">
          <p className="text-sm text-muted">Menghapus semua perubahan dan mengembalikan isi website ke data awal.</p>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Yakin? Semua perubahan akan hilang.')) {
                reset();
                toast.success('Data dikembalikan ke awal.');
              }
            }}
            className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-danger/50 px-5 text-sm font-bold text-danger hover:bg-danger/10">
            
            <RotateCcwIcon className="h-4 w-4" aria-hidden /> Reset semua data
          </button>
        </Panel>
      </div>
    </div>);

}