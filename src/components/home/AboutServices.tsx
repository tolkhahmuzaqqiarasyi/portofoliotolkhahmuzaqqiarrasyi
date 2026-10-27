import React from 'react';
import { ArrowRightIcon, HeartIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { iconMap } from '../../utils/icons';

export function AboutServices() {
  const { data } = usePortfolio();
  const { profile, services } = data;
  const paragraphs = profile.aboutBody.split(/\n\s*\n/).filter(Boolean);

  return (
    <section id="about" aria-labelledby="about-title" className="bg-bg">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto max-w-[320px] -rotate-3">
            <div className="rounded-md bg-white p-3 pb-14 shadow-lift">
              <img src={profile.photo} alt="" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
            </div>
            <span aria-hidden className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-2 bg-pink/70" />
            <div className="absolute -bottom-6 -left-4 w-36 rotate-[-6deg] bg-lemon p-4 text-night shadow-soft">
              <p className="text-sm font-extrabold uppercase leading-tight">
                Plan · Design
                <br />
                Build · Grow
              </p>
              <HeartIcon className="mt-2 h-5 w-5" aria-hidden />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-4">
          <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-bold text-night">Tentang saya</span>
          <h2 id="about-title" className="mt-4 text-2xl font-extrabold text-ink md:text-3xl">
            Halo, saya
            <span className="mt-1 flex items-center gap-3 font-script text-6xl font-bold text-primary-ink md:text-7xl">
              {profile.shortName}
              <HeartIcon className="h-8 w-8 text-pink" aria-hidden />
            </span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {paragraphs.map((p) =>
            <p key={p.slice(0, 24)}>{p}</p>
            )}
          </div>
          <a
            href="#flow"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-ink px-6 text-sm font-bold text-ink transition-colors duration-150 ease-out hover:bg-ink hover:text-bg">
            
            Lihat alur kerja <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-2 lg:col-span-4 lg:border-l lg:border-line lg:pl-10">
          <span className="inline-flex rounded-full bg-band px-3 py-1 text-xs font-bold text-white">Yang saya kerjakan</span>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-ink">Layanan</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-1">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <li key={s.id} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-primary-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.description}</p>
                    <p className="mt-1 text-xs font-semibold text-muted">
                      Mulai dari <span className="text-ink">{s.price}</span>
                    </p>
                  </div>
                </li>);

            })}
          </ul>
        </Reveal>
      </div>
    </section>);

}