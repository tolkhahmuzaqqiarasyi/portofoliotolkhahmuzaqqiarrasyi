import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ id, title, description, action }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="text-3xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>);

}