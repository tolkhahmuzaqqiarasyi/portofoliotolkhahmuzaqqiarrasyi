import React from 'react';
import { WrenchIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import type { ProjectStep } from '../../types/portfolio';

const dotColors = ['bg-lemon text-night', 'bg-pink text-night', 'bg-primary text-white', 'bg-violet-deep text-white'];

export function ProcessTimeline({ steps }: {steps: ProjectStep[];}) {
  if (steps.length === 0) {
    return <p className="rounded-3xl border border-dashed border-line p-8 text-muted">Belum ada tahap proses.</p>;
  }

  return (
    <ol className="relative">
      <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-0.5 bg-line" />
      {steps.map((step, i) =>
      <li key={step.id} id={`tahap-${i + 1}`} className="relative flex scroll-mt-24 gap-5 pb-10 last:pb-0 md:gap-7">
          <span
          className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold ring-8 ring-bg ${dotColors[i % dotColors.length]}`}>
          
            {i + 1}
          </span>
          <Reveal className="flex-1 rounded-3xl border border-line bg-surface p-6 shadow-soft md:p-7">
            <h3 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            {(step.deliverables.length > 0 || step.tool) &&
          <div className="mt-5 flex flex-wrap items-center gap-2">
                {step.deliverables.map((d) =>
            <span key={d} className="rounded-full bg-surface-2 px-3 py-1 text-sm font-semibold text-ink">
                    {d}
                  </span>
            )}
                {step.tool &&
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm font-semibold text-primary-ink">
                    <WrenchIcon className="h-3.5 w-3.5" aria-hidden /> {step.tool}
                  </span>
            }
              </div>
          }
          </Reveal>
        </li>
      )}
    </ol>);

}