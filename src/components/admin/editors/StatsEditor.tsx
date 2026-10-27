import React from 'react';
import { SectionShell } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import { createId } from '../../../utils/id';

export function StatsEditor() {
  const { draft, setDraft, dirty, commit, discard } = useSectionDraft('stats');
  return (
    <SectionShell title="Angka ringkas" description="Angka di strip “Bukti kerja”. Kosongkan nilai untuk menampilkan tanda —." dirty={dirty} onSave={commit} onDiscard={discard}>
      <ListEditor
        items={draft}
        onChange={setDraft}
        createItem={() => ({ id: createId(), label: 'Angka baru', value: null, suffix: '' })}
        itemTitle={(s) => `${s.label} — ${s.value ?? 'belum diisi'}${s.value !== null ? s.suffix : ''}`}
        addLabel="Tambah angka"
        emptyText="Belum ada angka."
        renderItem={(s, patch) =>
        <>
            <TextField label="Label" value={s.label} onChange={(v) => patch({ label: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
              label="Nilai"
              type="number"
              value={s.value === null ? '' : String(s.value)}
              onChange={(v) => patch({ value: v === '' ? null : Math.max(0, Number(v)) })}
              hint="Angka asli dari data Anda." />
            
              <TextField label="Akhiran" value={s.suffix} onChange={(v) => patch({ suffix: v })} placeholder="+, th, orang" />
            </div>
          </>
        } />
      
    </SectionShell>);

}