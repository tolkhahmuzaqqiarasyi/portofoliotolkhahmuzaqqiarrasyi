import React from 'react';
import { SectionShell } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import { createId } from '../../../utils/id';
import { iconOptions } from '../../../utils/icons';

export function ServicesEditor() {
  const { draft, setDraft, dirty, commit, discard } = useSectionDraft('services');
  return (
    <SectionShell title="Layanan" description="Daftar layanan beserta harga mulai dari." dirty={dirty} onSave={commit} onDiscard={discard}>
      <ListEditor
        items={draft}
        onChange={setDraft}
        createItem={() => ({ id: createId(), title: 'Layanan baru', group: 'Desain', description: '', icon: 'sparkles', price: 'Rp —' })}
        itemTitle={(s) => s.title}
        addLabel="Tambah layanan"
        emptyText="Belum ada layanan."
        renderItem={(s, patch) =>
        <>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Nama layanan" value={s.title} onChange={(v) => patch({ title: v })} />
              <TextField label="Kelompok" value={s.group} onChange={(v) => patch({ group: v })} placeholder="Desain, Digital Marketing..." />
            </div>
            <TextField label="Deskripsi singkat" value={s.description} onChange={(v) => patch({ description: v })} multiline rows={2} />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Ikon" value={s.icon} options={iconOptions} onChange={(v) => patch({ icon: v })} />
              <TextField label="Harga mulai dari" value={s.price} onChange={(v) => patch({ price: v })} placeholder="Rp 1.500.000" />
            </div>
          </>
        } />
      
    </SectionShell>);

}