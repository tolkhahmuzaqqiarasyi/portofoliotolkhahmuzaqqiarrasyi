import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { ProjectForm } from './ProjectForm';
import { STORAGE_FULL_MSG } from '../SectionShell';
import { usePortfolio } from '../../../contexts/PortfolioContext';
import { createId } from '../../../utils/id';
import { btnPrimary, roleLabel } from '../../../utils/styles';
import type { Project } from '../../../types/portfolio';

const iconBtn = 'grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-surface-2 hover:text-ink disabled:opacity-30';

function blankProject(): Project {
  return {
    id: createId(), slug: '', title: '', category: '', summary: '', roles: ['UI/UX'], myRole: '', team: '', duration: '', tools: [],
    result: '', resultIsPlaceholder: true, proof: '', liveUrl: '', cover: '', color: 'primary', isSample: false, process: [], gallery: []
  };
}

export function ProjectsEditor() {
  const { data, update } = usePortfolio();
  const projects = data.projects;
  const [editing, setEditing] = useState<{project: Project;isNew: boolean;} | null>(null);

  const save = (list: Project[], msg: string) => {
    if (update('projects', list)) toast.success(msg);else
    toast.error(STORAGE_FULL_MSG);
  };

  if (editing) {
    return (
      <ProjectForm
        initial={editing.project}
        isNew={editing.isNew}
        takenSlugs={projects.filter((p) => p.id !== editing.project.id).map((p) => p.slug)}
        onCancel={() => setEditing(null)}
        onSave={(project) => {
          const list = editing.isNew ? [...projects, project] : projects.map((p) => p.id === project.id ? project : p);
          if (update('projects', list)) {
            toast.success('Project disimpan.');
            setEditing(null);
          } else toast.error(STORAGE_FULL_MSG);
        }} />);


  }

  const move = (i: number, d: number) => {
    const next = [...projects];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    save(next, 'Urutan project diperbarui.');
  };

  return (
    <div>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Project</h1>
          <p className="mt-1.5 text-muted">4 project teratas tampil di beranda. Project pertama menjadi project unggulan di hero.</p>
        </div>
        <button type="button" onClick={() => setEditing({ project: blankProject(), isNew: true })} className={`${btnPrimary} !min-h-[44px]`}>
          <PlusIcon className="h-4 w-4" aria-hidden /> Tambah project
        </button>
      </header>

      {projects.length === 0 ?
      <p className="rounded-3xl border border-dashed border-line p-10 text-center text-muted">Belum ada project.</p> :

      <ul className="space-y-3">
          {projects.map((p, i) =>
        <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center">
              {p.cover ?
          <img src={p.cover} alt="" className="aspect-[16/10] w-full rounded-xl object-cover sm:w-36" /> :

          <span className="grid aspect-[16/10] w-full place-items-center rounded-xl bg-surface-2 text-xs text-muted sm:w-36">Tanpa sampul</span>
          }
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-extrabold text-ink">
                  {p.title || 'Tanpa judul'}
                  {i === 0 && <span className="rounded-full bg-lemon px-2 py-0.5 text-xs font-bold text-night">Unggulan</span>}
                  {p.isSample && <span className="rounded-full border border-dashed border-line px-2 py-0.5 text-xs font-semibold text-muted">Contoh</span>}
                </p>
                <p className="mt-0.5 text-sm text-muted">{p.roles.map((r) => roleLabel[r]).join(' · ')}</p>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {p.process.length} tahap proses · {p.gallery.length} gambar UI
                </p>
              </div>
              <div className="flex items-center gap-1 self-end sm:self-center">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Naikkan" className={iconBtn}>
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === projects.length - 1} aria-label="Turunkan" className={iconBtn}>
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
                <Link to={`/project/${p.slug}`} target="_blank" aria-label="Lihat di website" className={iconBtn}>
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
                <button
              type="button"
              onClick={() => {
                if (window.confirm(`Hapus project "${p.title}"?`)) save(projects.filter((x) => x.id !== p.id), 'Project dihapus.');
              }}
              aria-label="Hapus"
              className={`${iconBtn} hover:!text-danger`}>
              
                  <Trash2Icon className="h-4 w-4" />
                </button>
                <button
              type="button"
              onClick={() => setEditing({ project: p, isNew: false })}
              className="ml-1 inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-bold text-bg">
              
                  <PencilIcon className="h-3.5 w-3.5" aria-hidden /> Edit
                </button>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}