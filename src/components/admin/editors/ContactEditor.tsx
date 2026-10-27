import React from 'react';
import { SectionShell } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import { createId } from '../../../utils/id';
import { iconOptions } from '../../../utils/icons';

export function ContactEditor() {
  const { draft, setDraft, dirty, commit, discard } = useSectionDraft('socials');
  return (
    <SectionShell
      title="Kontak & sosial"
      description="Tautan di hero dan bagian kontak. Tautan dengan ikon WhatsApp dipakai sebagai tombol utama."
      dirty={dirty}
      onSave={commit}
      onDiscard={discard}>
      
      <ListEditor
        items={draft}
        onChange={setDraft}
        createItem={() => ({ id: createId(), label: 'Tautan baru', handle: '', href: 'https://', icon: 'globe' })}
        itemTitle={(s) => `${s.label} — ${s.handle}`}
        addLabel="Tambah tautan"
        emptyText="Belum ada tautan kontak."
        renderItem={(s, patch) =>
        <>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Nama" value={s.label} onChange={(v) => patch({ label: v })} />
              <TextField label="Teks tampilan" value={s.handle} onChange={(v) => patch({ handle: v })} />
            </div>
            <TextField label="Tautan" value={s.href} onChange={(v) => patch({ href: v })} hint="Email: mailto:nama@gmail.com · WhatsApp: https://wa.me/62..." />
            <SelectField label="Ikon" value={s.icon} options={iconOptions} onChange={(v) => patch({ icon: v })} />
          </>
        } />
      
    </SectionShell>);

}