import React from 'react';
import { SectionShell, Panel } from '../SectionShell';
import { ListEditor } from '../ListEditor';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { TagInput } from '../fields/TagInput';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import { createId } from '../../../utils/id';
import { accentOptions, roleOptions } from '../../../utils/adminOptions';

export function FlowEditor() {
  const stages = useSectionDraft('stages');
  const steps = useSectionDraft('workSteps');

  return (
    <SectionShell
      title="Alur & cara kerja"
      description="Kartu Plan / Design / Build / Grow dan langkah cara kerja."
      dirty={stages.dirty || steps.dirty}
      onSave={() => stages.commit() && steps.commit()}
      onDiscard={() => {
        stages.discard();
        steps.discard();
      }}>
      
      <Panel title="Tahap Plan / Design / Build / Grow">
        <ListEditor
          items={stages.draft}
          onChange={stages.setDraft}
          createItem={() => ({ id: createId(), name: 'Tahap baru', role: '', proofs: [], accent: 'primary', filter: 'UI/UX' })}
          itemTitle={(s) => `${s.name} — ${s.role}`}
          addLabel="Tambah tahap"
          emptyText="Belum ada tahap."
          renderItem={(s, patch) =>
          <>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Nama tahap" value={s.name} onChange={(v) => patch({ name: v })} />
                <TextField label="Peran" value={s.role} onChange={(v) => patch({ role: v })} />
              </div>
              <TagInput label="Bukti yang ditampilkan" value={s.proofs} onChange={(v) => patch({ proofs: v })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Warna" value={s.accent} options={accentOptions} onChange={(v) => patch({ accent: v })} />
                <SelectField label="Filter project terkait" value={s.filter} options={roleOptions} onChange={(v) => patch({ filter: v })} />
              </div>
            </>
          } />
        
      </Panel>
      <Panel title="Cara kerja saya">
        <ListEditor
          items={steps.draft}
          onChange={steps.setDraft}
          createItem={() => ({ id: createId(), name: 'Langkah baru', description: '', output: '' })}
          itemTitle={(s) => s.name}
          addLabel="Tambah langkah"
          emptyText="Belum ada langkah."
          renderItem={(s, patch) =>
          <>
              <TextField label="Nama langkah" value={s.name} onChange={(v) => patch({ name: v })} />
              <TextField label="Deskripsi" value={s.description} onChange={(v) => patch({ description: v })} multiline rows={2} />
              <TextField label="Hasil" value={s.output} onChange={(v) => patch({ output: v })} />
            </>
          } />
        
      </Panel>
    </SectionShell>);

}