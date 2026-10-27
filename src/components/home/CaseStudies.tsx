import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { CaseStudyCard } from './CaseStudyCard';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { btnSecondary, roleLabel } from '../../utils/styles';
import type { RoleFilter, RoleTag } from '../../types/portfolio';

const FEATURED = 4;
const roleFilters: RoleTag[] = ['UI/UX', 'PM', 'Frontend', 'Marketing'];

interface CaseStudiesProps {
  filter: RoleFilter;
  onFilterChange: (filter: RoleFilter) => void;
}

export function CaseStudies({ filter, onFilterChange }: CaseStudiesProps) {
  const { data } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const projects = data.projects;

  const filtered = filter === 'Semua' ? projects : projects.filter((p) => p.roles.includes(filter));
  const visible = filter === 'Semua' && !showAll ? filtered.slice(0, FEATURED) : filtered;
  const canExpand = filter === 'Semua' && projects.length > FEATURED;

  return (
    <section id="work" aria-labelledby="work-title" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="work-title"
          title={
          <>
              STUDI KASUS <span className="font-script text-6xl font-bold normal-case text-primary-ink md:text-7xl">pilihan</span>
            </>
          }
          description="Klik project untuk melihat seluruh prosesnya — dari riset, perencanaan, desain, sampai rilis." />
        

        <div role="group" aria-label="Filter berdasarkan peran" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
          {(['Semua', ...roleFilters] as RoleFilter[]).map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(f)}
                className={`min-h-[44px] shrink-0 rounded-full px-5 text-sm font-semibold transition-colors duration-150 ease-out ${
                active ? 'bg-ink text-bg' : 'border border-line bg-surface text-muted hover:text-ink'}`
                }>
                
                {f === 'Semua' ? 'Semua' : roleLabel[f]}
              </button>);

          })}
        </div>

        {visible.length === 0 ?
        <p className="rounded-3xl border border-dashed border-line p-10 text-center text-muted">Belum ada project untuk peran ini.</p> :

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((project) =>
          <li key={project.id}>
                <CaseStudyCard project={project} />
              </li>
          )}
          </ul>
        }

        {canExpand &&
        <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} className={btnSecondary}>
              {showAll ? 'Tampilkan lebih sedikit' : `Lihat semua (${projects.length})`}
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ease-out ${showAll ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          </div>
        }
      </div>
    </section>);

}