import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { iconMap } from '../../utils/icons';

export function SocialRail() {
  const { data } = usePortfolio();
  return (
    <aside aria-label="Media sosial" className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 xl:flex">
      {data.socials.map((s) => {
        const Icon = iconMap[s.icon];
        const external = s.href.startsWith('http');
        return (
          <a
            key={s.id}
            href={s.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={s.label}
            className="grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors duration-150 ease-out hover:bg-white/10 hover:text-white">
            
            <Icon className="h-5 w-5" aria-hidden />
          </a>);

      })}
      <span aria-hidden className="my-3 h-10 w-px bg-white/25" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 [writing-mode:vertical-rl]">
        Dari ide sampai produk
      </span>
    </aside>);

}