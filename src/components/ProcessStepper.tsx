import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { usePortfolio } from '../contexts/PortfolioContext';

const stepColors = ['bg-ink text-bg', 'bg-lemon text-night', 'bg-pink text-night', 'bg-primary text-white', 'bg-violet-deep text-white'];

export function ProcessStepper() {
  const { data } = usePortfolio();
  const steps = data.workSteps;
  const cols = Math.min(Math.max(steps.length, 1), 6);

  return (
    <section id="process" aria-labelledby="process-title" className="bg-surface-2/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="process-title"
          title="CARA KERJA SAYA"
          description="Langkah yang sama untuk setiap proyek, supaya Anda selalu tahu posisi pekerjaan dan apa yang akan diterima." />
        
        <ol
          className="relative grid gap-10 lg:gap-6 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ '--cols': cols } as React.CSSProperties}>
          
          <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-line lg:bottom-auto lg:right-6 lg:h-px lg:w-auto" />
          {steps.map((step, i) =>
          <li key={step.id} className="relative">
              <Reveal delay={i * 0.06} className="flex gap-5 lg:flex-col lg:gap-0">
                <span className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold ring-8 ring-bg ${stepColors[i % stepColors.length]}`}>
                  {i + 1}
                </span>
                <div className="lg:mt-6">
                  <h3 className="text-2xl font-extrabold tracking-tight text-ink">{step.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
                  <p className="mt-4 inline-flex rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-ink">
                    Hasil: {step.output}
                  </p>
                </div>
              </Reveal>
            </li>
          )}
        </ol>
      </div>
    </section>);

}