import React from 'react';
import { SectionShell, Panel } from '../SectionShell';
import { TextField } from '../fields/TextField';
import { ToggleField } from '../fields/ToggleField';
import { TagInput } from '../fields/TagInput';
import { ImageInput } from '../fields/ImageInput';
import { useSectionDraft } from '../../../hooks/useSectionDraft';
import type { Profile } from '../../../types/portfolio';

export function ProfileEditor() {
  const { draft, setDraft, dirty, commit, discard } = useSectionDraft('profile');
  const set = <K extends keyof Profile,>(key: K, value: Profile[K]) => setDraft({ ...draft, [key]: value });

  return (
    <SectionShell title="Profil & Hero" description="Foto, nama, headline, peran, dan teks tentang saya." dirty={dirty} onSave={commit} onDiscard={discard}>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Panel title="Foto profil">
            <ImageInput label="Foto" value={draft.photo} onChange={(v) => set('photo', v)} aspect="aspect-[4/5]" hint="Dipakai di hero dan bagian Tentang. Disarankan potret tegak." />
          </Panel>
        </div>
        <div className="space-y-6 lg:col-span-3">
          <Panel title="Identitas">
            <TextField label="Nama lengkap" value={draft.name} onChange={(v) => set('name', v)} />
            <TextField label="Nama panggilan" value={draft.shortName} onChange={(v) => set('shortName', v)} hint="Dipakai sebagai logo dan sapaan di bagian Tentang." />
            <TagInput label="Peran" value={draft.roles} onChange={(v) => set('roles', v)} hint="Peran pertama ditampilkan paling menonjol. Tekan Enter untuk menambah." />
          </Panel>
          <Panel title="Hero">
            <ToggleField label="Tampilkan badge ketersediaan" checked={draft.availability} onChange={(v) => set('availability', v)} />
            <TextField label="Teks ketersediaan" value={draft.availabilityText} onChange={(v) => set('availabilityText', v)} />
            <TextField label="Headline" value={draft.headline} onChange={(v) => set('headline', v)} multiline rows={2} hint="Ditampilkan huruf besar. Tekan Enter untuk pindah baris." />
            <TextField label="Aksen tulisan tangan" value={draft.headlineAccent} onChange={(v) => set('headlineAccent', v)} />
            <TextField label="Kalimat nilai" value={draft.valueProp} onChange={(v) => set('valueProp', v)} multiline rows={3} />
          </Panel>
        </div>
      </div>
      <Panel title="Tentang saya">
        <TextField label="Isi" value={draft.aboutBody} onChange={(v) => set('aboutBody', v)} multiline rows={6} hint="Pisahkan paragraf dengan satu baris kosong." />
      </Panel>
      <Panel title="CV & info kontak">
        <TextField label="Tautan CV (PDF)" type="url" value={draft.cvUrl} onChange={(v) => set('cvUrl', v)} placeholder="https://drive.google.com/..." hint="Kosongkan untuk memakai file placeholder." />
        <TextField label="Janji waktu respons" value={draft.responsePromise} onChange={(v) => set('responsePromise', v)} />
        <TextField label="Lokasi" value={draft.location} onChange={(v) => set('location', v)} />
      </Panel>
    </SectionShell>);

}