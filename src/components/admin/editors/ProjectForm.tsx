import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Panel } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { ToggleField } from '../fields/ToggleField';
import { TagInput } from '../fields/TagInput';
import { ImageInput } from '../fields/ImageInput';
import { createId, slugify } from '../../../utils/id';
import { accentOptions, roleOptions } from '../../../utils/adminOptions';
import { btnPrimary, btnSecondary } from '../../../utils/styles';
import type { Project } from '../../../types/portfolio';

interface ProjectFormProps {
  initial: Project;
  isNew: boolean;
  takenSlugs: string[];
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export function ProjectForm({ initial, isNew, takenSlugs, onSave, onCancel }: ProjectFormProps) {
  const [p, setP] = useState<Project>(initial);
  const [errors, setErrors] = useState<{title?: string;slug?: string;roles?: string;}>({});
  const set = <K extends keyof Project,>(key: K, value: Project[K]) => setP((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const next: typeof errors = {};
    if (!p.title.trim()) next.title = 'Judul wajib diisi.';
    const slug = slugify(p.slug || p.title);
    if (takenSlugs.includes(slug)) next.slug = 'Alamat ini sudah dipakai project lain.';
    if (p.roles.length === 0) next.roles = 'Pilih minimal satu peran.';
    setErrors(next);
    if (Object.keys(next).length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onSave({ ...p, slug });
  };

  const toggleRole = (role: Project['roles'][number]) =>
  set('roles', p.roles.includes(role) ? p.roles.filter((r) => r !== role) : [...p.roles, role]);

  return (
    <div>
      <button type="button" onClick={onCancel} className="mb-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Kembali ke daftar project
      </button>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{isNew ? 'Project baru' : `Edit: ${initial.title}`}</h1>
      <p className="mt-1.5 text-muted">Isi informasi, proses lengkap, dan galeri UI. Semua tampil di halaman detail project.</p>

      <div className="mt-8 space-y-6">
        <Panel title="Informasi dasar">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Judul project" value={p.title} onChange={(v) => set('title', v)} error={errors.title} />
            <TextField
              label="Alamat halaman"
              value={p.slug}
              onChange={(v) => set('slug', v)}
              error={errors.slug}
              placeholder={slugify(p.title || 'nama-project')}
              hint={`/project/${slugify(p.slug || p.title || 'nama-project')}`} />
            
          </div>
          <TextField label="Kategori" value={p.category} onChange={(v) => set('category', v)} placeholder="Team Project · Aplikasi ..." />
          <TextField label="Ringkasan" value={p.summary} onChange={(v) => set('summary', v)} multiline rows={3} />
          <div>
            <p className="mb-2 text-sm font-bold text-ink">Peran di project ini</p>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((r) => {
                const active = p.roles.includes(r.value);
                return (
                  <button
                    key={r.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleRole(r.value)}
                    className={`min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors duration-150 ease-out ${
                    active ? 'bg-primary text-white' : 'border border-line text-muted hover:text-ink'}`
                    }>
                    
                    {r.label}
                  </button>);

              })}
            </div>
            {errors.roles && <p className="mt-1.5 text-sm text-danger">{errors.roles}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField label="Peran saya" value={p.myRole} onChange={(v) => set('myRole', v)} />
            <TextField label="Tim" value={p.team} onChange={(v) => set('team', v)} />
            <TextField label="Durasi" value={p.duration} onChange={(v) => set('duration', v)} />
          </div>
          <TagInput label="Tools" value={p.tools} onChange={(v) => set('tools', v)} />
        </Panel>

        <Panel title="Kartu & sampul">
          <div className="grid gap-5 md:grid-cols-2">
            <ImageInput label="Gambar sampul" value={p.cover} onChange={(v) => set('cover', v)} hint="Rasio 16:10 disarankan." />
            <div className="grid content-start gap-5">
              <SelectField label="Warna kartu" value={p.color} options={accentOptions} onChange={(v) => set('color', v)} />
              <ToggleField label="Tandai sebagai contoh" checked={p.isSample} onChange={(v) => set('isSample', v)} hint="Menampilkan label “Contoh” di kartu." />
            </div>
          </div>
        </Panel>

        <Panel title="Hasil & bukti">
          <TextField label="Hasil (satu baris)" value={p.result} onChange={(v) => set('result', v)} />
          <ToggleField label="Hasil masih placeholder" checked={p.resultIsPlaceholder} onChange={(v) => set('resultIsPlaceholder', v)} hint="Matikan bila sudah berisi data nyata." />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Penanda bukti" value={p.proof} onChange={(v) => set('proof', v)} placeholder="Live di Google Play" />
            <TextField label="Tautan project" type="url" value={p.liveUrl} onChange={(v) => set('liveUrl', v)} placeholder="https://play.google.com/store/apps/..." />
          </div>
        </Panel>

        <Panel title={`Proses pengerjaan (${p.process.length} tahap)`}>
          <ListEditor
            items={p.process}
            onChange={(v) => set('process', v)}
            createItem={() => ({ id: createId(), title: 'Tahap baru', description: '', deliverables: [], tool: '' })}
            itemTitle={(s) => s.title}
            addLabel="Tambah tahap proses"
            emptyText="Belum ada tahap. Contoh: UX Research, PRD, Timeline Trello, Backlog, Use Case, UI, Prototype, Usability Testing, Upload Play Store."
            renderItem={(s, patch) =>
            <>
                <TextField label="Nama tahap" value={s.title} onChange={(v) => patch({ title: v })} />
                <TextField label="Penjelasan" value={s.description} onChange={(v) => patch({ description: v })} multiline rows={3} />
                <TagInput label="Hasil / dokumen" value={s.deliverables} onChange={(v) => patch({ deliverables: v })} />
                <TextField label="Tools" value={s.tool} onChange={(v) => patch({ tool: v })} placeholder="Figma, Trello, ..." />
              </>
            } />
          
        </Panel>

        <Panel title={`Galeri UI (${p.gallery.length} gambar)`}>
          <ListEditor
            items={p.gallery}
            onChange={(v) => set('gallery', v)}
            createItem={() => ({ id: createId(), src: '', title: 'Layar baru', caption: '' })}
            itemTitle={(g) => g.title}
            addLabel="Tambah gambar UI"
            emptyText="Belum ada gambar UI."
            renderItem={(g, patch) =>
            <div className="grid gap-5 md:grid-cols-2">
                <ImageInput label="Gambar" value={g.src} onChange={(v) => patch({ src: v })} />
                <div className="grid content-start gap-4">
                  <TextField label="Judul layar" value={g.title} onChange={(v) => patch({ title: v })} />
                  <TextField label="Penjelasan" value={g.caption} onChange={(v) => patch({ caption: v })} multiline rows={4} />
                </div>
              </div>
            } />
          
        </Panel>
      </div>

      <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex justify-end gap-2 border-t border-line bg-bg/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <button type="button" onClick={onCancel} className={`${btnSecondary} !min-h-[44px]`}>
          Batal
        </button>
        <button type="button" onClick={handleSave} className={`${btnPrimary} !min-h-[44px]`}>
          Simpan project
        </button>
      </div>
    </div>);

}