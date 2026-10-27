import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, BadgeCheckIcon } from 'lucide-react';
import { cardFill, roleLabel } from '../../utils/styles';
import type { Project } from '../../types/portfolio';

export function CaseStudyCard({ project }: {project: Project;}) {
  const fill = cardFill[project.color];
  return (
    <Link
      to={`/project/${project.slug}`}
      className={`group flex h-full flex-col rounded-3xl p-3 transition-transform duration-200 ease-out hover:-translate-y-1 ${fill.card}`}>
      
      <div className="relative overflow-hidden rounded-2xl bg-white/40">
        <img
          src={project.cover}
          alt={`Tampilan ${project.title}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
        
        {project.isSample &&
        <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-1 text-xs font-semibold text-white">Contoh</span>
        }
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className={`text-xs font-bold uppercase tracking-wide ${fill.onDark ? 'text-white/85' : 'text-night/75'}`}>
          {project.roles.map((r) => roleLabel[r]).join(' · ')}
        </p>
        <h3 className="mt-1.5 text-xl font-extrabold uppercase leading-tight tracking-tight">{project.title}</h3>
        <p className={`mt-1 text-sm ${fill.onDark ? 'text-white/85' : 'text-night/80'}`}>{project.category}</p>

        {!project.resultIsPlaceholder && <p className="mt-3 text-sm font-bold">{project.result}</p>}

        <p className="mt-3 flex items-center gap-1.5 text-sm font-bold">
          <BadgeCheckIcon className="h-4 w-4" aria-hidden /> {project.proof}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-sm font-semibold">Lihat {project.process.length} tahap proses</span>
          <span
            className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-200 ease-out group-hover:rotate-45 ${
            fill.onDark ? 'bg-white text-night' : 'bg-night text-white'}`
            }>
            
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>);

}