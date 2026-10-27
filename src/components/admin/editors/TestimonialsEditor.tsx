import React from 'react';
import { SectionShell } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { ToggleField } from '../fields/ToggleField';
import { ImageInput } from '../fields/ImageInput';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import { createId } from '../../../utils/id';

export function TestimonialsEditor() {
  const { draft, setDraft, dirty, commit, discard } = useSectionDraft('testimonials');
  return (
    <SectionShell title="Testimoni" description="Kutipan dari klien, rekan tim, atau mentor." dirty={dirty} onSave={commit} onDiscard={discard}>
      <ListEditor
        items={draft}
        onChange={setDraft}
        createItem={() => ({ id: createId(), name: '', role: '', quote: '', photo: '', isSample: false })}
        itemTitle={(t) => t.name}
        addLabel="Tambah testimoni"
        emptyText="Belum ada testimoni. Bagian testimoni disembunyikan sampai ada isinya."
        renderItem={(t, patch) =>
        <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <ImageInput label="Foto" value={t.photo} onChange={(v) => patch({ photo: v })} aspect="aspect-square" hint="Opsional." />
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Nama" value={t.name} onChange={(v) => patch({ name: v })} />
                <TextField label="Jabatan" value={t.role} onChange={(v) => patch({ role: v })} placeholder="Jabatan · Perusahaan" />
              </div>
              <TextField label="Kutipan" value={t.quote} onChange={(v) => patch({ quote: v })} multiline rows={3} />
              <ToggleField label="Tandai sebagai data contoh" checked={t.isSample} onChange={(v) => patch({ isSample: v })} />
            </div>
          </div>
        } />
      
    </SectionShell>);

}